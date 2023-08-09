'use client';

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";
import Image from "next/image";

function Feed() {

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
    setIsLoading(false);
  }, []);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );

  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPosts(tag);
    setSearchedResults(searchResult);
  }

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {
          data.map((post) => (
            <PromptCard 
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
        }
      </div>
    )
  }

  if(isLoading) {
    return (
        <Image 
            src='/assets/icons/loader.svg'
            alt="loading icon"
            width={100}
            height={100}
            className="my-16"
        />
    )
}

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type='text' 
          placeholder="Search for any prompt, tag or username" 
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}

    </section>
  )
}

export default Feed;
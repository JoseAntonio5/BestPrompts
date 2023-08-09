'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {

  const { data: session } = useSession();
  const pathName = usePathname();
  const [copy, setCopy] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // const favoritedPosts = session?.user.favorite;
  const [favorited, setFavorited] = useState(session?.user.favorite.includes(post._id));
  
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000)
  }

  const handleUpdateFavoritePost = async(e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!session?.user.id) {
      return alert('Error. User ID was not found. Please try again.');
    }

    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            postId: post._id,
            email: session?.user.email,
            username: session?.user.name,
            image: session?.user.image
          }),
      });

      if (response.ok) {
        setFavorited(!favorited);
      }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmitting(false);
    }
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
              ? '/assets/icons/tick.svg'
              : 'assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt='copy icon'
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="w-full flex justify-between">
        <p 
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        {
          session?.user.id && (
            <Image 
              src={
                favorited ?
                '/assets/icons/star-filled.svg' :
                '/assets/icons/star-empty.svg'
              }
              width={20}
              height={20}
              alt='star icon'
              className="cursor-pointer"
              onClick={handleUpdateFavoritePost}
            />
          )
        }
      </div>

      {
        session?.user.id === post.creator._id && pathName === '/profile'
        && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
        )
      }

    </div>
  )
}

export default PromptCard;
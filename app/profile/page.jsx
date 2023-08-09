'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import Image from "next/image";

import Profile from "@components/Profile";

function MyProfile() {

    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }

        const findFavoritePosts = async() => {
            const response = await fetch(`/api/users/${session?.user.id}`);
            const data = await response.json();

            setFavoritePosts(data.favorite);
        }
    
        if(session?.user.id) {
            fetchPosts();
            findFavoritePosts();
        }
        setIsLoading(false);
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async(post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => {
                    p._id !== posts._id;
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    if(session === null) {
        redirect('/');
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
        <Profile 
            name={session?.user.name}
            image={session?.user.image}
            desc="Welcome to your profile page."
            data={posts}
            favoritePosts={favoritePosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;
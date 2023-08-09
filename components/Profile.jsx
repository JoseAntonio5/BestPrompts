import PromptCard from "./PromptCard";
import Image from "next/image";

function Profile({ name, image, desc, data, favoritePosts, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
      {name}<span className="blue_gradient"> Profile</span>
      </h1>
      <div className="flex items-center">
        <Image 
          src={image}
          alt="User image"
          width={120}
          height={120}
          className="rounded-full my-4"
        />
        <p className="desc text-left ml-5">{desc}</p>
      </div>
      <h1 className="head_text text-left">Your posts</h1>
      <div className="mt-10 prompt_layout border-t-2 border-slate-300">
        {
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        }
      </div>
      <h1 className="head_text text-left">Favorite Posts</h1>
      <div className="mt-10 prompt_layout border-t-2 border-slate-300">
        {
          favoritePosts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Profile
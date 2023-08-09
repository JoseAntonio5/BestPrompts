import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async(request, { params }) => {
    const { postId, email, username, image } = await request.json();

    try {
        await connectToDB();

        const userToUpdate = await User.findById(params.id);
        const favoritedPost = await Prompt.findById(postId);

        const hasFavoritedPost = userToUpdate.favorite.includes(favoritedPost._id);
        const index = userToUpdate.favorite.indexOf(favoritedPost._id);

        if(!userToUpdate) {
            return new Response('Error. User not found.', { status: 404 });
        }

        userToUpdate.email = email;
        userToUpdate.username = username;
        userToUpdate.image = image;
        if(hasFavoritedPost) {
            userToUpdate.favorite.splice(index, 1);
        } else {
            userToUpdate.favorite.push(favoritedPost._id);
        }

        await userToUpdate.save();

        return new Response(JSON.stringify(userToUpdate), { status: 200 });
    } catch (error) {
        return new Response('Failed to make prompt favorited.', { status: 500 });
    }
}

export const GET = async(request, { params }) => {
    try {
        await connectToDB();

        const favoritePosts = await User.findById(params.id)
            .populate({
                path: 'favorite',
                populate: {
                path: 'creator',
                model: 'User',
                },
            });

        return new Response(JSON.stringify(favoritePosts), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts', { status: 500 });
    }
}
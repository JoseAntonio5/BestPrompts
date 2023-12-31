import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async(request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) {
            return new Response('Prompt not found.', { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts', { status: 500 });
    }
}

export const PATCH = async(request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const promptToUpdate = await Prompt.findById(params.id);

        if(!promptToUpdate) {
            return new Response('Prompt not found.', { status: 404 });
        }

        promptToUpdate.prompt = prompt;
        promptToUpdate.tag = tag;

        await promptToUpdate.save();

        return new Response(JSON.stringify(promptToUpdate), { status: 200 });
    } catch (error) {
        return new Response('Failed to update prompt.', { status: 500 });
    }
}

export const DELETE = async(request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete prompt.', { status: 500 });
    }
}
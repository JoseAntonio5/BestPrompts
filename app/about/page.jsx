import React from 'react'

function About() {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='w-full max-w-full head_text text-left pb-4 border-b-2 border-slate-300'><span className='blue_gradient'>About</span></h1>
      <h4 className='mt-5 text-lg text-gray-600 sm:text-xl w-full max-w-full'>Welcome to BestPromps – the ultimate destination for unleashing the power of AI tools through collaborative creativity!</h4>
      <p className='text-left w-full max-w-full my-8'>
        Welcome to BestPromps, Our website is all about helping you and others share, find, and use lots of different ideas that make AI programs even better. If you're interested in what computers can do, BestPromps is the right spot for you!
      </p>

      <h3 className='text-4xl font-extrabold'>With BestPropts you can:</h3>
      <ul className='w-full max-w-full mt-4 pl-4 space-y-1 list-disc list-inside font-semibold'>
        <li>Discover creative ideas by exploring a wide variety of prompts created by others</li>
        <li>Power up AI Tools and unleash its full potential</li>
        <li>Join a creative community</li>
      </ul>

      <h3 className='text-4xl font-extrabold mt-6'>Types of AI-Prompt Interaction and How to Use Them:</h3>
      <h4 className='mt-5 text-lg text-gray-600 sm:text-xl w-full max-w-full'>BestPromps empowers you to interact with various types of AI tools by providing prompts that unlock their potential. Here's how you can make the most of different AI tools using the prompts you find:</h4>
      <ul className='w-full max-w-full mt-4 pl-4 space-y-1 list-disc list-inside font-semibold'>
        <li>Language Generation AIs (e.g., OpenAI's GPT models)</li>
        <p className='font-normal pl-8'>Language Generation AI models are like smart computer programs that can write and talk just like people do. Using prompts with these models is like giving them a hint or telling them what you want them to write about.</p>
        <li>Artificial Intelligence Image Generator (e.g., DALL-E, Midjourney)</li>
        <p className='font-normal pl-8'>Using prompts with an AI image generator is a bit like describing a picture you want. You type in words that tell the AI what you're thinking about, then, the AI takes those words and uses them to create a picture that matches what you said.</p>
        <li>Coding Assistants (e.g., GitHub Copilot)</li>
        <p className='font-normal pl-8'>Give coding prompts to AI assistants and enhance your programming journey. These tools offer code suggestions, autocompletions, and smart recommendations, streamlining your coding process.</p>
      </ul>

      <h4 className='mt-5 text-lg text-gray-600 sm:text-xl w-full max-w-full'>BestPromps isn't solely about prompts, it's about the knowledge people share, the code they crack, and the solutions they create. Dive into a community of forward-thinkers, a place where prompt-sharing becomes an art form.</h4>

      <p className='text-left w-full max-w-full my-8'>
        Join us on this exciting journey as we transform simple prompts into remarkable AI-powered creations. Together, we're shaping the future of AI interaction, one prompt at a time.
      </p>

      <p className='text-sm text-gray-500'>
        BestPrompt is a project inspired from a course by <a href="https://www.youtube.com/@javascriptmastery" target='_blank' className='text-teal-400'>JavaScript Mastery</a>
      </p>
    </section>
  )
}

export default About;
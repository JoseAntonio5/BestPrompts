import Feed from '@components/Feed'

function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Explore & Share
            <br />   
            <span className="orange_gradient text-center">AI-Generated Ideas</span> 
        </h1>
        <p className="desc text-center">Welcome to BestPrompts, your hub for sharing AI prompts with the community. Explore, generate, and create prompts by joining us today!</p>
        <Feed />
    </section>
  )
}

export default Home
import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero/Hero.jsx'
import './Home.css'

export default function Home() {
  return (
    <PageTransition>
      <main className="home-page">
        <Hero />
<h1>  
  hello world new day
</h1> 
        {/* Next sections go here as we build them */}
      </main>
    </PageTransition>
  )
}
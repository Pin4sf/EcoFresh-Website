import Hero from '../components/sections/home/Hero'
import ValueProposition from '../components/sections/home/ValueProposition'
import ProblemSolution from '../components/sections/home/ProblemSolution'
import Impact from '../components/sections/home/Impact'
import Credibility from '../components/sections/home/Credibility'
import TeamSection from '../components/sections/home/TeamSection'
import FinalCTA from '../components/sections/home/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ProblemSolution />
      <Impact />
      <Credibility />
      <TeamSection />
      <FinalCTA />
    </>
  )
}

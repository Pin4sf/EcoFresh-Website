import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Problem from './pages/Problem'
import Impact from './pages/Impact'
import Credibility from './pages/Credibility'
import Team from './pages/Team'
import Investors from './pages/Investors'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/credibility" element={<Credibility />} />
        <Route path="/team" element={<Team />} />
        <Route path="/investors" element={<Investors />} />
      </Route>
    </Routes>
  )
}

export default App

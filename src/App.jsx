import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Schedule } from './pages/Schedule'
import { Shows } from './pages/Shows'
import { Stream } from './pages/Stream'
import { Arcade } from './pages/Arcade'
import { Vault } from './pages/Vault'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/vault" element={<Vault />} />
      </Route>
    </Routes>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { Shows } from './pages/Shows'
import { Music } from './pages/Music'
import { Video } from './pages/Video'
import { Fan } from './pages/Fan'
import { More } from './pages/More'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/arcade" element={<Navigate to="/games" replace />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/music" element={<Music />} />
        <Route path="/video" element={<Video />} />
        <Route path="/stream" element={<Navigate to="/video" replace />} />
        <Route path="/fan" element={<Fan />} />
        <Route path="/more" element={<More />} />
        <Route path="/schedule" element={<Navigate to="/shows" replace />} />
        <Route path="/vault" element={<Navigate to="/shows" replace />} />
      </Route>
    </Routes>
  )
}

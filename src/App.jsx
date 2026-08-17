import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { Shows } from './pages/Shows'
import { Video } from './pages/Video'
import { Fan } from './pages/Fan'
import { More } from './pages/More'
import { NickJr } from './pages/NickJr'
import { NickNews } from './pages/NickNews'
import { Weekenders } from './pages/Weekenders'
import { Orbitz } from './pages/Orbitz'
import { Info } from './pages/Info'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/arcade" element={<Navigate to="/games" replace />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/music" element={<Navigate to="/" replace />} />
        <Route path="/video" element={<Video />} />
        <Route path="/stream" element={<Navigate to="/video" replace />} />
        <Route path="/fan" element={<Fan />} />
        <Route path="/more" element={<More />} />
        <Route path="/nick-jr" element={<NickJr />} />
        <Route path="/nick-news" element={<NickNews />} />
        <Route path="/weekenders" element={<Weekenders />} />
        <Route path="/orbitz" element={<Orbitz />} />
        <Route path="/about" element={<Info slug="about" />} />
        <Route path="/press" element={<Info slug="press" />} />
        <Route path="/jobs" element={<Info slug="jobs" />} />
        <Route path="/investors" element={<Info slug="investors" />} />
        <Route path="/terms" element={<Info slug="terms" />} />
        <Route path="/privacy" element={<Info slug="privacy" />} />
        <Route path="/parents" element={<Info slug="parents" />} />
        <Route path="/help" element={<Info slug="help" />} />
        <Route path="/paramount" element={<Info slug="paramount" />} />
        <Route path="/global" element={<Info slug="global" />} />
        <Route path="/schedule" element={<Navigate to="/shows" replace />} />
        <Route path="/vault" element={<Navigate to="/shows" replace />} />
      </Route>
    </Routes>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home        from './pages/Home'
import PackagePage from './pages/PackagePage'
import ComparePage from './pages/ComparePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<Home />} />
        <Route path="/package/:name"         element={<PackagePage />} />
        <Route path="/compare/:name1/:name2" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  )
}
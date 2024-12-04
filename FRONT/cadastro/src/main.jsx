import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './pages/Home'
import Header from './pages/Header'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        {/* Define suas rotas aqui */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </StrictMode>,
)

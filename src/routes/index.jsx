import Home from 'pages/Home/index';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
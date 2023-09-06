import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { FormPage } from './views/pages/Form/Form.page'
import { HomePage } from './views/pages/Home/Home.page'
import './index.css'
import './App.css'

const App: React.FC = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/create" element={<FormPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}

export default App

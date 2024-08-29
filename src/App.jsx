import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path='*' element={<Dashboard/>}></Route>
        <Route path='dashboard/*' element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App

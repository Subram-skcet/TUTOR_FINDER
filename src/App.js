import React from 'react'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import AboutPage from './components/AboutPage/About'
// import './App.css'

const App = () => {
  return (
    <div className='app-wrapper'>
      <Home/>
      <AboutPage/>
    </div>
  )
}

export default App

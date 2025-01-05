import React from 'react'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import AboutPage from './components/AboutPage/About'

const App = () => {
  return (
    <div className='app-wrapper'>
      <Home/>
      <AboutPage/>
    </div>
  )
}

export default App

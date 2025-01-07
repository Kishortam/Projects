import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
//import Services from './Components/Services/Services'
import MyWork from './Components/MyWork/MyWork'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      {/* service section has been commented out, as we do not have service in real world */}
      {/* <Services/> */}
      <MyWork/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
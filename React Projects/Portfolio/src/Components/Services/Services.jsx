import React from 'react'
import './Services.CSS'
import theme_pattern from '../../assets/theme_pattern.svg'
import services_data from '../../assets/services_data'
import arrow_icon from '../../assets/arrow_icon.svg'

const Services = () => {
  return (
    <div className='services'>
        <div className="title">
            <h1>My Services</h1>
            <img src={theme_pattern} alt="" />
        </div>

        <div className="container">
            {services_data.map((service, index)=>{
                return <div key={index} className='format'>
                     <h3>{service.s_no}</h3>
                     <h2>{service.s_name}</h2>
                     <p>{service.s_desc}</p>
                     <div className='read-more'>
                        <p>read more</p>
                        <img src={arrow_icon} alt="" />
                     </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Services
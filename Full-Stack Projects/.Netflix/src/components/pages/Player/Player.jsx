import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  // when clicked on back button of player page, it should redirect us to home page
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  // paste code from tmdb
  const options = {
    method: 'GET',
    headers: {
      accept : 'application/json',
      Authorization: 'Bearer 6fc0aa456d8e2b655c087b81d5c403bf.eyJhdWQiOiI2ZmMwYWE0NTZkOGUyYjY1NWMwODdiODFkNWM0MDNiZiIsIm5iZiI6MTcyMzQwMzc2Ni4yMDg2NzgsInN1YiI6IjY2YjkwYmViNTMwODAzN2I2MzVmNGM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RU3e4aIeVOYW7XmzXsXSu1Cf7MECvIWg_nTGo_J-ckQ'
    }
  };

  useEffect(()=>{
    // fetching a data from TMDB database using API key
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results[0]))
  .catch(err => console.log(err));
  },[])


  return (
    <div className='player'>
      {/* when click on back arrow button, it will redirect us to home page */}
      <img src={back_arrow_icon} alt="" onClick={()=> {navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer'
      frameborder="0" allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
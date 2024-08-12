import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  // to scroll/slide movie cards horizontally without scroll bar
  const cardsRef = useRef();

  // paste code taken from tmdb
  const options = {
    method: 'GET',
    headers: {
      accept : 'application/json',
      Authorization: 'Bearer 6fc0aa456d8e2b655c087b81d5c403bf.eyJhdWQiOiI2ZmMwYWE0NTZkOGUyYjY1NWMwODdiODFkNWM0MDNiZiIsIm5iZiI6MTcyMzQwMzc2Ni4yMDg2NzgsInN1YiI6IjY2YjkwYmViNTMwODAzN2I2MzVmNGM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RU3e4aIeVOYW7XmzXsXSu1Cf7MECvIWg_nTGo_J-ckQ'
    }
  };

  // scroll behaviour
const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=> {
// fetching a data from TMDB database using API key
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.log(err))

  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])


  return (
    <div className='title-cards'>
      <h2>{title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          // to make movie-cards working when clicked, we wrap it into Link tag
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.name}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
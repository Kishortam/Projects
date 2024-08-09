import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  // to scroll/slide movie cards horizontally without scroll bar
  const cardsRef = useRef();

  // paste code taken from tmdb

const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=> {
// fetching a data from TMDB database using API key
  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.log(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])


  return (
    <div className='title-cards'>
      <h2>{title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {Apidata.map((card, index)=>{
          // to make movie-cards working when clicked, we wrap it into Link tag
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.name}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Items from './Items'


const NewCollections = () => {

  const [new_collection, setNewCollection] = useState([]);

  useEffect(()=>{ // fetch API, to fetch newcollections from backend
    fetch('http://localhost:4000/newcollections')
    .then((res) => res.json())
    .then((data) => setNewCollection(data));
  },[])

  return (
    <div className='newcollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections
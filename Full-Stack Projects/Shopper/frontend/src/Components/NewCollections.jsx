import React from 'react'
import './NewCollections.css'
import Items from './Items'
import new_collection from '../Components/Assets/new_collections'


const NewCollections = () => {
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
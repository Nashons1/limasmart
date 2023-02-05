import React, {useState} from 'react'
import Tile from './Tile';
import './Home.css';

function Tilesdiv({business}) {
  return (
    <div className='Tilesdiv flex '>
      {business.map((data,index)=>(
 <div className='spec-Tile' key={data.key}> <Tile data={data}/></div>
      ))}
    </div>
  )
}

export default Tilesdiv;
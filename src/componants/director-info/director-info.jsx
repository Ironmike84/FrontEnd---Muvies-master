import React, {useState} from 'react'

import {Button} from 'react-bootstrap'
import './Director-Info.scss'
function DirectorInfo({Director, onBackClick}) {

    const [ DirectorMovies, SetDirectorMovies ] = useState(Director.Movies)


  return (
    <div className='DirectorInfo'>
        <div><h5>{Director.Name}</h5></div>
        <div><img className="DirectorImage"src={Director.ImagePath}></img></div>
        <hr></hr>
        
        <div>Birth: {Director.Birth}</div>
        <div>Death: {Director.Death}</div>
        <div className='Title'>Bio:</div>
        <div>{Director.Bio}</div>
       Director Movies: {DirectorMovies.map((movie)=>(<div key={movie._id}>{movie.Title}</div>))}
       <button className='btn btn-link DirectorInfoButton'  onClick={() => { onBackClick(null); }}>Back</button>
    </div>

  )
}

export default DirectorInfo
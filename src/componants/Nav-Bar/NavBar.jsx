  import React from 'react'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './NavBar.scss'
function NavBar() {
  return (
    <div className='NavBar'>
      <Link to={'/Profile'}><Button className='btn btn-link' variant='dark'>Profile</Button></Link>
      <Link to={'/Movies'}><Button className='btn btn-link' variant='dark'>Movies</Button></Link>
      <Link to={'/Directors'}><Button className='btn btn-link' variant='dark'>Directors</Button></Link>
      <Link to={'/Genre/:Name'}><Button className='btn btn-link' variant='dark'>Genres</Button></Link>
      <Button className='btn btn-link' variant='dark'>Favorites</Button>
    </div>
  )
}

export default NavBar
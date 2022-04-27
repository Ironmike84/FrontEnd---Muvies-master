import React, { Component } from 'react'
import axios from 'axios'

import MovieCard from '../movie-card/movie-card'
import {Button, Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import MovieView from '../movie-view/movie-view'
 class MoviesView extends Component {
    constructor(props){
        super(props);
        this.state = {
          user:null,
          Movie:props.Movie,
          movies: [],
          LoggedInMovies:[],
          selectedMovie: null,
          user: props.user,
          token: localStorage.getItem('token'),
          Token: localStorage.getItem('token'), 
          User:null,
          Mounted: false
        };
      }
      

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

    componentDidMount() {
        axios.get(`https://salty-badlands-90222.herokuapp.com/Movies`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then(response => {
                this.setState({
                    movies: response.data,
                    Mounted: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
render(){

const { movies, selectedMovie, token, user } = this.state;

    return (
  <>
  <hr></hr>
          <Row className="main-view justify-content-md-center">
        {selectedMovie
        ? (
        <Col md={4}>
          <MovieView user={user} token={token} movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
        )
        : movies.map(movie => (
        <Col md={4}>
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
        ))
      }
      </Row>
    </>
    )
  }
}

export default MoviesView;
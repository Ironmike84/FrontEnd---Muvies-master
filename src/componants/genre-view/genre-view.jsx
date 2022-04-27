import React, { Component } from 'react';
import {Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';

export default class GenreView extends Component {
constructor(props){
    super(props);
    this.state={
        Genre: props.Genre,
        selectedMovie: null,
        SelectedGenre: null,
        movies:[],
        Action: [],
        SelectAction: false,
        Drama: [],
        SelectDrama: false,
        Romance:[],
        SelectRomance: false,
        Comedy:[],
        SelectComedy: false,
        SelectedMovies:[]

        
    }
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
    this.SetSelectedGenre = this.SetSelectedGenre.bind(this);
    this.GetGenres = this.GetGenres.bind(this);

}

componentDidCatch(){
  axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/Action`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          .then(response => {
              this.setState({
                  Action: response.data,
              })
              
          }).then(
            axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/Drama`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
              })
              .then(response => {
                  this.setState({
                      Drama: response.data,
                  })
                }).then(
            axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/Romance`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
              })
              .then(response => {
                  this.setState({
                      Romance: response.data,
                  })
                }).then(
                  axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/Comedy`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    .then(response => {
                        this.setState({
                            Comedy: response.data,
                        })
                      })
          )))}

componentDidMount(){
  axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/${this.state.Genre}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
        this.setState({
            SelectedMovies: response.data,
        })
        
    })
}
setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

SetSelectedGenre(e){
this.setState({SelectedGenre: e.target.value})

this.GetGenre()


}

GetGenres(){
  let Action = this.state.movies.find(({Genre})=> Genre === 'Action')
  console.log(Action)
 
}


 
  render() {

    const { movies,Drama, Action, selectedMovie, SelectAction, SelectDrama, SelectedMovies, Genre } = this.state;

  return (
    <div>
      <h3>{Genre}</h3>
      <hr></hr>
      <Row>
        {selectedMovie
        ? (
        <Col md={4}>
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
        )
        : SelectedMovies.map(movie => (
        <Col md={4}>
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
        ))
      }
      </Row>
       </div>)
}

}

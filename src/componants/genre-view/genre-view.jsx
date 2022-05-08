import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
        SciFi:[],
        SelectedMovies:[]

        
    }
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
    this.SetSelectedGenre = this.SetSelectedGenre.bind(this);
    this.GetGenres = this.GetGenres.bind(this);
    this.GenreButton = this.GenreButton.bind(this);

}

componentWillMount(){
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
                      }).then(
                        axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/Sci-Fi`, {
                          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                          })
                          .then(response => {
                              this.setState({
                                  SciFi: response.data,
                              })
                            })
          ))))}

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


GenreButton(e){

this.setState({SelectedGenre: e.target.value})
axios.get(`https://salty-badlands-90222.herokuapp.com/Genre/${this.state.SelectedGenre}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
        this.setState({
            SelectedMovies: response.data,
        })
        
})
}
  render() {

    const {SelectedGenre,Drama, Action, selectedMovie, SelectAction, SelectDrama, SelectedMovies, Genre } = this.state;

  return (
    <div>
      <h3>{SelectedGenre}</h3>
      <Link to={'/Genre/Drama'}><Button value={"Drama"} onClick={(e)=>{this.GenreButton(e)}}>Drama</Button></Link>
      <Link to='/Genre/Comedy'><Button value={"Comedy"} onClick={(e)=>{this.GenreButton(e)}}>Comedy</Button></Link>
      <Link to ='/Genre/Action'><Button value={"Action"} onClick={(e)=>{this.GenreButton(e)}}>Action</Button></Link>
      <Link to='/Genre/Romance'><Button  value={"Romance"} onClick={(e)=>{this.GenreButton(e)}}>Romance</Button></Link>
      <Link to='/Genre/Sci-Fi'><Button  value={"Sci-Fi"} onClick={(e)=>{this.GenreButton(e)}}>Sci-Fi</Button></Link>
      <hr></hr>
      <Row>
        {selectedMovie
        ? (
        <Col md={4}>
          <MovieView movie={selectedMovie} onBackClick={() => { history.back() }} />
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

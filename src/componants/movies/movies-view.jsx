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
          movies: [],
          LoggedInMovies:[],
          selectedMovie: null,
          user: props.user,
          token: props.token,
          Token:null,
          User:null
        };
      }
    
      componentWillReceiveProps(){
        let myToken = localStorage.getItem('token');
        let myUser = localStorage.getItem('user');
        this.setState({Token: myToken})
        this.setState({User:myUser})
      }
    

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

    componentDidMount() {
        axios.get(`https://muvies-app.herokuapp.com/Movies`, {
            headers: { Authorization: `Bearer ${this.state.token}`}
        })
            .then(response => {
                this.setState({
                    movies: response.data
                    
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
       <Route exact path="/Movies" render={() => {
        return(
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
)}} />
                 <Route path={"/Movies/:Title"} render={({match}) =>{<MovieView user={user} token={token} movie={movies.find(movie => movie.Title === match.params.Title)}/>}}/>
          

    


    </>
    )
  }
}

export default MoviesView;
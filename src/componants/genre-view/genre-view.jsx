import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';

export default class GenreView extends Component {
constructor(){
    super();
    this.state={
        selectedGenre:null,
        movies:[],

        
    }

}
componentDidMount() {
    axios.get(`https://salty-badlands-90222.herokuapp.com/Movies/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
        .then(response => {
            this.setState({
                movies: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

 
  render() {

    

    return (
      <div>
        <h3>Genres</h3>
        <hr></hr>
        <Button>Action</Button>

      
      </div>
    )
  }
}

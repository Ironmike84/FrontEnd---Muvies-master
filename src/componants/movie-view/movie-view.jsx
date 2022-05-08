//MOVIE VIEW 
import React from 'react';
import axios from 'axios'
import './movie-view.scss';
import { Prev } from 'react-bootstrap/esm/PageItem';
class MovieView extends React.Component {
constructor(props){
  super(props)
  this.state={
    token: localStorage.getItem('token'),
    movies:[],
    Token:localStorage.getItem('token'),
    User:localStorage.getItem('user'),
    movie: props.movie,
    FavMovie:null,
  }
this.SaveFav = this.SaveFav.bind(this);
}
    
PushFavorite(){
  var axios = require('axios');
  var data = JSON.stringify({
    "_id": this.state.movie._id,
    "Title": this.state.movie.Title,
    "Genre": this.state.movie.Genre
  });
  
  var config = {
    method: 'post',
    url: `https://salty-badlands-90222.herokuapp.com/Favorites/${localStorage.getItem('user')}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    alert('Favorite Added!')
  })
  .catch(function (error) {
    console.log(error);
  });

}

SaveFav(props){
this.setState({FavMovie: {_id: this.state.movie._id, Title: this.state.movie.Title, Genre: this.state.movie.Genre }})

this.PushFavorite()

}


  render() {
    const { movie } = this.props;

    return (
       <div className="movie-view">
        <div className="movie-poster">
          <img className='movie-image' src={movie.ImagePath}/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
      
        <div className='details'>Details:</div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre}</span>
          </div>
        <div className="movie-rating">
          <span className="label">Rating: </span>
          <span className="value">{movie.Rating}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director}</span>
        </div>
          <div className='Actors-Title'>Actors:</div>
        <div className="Star-Actor">
          <span className="label">StarActor: </span>
          <span className="value">{movie.StarActor}</span>
        </div>
        <div className="Supporting-Actor">
          <span className="label">SupportingActor: </span>
          <span className="value">{movie.SupportingActor}</span>
        </div>
        <div className="Cast">
          <span className="label">Cast: </span>
          <span className="value">{movie.Cast}</span>
        </div>
        <button className='btn btn-link Movie-Btn'  onClick={() => { history.back(Prev) }}>Back</button>
        <button className='btn btn-link' onClick={()=>{this.SaveFav()}}>Add +</button>
        {/* <button className='btn btn-link' onClick={()=>{this.PushFavorite()}}>Push +</button> */}
     </div>
      
    );
  }
}

export default MovieView;
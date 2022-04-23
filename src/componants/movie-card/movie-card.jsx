import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'
class MovieCard extends React.Component {
  
  render() {

    const { movie, onMovieClick } = this.props;

    return (
      <Card className='Card-Body'>
        <img className='Card-Image' variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className='Card-Title'>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button className='Movie-Button' onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieCard
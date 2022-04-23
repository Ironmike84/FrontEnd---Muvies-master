//-----------------------------------------------------------------------------------------Director View
import axios from 'axios';
import React from 'react';
import {Row, Col, Accordion} from 'react-bootstrap'
import DirectorCard from '../directors-card/director-card'
import DirectorInfo from '../director-info/director-info'


class DirectorView extends React.Component {
constructor(props){
  super(props);
  this.state={
    Directors:[],
    selectedDirector: null,
    Token: props.token
  }
  this.setSelectedDirector= this.setSelectedDirector.bind(this)
}

setSelectedDirector(newSelectedDirector) {
  this.setState({
    selectedDirector: newSelectedDirector
  });
}

componentDidMount() {
  axios.get(`https://muvies-app.herokuapp.com/Directors`, {
      headers: { Authorization: `Bearer ${this.state.Token}`}
  })
      .then(response => {
          this.setState({
              Directors: response.data
          });
          console.log(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });
}
render(){

const { Directors, selectedDirector } = this.state;

  return(
      
      <div>
        <Row className="main-view">
          <hr></hr>
          {selectedDirector
          ? (
              <DirectorInfo Director={selectedDirector} onBackClick={newSelectedDirector => { this.setSelectedDirector(newSelectedDirector); }} />
          )
          : Directors.map(Director => (
            <Col md={3}>
              <DirectorCard animated={true} key={Director._id} Director={Director} onDirectorClick={newSelectedDirector => { this.setSelectedDirector(newSelectedDirector) }}/>
            </Col>
          ))
          }
          </Row> 
        </div>)
    }
}

export default DirectorView;
import React, { Component } from 'react'
import axios from 'axios'
export default class DirectorDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      Director: props.Director,
      Directors: [],
      Loading: true
    }
  }


  componentDidUpdate(token){
    setTimeout(() => {console.log("this is the first message")}, 5000);
    axios.get(`https://salty-badlands-90222.herokuapp.com/Directors`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            .then(response => {
                this.setState({
                    Directors: response.data,
                });
                Loading()
            })
  }

  Loading() {
    this.setState({
      Loading: false
    })
  }
  render() {

const [ Directors, Director, Loading ] = this.state;

    return (
      <div>
        Director Details
     {Loading ? <div>Loading...</div>:<div>{Directors.find(Dir=> Dir.Name === Director)}</div>}
      </div>
    )
  }
}

//MAIN View
import axios from 'axios';
import React, { Children } from 'react';
import {Row, Button,  Button, Accordion} from 'react-bootstrap'
import { Route } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import NavBar from '../Nav-Bar/NavBar'
import './main-view.scss';
import MoviesView from '../movies/movies-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../Profile-View/profile-view'
import RegistrationView from '../registration-view/registration-view'
import MovieView from '../movie-view/movie-view'

class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        movies: [],
        user: null,
        token: null,
        userInfo: null,
        Registered: false,
        LoggedIn: false
    };
    
  }

  //----------------------------------------------// GET Token
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
      this.getMovies(accessToken);
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });
    this.setState({
      userInfo: authData.user
    })
    this.setState({LoggedIn:true})
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.UserName);
    this.getMovies(authData.token);
    this.setState({token: authData.token})
  }

  onLoggedOut(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
        user: null
    });
    window.open('/', '_self');
}
//--------------------------------------------------------------GET T
  getMovies(token) {
      axios.get(`https://muvies-app.herokuapp.com/Movies`, {
          headers: { Authorization: `Bearer ${token}`}
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

    Register(e){
      e.preventDefault();
      this.setState({Registered: true})

    }

      render(props) {
      const { user, token, userInfo, movies, LoggedIn} = this.state;
      
      // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
      
      return (
      <>
      <div>
      {LoggedIn ? <div>   <Button className="btn btn-danger LogOut" onClick={() => { this.onLoggedOut() }}>Logout</Button>
      <NavBar user={user}/>
      <h5>Welcome {user}!</h5></div>: <div>Please Log In...</div> }
      </div>

      <Route exact path={"/"} render={() => {
      if (!user) return <LoginView token={token} onLoggedIn={user => this.onLoggedIn(user)}/>}} />

        {/* <Route exact path={"/"} render={()=>{<LoginView onLoggedIn={user => this.onLoggedIn(user)}/>}}/> */}
        <Route path={"/Movies"} render={()=><MoviesView user={user} token={token} movies={movies}/> }/>
        <Route path={"/directors"} render={()=><DirectorView user={user} token={token}/>}/>
        <Route path={"/Profile"} render={()=><ProfileView user={user} token={token} userInfo={userInfo}/>}/>
        <Route path={"/Register"} render={() =><RegistrationView user={user} token={token} onLoggedIn={user => this.onLoggedIn(user)}/>} />
    
      </>
    );
  }
}

    

export default MainView;
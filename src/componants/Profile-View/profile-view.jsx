//MAIN View
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import UsersImage from '../Images/user.png'
import './profile-view.scss'
class ProfileView extends React.Component {
constructor(props){
  super(props);
  this.state={
  UserData:null,
  User:localStorage.getItem('user'),
  Token:localStorage.getItem('token'),
  UsersName:null,
  UsersEmail:null,
  UsersImage:null,
  UsersBirth:null,
  FavoriteMovies: null,
  GetFavorites: false,
  DeleteMovie: null,
  LoggedIn:true,
  SetMovie: "FavMovie",
  SetImage: "card-image"
  }
  this.GetFav = this.GetFav.bind(this)
  this.SetFav = this.SetFav.bind(this)
}
componentDidMount() {
  axios.get(`https://muvies-app.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
      .then(response => {
          this.setState({
            userData: response.data
          });
          this.setState({
            UsersName: response.data.UserName
          });
          this.setState({
            UsersImage: response.data.ImagePath
          });
          this.setState({
            UsersEmail: response.data.Email
          });
          this.setState({
            UsersBirth: response.data.Birthday
          });
          this.setState({
            FavoriteMovies: response.data.FavoriteMovies
          });
      })
      .catch(function (error) {
          console.log(error);
      });
}

GetFav(){
  this.setState({GetFavorites: true})
}

getTarget(e){
console.log(e.target.value)
}

KillFav(e){
this.setState({DeleteMovie: e.target.value})
this.setState({SetMovie: 'FavMovieHide'})
let Fav = e.target.value
this.SetFav(Fav)
}

SetFav(Fav){
  axios.put(`https://salty-badlands-90222.herokuapp.com/Favorites/${localStorage.getItem('user')}/delete/${Fav}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
}).then(function(){
  location.reload()
})
}

DeleteUser(){
  axios.delete(`https://salty-badlands-90222.herokuapp.com/users/remove/${localStorage.getItem('user')}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
}).then(function(){
  location.reload()
})
}

enlargeImage(){
  this.setState({SetImage:"card-image-large"})
}

resetImage(){
  this.setState({SetImage: "card-image"})
}


render(){
const {SetImage, UsersImage, UsersBirth, UsersName, UsersEmail, GetFavorites, FavoriteMovies, SetMovie } = this.state;

  return(
    <div>
      <div>
      <div className='profile-card'>  
        <div className='card-title'><h5>{UsersName}</h5></div>
        <div><img className={`${SetImage}`} src={UsersImage} alt={`${UsersName}`} onClick={()=>{this.enlargeImage()}} onDoubleClick={()=>{this.resetImage()}}></img></div>


        <Link to={`/Users/Update`}><Button>Update Info</Button></Link>
        <hr></hr>

        <div className="Value"><div className='Title'>E-Mail:</div> {UsersEmail}</div>
        <div className='Value'><div className='Title'>Birthdate: </div>{JSON.stringify(UsersBirth).slice(1,10)}</div>
        <hr></hr>
            <div className='Movie-List'>
          <Button onClick={()=>{this.GetFav()}}>Favorites</Button><br></br>
          <div className='TitleBar'>
          <span className="title">Title</span><span className='Genre'>Genre</span>
          </div>
          {GetFavorites ? <div>{FavoriteMovies.map((movie)=>
          
          <div className={`${SetMovie}`} key={Date.now()}>
            
            <span className='FavTitle'><Link to={`/Movie/${movie.Title}`}>{movie.Title}</Link></span>
            <span className="FavGenre">{movie.Genre}</span>
            {/* <span onClick={(movie)=>{this.getTarget(movie)}}>{movie.ObjectId}</span> */}
            <Button className='btn btn-dark' value={movie.ObjectId} onClick={(e)=>{this.KillFav(e)}}>X</Button>    
          </div>
          )}
          </div>
          :
          <div>Click To see Movies...</div>}
          </div>
          <button className='btn' onClick={()=>{this.DeleteUser()}}>Unregister</button>
        </div> 
      </div>
    </div>
    
      )
}
}
    

export default ProfileView;
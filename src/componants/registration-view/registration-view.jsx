//---------------------------------------// REGISTRATION-VIEW \\-----------------------------------------------\\

import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './registration-view.scss'
import { LoginView } from '../login-view/login-view'

function RegistrationView(props){
    const [ user, setUser ] = useState();
    const [ UserName, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');
    const [ values, setValues ] = useState({
            nameErr: '',
            usernameErr: '',
            password: '',
            email: ''
    });
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ isRegistered, setIsRegistered ] = useState(false);
    const [ Token, SetToken ] = useState();
    const [ Data, SetData ] = useState()


const validate = () => {
    let isReq = true;
    if(!UserName){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(UserName.length < 2){
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }else if(email.indexOf('@')=== -1){
    setEmailErr('Must Include @ Symbol');
    isReq = false;
}
return isReq;
}
const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq){
        axios.post(`https://salty-badlands-90222.herokuapp.com/Users/NewUser/${UserName}`, {
            _id: Date.now(),
            UserName: UserName,
            Password: password,
            Email: email,
            Birthday: birthday,
            FavoriteMovies: null,
            ImagePath: null,
        })
        .then(response =>{ 
            const data = response;
            console.log(data);
            setIsRegistered(true)
            alert('Registration Successful, Please Login');
            SetData(data)
            // // window.open('/', '_self'); 
            //     props.onLoggedIn(data);
        }).then( response => 
        axios.post('https://muvies-app.herokuapp.com/login', {
       UserName: UserName,
       Password: password
        })
   .then(response =>{
       const data = response.data;
       console.log(data.token);
       SetToken(data.token);
       setUser(data.user.UserName);
        props.onLoggedIn(data)
   }))
        .catch(response =>{ 
            console.error(response);
            alert('Unable to Register!!!');
        })
      }
    }


        return (
            <>
            <div>
                {isRegistered ? <LoginView user={user} token={Token} onLoggedIn={user => this.onLoggedIn(user)}/>: <div>Please Register...</div>}
            <Container>
            <Row className='mt-5'>
                <Col md={12}>
                    <Form>
                        <h3>Sign Up</h3>
{/* ------// USERNAME \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formUsername' className='reg-form-inputs'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type = 'text' value={UserName} onChange={(e) =>
                            setUserName(e.target.value)}/>
                                {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>
{/* ------// PASSWORD \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formPassword' className='reg-form-inputs'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type = 'text' value={password} onChange={(e) =>
                            setPassword(e.target.value)}/>
                                {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='Email' className='reg-form-inputs'>
                            <Form.Label>E-Mail:</Form.Label>
                            <Form.Control type = 'email' value={email} onChange={(e) =>
                            setEmail(e.target.value)}/>
                                {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='UpdateBirthday' className='reg-form-inputs'>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type = 'date' name='birthday' onChange={(e) =>
                            setBirthday(e.target.value)}/>
                        </Form.Group>
                        <Button variant='primary' type="submit" onClick={handleSubmit}>Submit</Button>
                        <p></p>
                        <p>Already Registered <Link to={'/'}>Sign</Link>Here</p>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
        </>
        )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    })
};

export default RegistrationView;
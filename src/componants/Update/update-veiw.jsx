//---------------------------------------// REGISTRATION-VIEW \\-----------------------------------------------\\

import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../registration-view/registration-view.scss'

function UpdateView(props){
    const [ user, setUser ] = useState();
    const [ UserName, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');
    const [ ImagePath, setImagePath ] = useState('');
    const [ values, setValues ] = useState({
            nameErr: '',
            usernameErr: '',
            password: '',
            email: '',
            ImagePath: ''
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
        axios.put(`https://salty-badlands-90222.herokuapp.com/Users/Update/${localStorage.getItem('user')}`, {

            UserName: UserName,
            Password: password,
            Email: email,
            Birthday: birthday,
            ImagePath: ImagePath,
        })
        .then(response =>{ 
            const data = response;
            console.log(data);
            alert('Update Successful');
            SetData(data)
            console.log(Data)
        })
    .then(response =>{
        const data = response.data;
        console.log(data.token);
        SetToken(data.token);
        setUser(data.user.UserName);
        props.onLoggedIn(data)
        })
        .catch(response =>{ 
            console.error(response);
            alert('Unable to Update!!!');
        })
        }
    }


        return (
            <>
            <div className='RegistrationView'>
            <Container>
            <Row>
                <Col md={12}>
                    <Form>
                        <h3>Edit Profile Info</h3>
{/* ------// USERNAME \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formUsername' className='reg-form-inputs'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type = 'text' value={UserName}  onChange={(e) =>
                            setUserName(e.target.value)} placeholder='Enter Username...'/>
                                {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>
{/* ------// PASSWORD \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formPassword' className='reg-form-inputs'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type = 'text' value={password} onChange={(e) =>
                            setPassword(e.target.value)} placeholder='Enter Password...'/>
                                {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='Email' className='reg-form-inputs'>
                            <Form.Label>E-Mail:</Form.Label>
                            <Form.Control type = 'email' value={email} onChange={(e) =>
                            setEmail(e.target.value)} placeholder='Enter E-Mail...'/>
                                {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='UpdateBirthday' className='reg-form-inputs'>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type = 'date' name='birthday' onChange={(e) =>
                            setBirthday(e.target.value)} placeholder='Enter Birthdate...'/>
                        </Form.Group>
{/* ------// USERNAME \\-------------------------------------------------------------- */}
                        <Form.Group controlId='ImagePath' className='reg-form-inputs'>
                            <Form.Label>UserImage:</Form.Label>
                            <Form.Control type='text' value={ImagePath} onChange={(e) =>
                            setImagePath(e.target.value)} placeholder='Enter Avatar URL...'/>
                                
                        </Form.Group>                        
                        <Button variant='primary' type="submit" onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
                        <hr></hr>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
        </>
        )
}

UpdateView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    })
};

export default UpdateView;
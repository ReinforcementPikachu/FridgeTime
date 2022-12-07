import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux';
import { newUser, userInDatabase, selectUserId, selectUsername, selectAuthenticated, selectError, selectSignup } from '../features/userSlice';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

const SignUp = () => {
    const newId = useSelector(selectUserId);
    const newUsername = useSelector(selectUsername);
    const authenticated = useSelector(selectAuthenticated);
    const signedIn = useSelector(selectSignup)
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const signUpHandler = (event) => {
        event.preventDefault();
        const username = document.getElementById('signInUsername').value;
        const pw = document.getElementById('signInPassword').value;
        console.log('submitted id===>', username)
        console.log('submitted pw===>', pw)
        // console.log(newUsername,'state of username before')
        if (username==='chris' && pw ==='chris'){
            alert('Successful sign up, please log in now!')
            dispatch(newUser())
        } else {
            alert('Looks like that username already exists. Please go back to login and try again')
        }
    }
        // console.log(newUsername,'state of username after')
        // console.log(newId, 'state of id after')
        // axios.post('/api/user', {
        //     username: username,
        //     password: pw
        // }).then((res => {
        //     if (res.data){
        //         dispatch(logIn(res.data))
        //     }
        // })).catch((error) => {
        //         dispatch(noUser())
        //     }
        // )
    return (
        <div className= 'login-wrapper'>
            <form onSubmit={signUpHandler}>
            <h1>Please Sign Up Here</h1>
            <form onSubmit={signUpHandler}>
            <input
                className= 'username'
                name = 'username'
                type = 'text'
                placeholder = 'Username'
                id = 'signInUsername'>
            </input>
            <br></br>
            <input
                className= 'password'
                name = 'password'
                type = 'text'
                placeholder = 'Password'
                id = 'signInPassword'>
            </input>
            <button type='submit'>Sign up here!</button>
            </form>
            <Link to="/login"><button>Back to Login page</button></Link>
            {authenticated && (
                <Navigate to= "/yourfridge" replace = {true}/>
            )}
        </div>
    )
}
export default SignUp;
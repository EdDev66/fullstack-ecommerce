import React from 'react';
import SignUpForm from '../Authentication/SignUpForm';


const SignUp = (props) => {
    return (
        <SignUpForm location={props.location} history={props.history}/>
    )
}

export default SignUp

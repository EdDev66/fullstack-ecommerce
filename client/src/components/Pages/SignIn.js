import React from 'react';
import SignInForm from '../Authentication/SignInForm';

const SignIn = props => {
    return (
        <SignInForm location={props.location} history={props.history}/>
    )
}

export default SignIn

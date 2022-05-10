import React, { useState } from 'react'
import  { Link as RouterLink } from 'wouter'
import SignIn from '../components/SignIn'

function SignInContainer () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState(undefined)
    const [auntheticated, setAuthenticated] = useState(false)
    //const cognito = useCognito() (?)

    const noPermissionError = `Your account ${auntheticated} doees not have permission to use this app. Try signing in with another account.`

    /* 
    To Do:
    SingIn functionality using AWS amplify
    */
   function handleLogIn (event) {
       let x = 5
   }
   return (
       <SignIn 
       handleLogIn={handleLogIn}
       email={email}
       password={password}
       error={auntheticated ? noPermissionError : error}
       fetching={fetching}
       setEmail={setEmail}
       setPassword={setPassword}
       RouterLink={RouterLink}
       />
   )
}

export default SignInContainer
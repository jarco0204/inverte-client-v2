import React from "react"


function SignIn ({
    handleLogIn = console.log,
    RouterLink,
    email,
    setEmail = console.log,
    password,
    setPasswword = console.log,
    error, 
    fetching
}/*: {
    handleLogIn?:Function,
    RouterLink?:mixed,
    email?:string,
    password?:string,
    error?:string,
    fetching?:boolean,
    setEmail?:Function,
    setPasswword?:Function
}*/) {
    return (
        <h2>Hello</h2>
    )
}
export default SignIn
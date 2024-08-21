import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
 
const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword]= useState("")
    const [password2, setPassword2] =useState("")
    const [email, setEmail] = useState("")
    const navigate=useNavigate();

    const SignupInfo = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/signup', {
                username,
                password,
                password2,
                email,
                
            });
            console.log('signup successfully')
            navigate('/login')
            
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    return (
        <>
        <h3>sign up</h3>
        <div>
                <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
        </div>
        <div>
                <label htmlFor="email">email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
        </div>
        <div>
            <label htmlFor="password1">Password:</label>
                <input
                    type="password"
                    id="password1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
        </div>
        <div>
            <label htmlFor="password2">re-enter Password:</label>
                <input
                    type="password"
                    id="password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
         </div>
         <button onClick={SignupInfo}>Sign up</button>
        </>
    );
}

export default Signup;
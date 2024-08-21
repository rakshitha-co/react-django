import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Signup from "./Signup";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const LoginInfo = async () => {
        try {
            const response =await axios.post('http://localhost:8000/api/login',{
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('login successfully ')
            navigate('/')
        } catch (error) {
            console.error('Login failed', error);
        }
    }
    return (
        <div>
            <h2 className="heading">Login </h2>
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
            <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={LoginInfo}>Login</button>

            <br />
            <h4>Create New User</h4>
            <Link to='/signup'>signup</Link>
        </div>
    );
}

export default Login;
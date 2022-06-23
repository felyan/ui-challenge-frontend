import React, { useRef, useState, useEffect, useContext } from 'react';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);

    const [user, setUser] = React.useState<string>("");
    const [pwd, setPwd] = React.useState<string>("");
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    useEffect(() => {
        userRef.current!.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser("");
            setPwd("");
            setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current!.focus();
        }
        
    }

    

    return (
        <>
            {success ? (
                <section>
                    <Typography variant="h1">You ara logged in!</Typography>
                    <br />
                    <Link to="/home">Go to Home</Link>
                </section>
            ): (
              <section>
            <Typography variant="body2" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </Typography>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <Button variant="outlined">Sign In</Button>
            </form>
            <Typography variant="body1">
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </Typography>
            </section>      
            )}
        
        </>
    )
}

export default Login;
import React, { useEffect, useRef, useState } from "react";
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Button, TextField, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);

    const [user, setUser] = React.useState<string>("");
    const [validName, setValidName] = React.useState<boolean>(false);
    const [userFocus, setUserFocus] = React.useState<boolean>(false);

    const [email, setEmail] = React.useState<string>("");
    const [validEmail, setValidEmail] = React.useState<boolean>(false);
    const [emailFocus, setEmailFocus] = React.useState<boolean>(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = React.useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = React.useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = React.useState<boolean>(false);
    const [matchFocus, setMatchFocus] = React.useState<boolean>(false);

    const [errMsg, setErrMsg] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    useEffect(() => {
        userRef.current!.focus();
    }, [])

    useEffect(() => {
        const result:boolean = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result:boolean = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result:boolean = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match:boolean = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1: boolean = USER_REGEX.test(user);
        const v2: boolean = EMAIL_REGEX.test(email);
        const v3: boolean = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
            try {
                const response = await axios.post(REGISTER_URL, JSON.stringify({ user, email, pwd }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(response?.data);
                console.log(response?.accessToken);
                console.log(JSON.stringify(response))
                setSuccess(true);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response')
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
                errRef.current && errRef.current.focus();
            }  
    }

return (
    <>
        {success ? (
            <section>
                <Typography variant="h1">Success!</Typography>
                <Typography variant="body1">
                    <Link to="/Home">Sign In</Link>
                </Typography>
            </section>
        ) : (
            <section>
                <Typography variant="body1"
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </Typography>
                <Typography variant="h1">Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={
                            <>
                                Username:
                                <span
                                    className={validName ? "valid" : "hide"}                                
                                >
                                    <Check fontSize='inherit' />
                                </span>
                                <span
                                    className={validName || !user ? "hide" : "invalid"}
                                >
                                    <Close fontSize='inherit' />
                                </span>      
                            </>    
                        }
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <Typography variant="body2"
                        id="uidnote"
                        className={userFocus && user && !validName ? "instructions" : "offscreen"}
                    >
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </Typography>
                    <TextField
                        label={
                            <>
                                Email:
                                <span
                                    className={validEmail ? "valid" : "hide"}                                
                                >
                                    <Check fontSize='inherit' />
                                </span>
                                <span
                                    className={validEmail || !email ? "hide" : "invalid"}
                                >
                                    <Close fontSize='inherit' />
                                </span>      
                            </>    
                        }
                        type="email"
                        id="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <Typography variant="body2"
                        id="emailnote"
                        className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}
                    >
                        It has to have a @ symbol, as well as some string preceeding it, and some string proceeding it. Additionally, the second string needs to contain a dot, which has an additional 2-3 characters after that.
                    </Typography>
                        <TextField
                            label={
                            <>
                                Password:
                                <span
                                    className={validPwd ? "valid" : "hide"}                                
                                >
                                    <Check fontSize='inherit' />
                                </span>
                                <span
                                    className={validPwd || !pwd ? "hide" : "invalid"}
                                >
                                    <Close fontSize='inherit' />
                                </span>      
                            </>    
                        }
                        type="password"
                        id="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <Typography variant="body2"
                        id="pwdnote"
                        className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}
                    >
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </Typography>
                        <TextField
                            label={
                            <>
                                Confirm Password:
                                <span
                                    className={validMatch ? "valid" : "hide"}                                
                                >
                                    <Check fontSize='inherit' />
                                </span>
                                <span
                                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                                >
                                    <Close fontSize='inherit' />
                                </span>      
                            </>    
                        }
                        type="password"
                        id="confirm_pwd"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <Typography variant="body2"
                        id="confirmnote"
                        className={matchFocus && !validMatch ? "instruction" : "offscreen"}
                    >
                        Must match the first password input field.
                    </Typography>
                    <Button
                        disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography variant="body1">
                    Already registered?<br />
                    <span className="line">
                        <Link to="/login">Sign In</Link>
                    </span>
                </Typography>
            </section>
        )}
    </>
  )
}

export default Register



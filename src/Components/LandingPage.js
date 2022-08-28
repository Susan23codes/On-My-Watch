import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { CardActionArea } from '@mui/material';







export default function LandingPage(props) {
    const { navigate, setAuth } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [confirmPass, setConfirmPass] = useState('')
    const [email, setEmail] = useState('')

    const imageFileInput = useRef(null)

    const handleClickLoginOpen = () => {
        setOpenLogin(true);
    };

    const handleClickRegistrationOpen = () => {
        setOpenRegister(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault()
        setError(null)

        axios.post('https://onmywatch.herokuapp.com/auth/token/login/', {
            username: username,
            password: password,
        },
        )
            .then((res) => {
                const token = res.data.auth_token
                setAuth(username, token)

            })
            .catch((error) => {
                setError(error.message)
            })
    }


    function handleRegistrationSubmit(event) {
        event.preventDefault()
        setError(null)
        if (password !== confirmPass) {
            alert("Passwords don't match!")
        }
        const imageFile = imageFileInput.current.files[0]
        console.log(imageFile)

        axios.post('https://onmywatch.herokuapp.com/auth/users/', {
            username: username,
            password: password,
            email: email,
        }).then((res) => {
            event.preventDefault()
            setError(null)


            axios.post('https://onmywatch.herokuapp.com/auth/token/login/', {
                username: username,
                password: password,
            },
            )
                .then((res) => {
                    const token = res.data.auth_token
                    setAuth(username, token)

                    if (imageFile) {
                        axios.patch('https://onmywatch.herokuapp.com/api/upload/', imageFile, {
                            headers: {
                                Authorization: `Token ${token}`,
                                'Content-Type': imageFile.type,
                                'Content-Disposition': `attachment; filename=${imageFile.name}`,
                            }
                        },
                        )
                            .then((res) => {
                                console.log("got this far")
                            })
                            .catch((error) => {
                                setError(error.message)
                            })
                    }

                    navigate('/')
                    // })
                })
        })
    }


    return (
        <>
            <div className="landing-page-header" style={{ backgroundColor: "#293e8a", height: '150px', width: '100vw' }}>
                <>
                    <div className="title">
                        <h1 style={{ fontSize: '50px' }}>📺n My Watch</h1>
                    </div>
                    <div className='login-register'>
                        <Button onClick={handleClickLoginOpen} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                        <Button onClick={handleClickRegistrationOpen} color="inherit" sx={{ fontSize: 20 }}>Register </Button>
                    </div>
                </>
            </div>
            <div className="overlay">
                <div className="landing-page-body" style={{ height: '100vh' }} >
                </div>
            </div>
            <div className="landing-page-text">
                <p style={{ fontSize: '60px' }}>Come find your next favorite show!</p>
                <p>Sign in or register to follow people and see their recommendations</p>
                <p >Browse the latest recommendations for new ideas</p>
                <p>Search for inspiration</p>
                <p>Make your own recommendations</p>
                <p>Add shows to your watchlist</p>
            </div>

            <Dialog open={openLogin} onClose={handleCloseLogin}>
                <DialogContent>
                    <DialogContentText>
                        <div className='close-icon-login'>
                    <CardActionArea style={{width:'30px', height:'30px'}}>
                    <CloseIcon  style={{height:'30px', width:'30px'}} onClick={handleCloseLogin}/>
                    </CardActionArea>
                    </div>
                        <div className="entire-login-form">
                            <h2 className='login-form'>Please Log In!</h2>
                            {error && <div className='error'>{error}</div>}
                            <DialogActions>

                                <form id="login-form" onSubmit={handleSubmit}>
                                    <div className="form-controls">
                                        <label className="label" htmlFor="username-field">Username</label>
                                        <input id="username-field" type="text" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-controls">
                                        <label className="label" htmlFor="password-field">Password  </label>
                                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-submit">
                                        <input type="submit" value="Log In" />
                                    </div>
                                </form>
                            </DialogActions>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={openRegister} onClose={handleCloseRegister}>
                <DialogContent>
                    <DialogContentText>
                    <div className='close-icon-login'>
                    <CardActionArea style={{width:'30px', height:'30px'}}>
                    <CloseIcon  style={{height:'30px', width:'30px'}} onClick={handleCloseRegister}/>
                    </CardActionArea>
                    </div>
                        {error && <div>{error}</div>}
                        <h2 style={{ textAlign: 'center' }}>Sign up and starting watching great TV!</h2>
                        
                        <form id="registration-form" onSubmit={handleRegistrationSubmit}>

                            <div className="form-controls">
                                <label className="label" htmlFor="username-field">Username </label>
                                <input id="username-field" type="text" placeholder="Create a username" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-controls">
                                <label className="label" htmlFor="password-field">Password </label>
                                <input id="password" type="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="form-controls">
                                <label className="label" htmlFor="confirm-password-field">Confirm Password </label>
                                <input id="confirm-password" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPass(e.target.value)} required />
                            </div>
                            <div className="form-controls">
                                <div className="upload-pic">
                                    <label htmlFor="image-upload-field">Upload a Profile Pic (Optional)</label>
                                </div>
                                <input id="image" type="file" placeholder="Upload an Image" ref={imageFileInput} />
                            </div>
                            <div className="form-submit">
                                <input type="submit" value="Register" />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}
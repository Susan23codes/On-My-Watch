import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


export default function Navbar(props) {
    const { navigate, handleLogout, isLoggedIn } = props


    const [location, setLocation] = useState('')


    function refreshPage() {
        window.location.reload(false);
    }
    // *******
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                bgcolor: "#293e8a", height: '150px'
            }}>

                {/* {!isLoggedIn ? (
                    <Toolbar className='toolbar' sx={{ height: 120 }}>
                        <Typography className='on-my-watch-title' component="div" sx={{ flexGrow: 1, fontSize: 80 }}>
                            📺n My Watch
                        </Typography>
                        <Typography component="div" paragraph sx={{ fontSize: 30, paddingBottom: '5px' }}>
                            Come find your next favorite show!
                        </Typography>
                    </Toolbar>
                ) : (
                    <Toolbar className='toolbar' sx={{ height: 120 }}>
                        <Typography className='on-my-watch-title' component="div" sx={{ flexGrow: 1, fontSize: 80 }}>
                            📺n My Watch
                        </Typography>
                    </Toolbar>
                )} */}
                {isLoggedIn ? (

                    <div className='navbar-buttons'>
                        <Typography className='on-my-watch-title' component="div" sx={{ fontSize: 50 }}>
                            📺n My Watch
                        </Typography>

                        <div className='navbar-buttons-not-title'>
                            <>
                                {/* {(location === 'new')
                            ? <div><div className='recommendation-button'>
                                <Button onClick={() => {
                                    setLocation('new')
                                    refreshPage();
                                }

                                } color="inherit" sx={{ fontSize: 20,  }}> Make a New Recommendation</Button>

                                <Button onClick={() => {
                                    navigate('/search');
                                    setLocation('search')
                                }} color="inherit" sx={{ fontSize: 20, }}> Search </Button>
                            </div></div>

                            : <div><div className='recommendation-button'> */}
                                <Button onClick={() => {
                                    setLocation('new')
                                    navigate("/new");
                                }

                                } color="inherit" sx={{ fontSize: 20, }}>Make a New Recommendation</Button>

                                <Button onClick={() => {
                                    navigate('/search');
                                    setLocation('search')
                                }} color="inherit" sx={{ fontSize: 20, }}> Search </Button>
                                <Button onClick={() => {
                                    handleLogout();
                                    setLocation('logout')
                                }} color="inherit" sx={{ fontSize: 20 }}>Logout </Button>

                                <Button onClick={() => {
                                    navigate('/');
                                    setLocation('home')
                                }} color="inherit" sx={{ fontSize: 20 }}>Home</Button>

                                {/* </div> */}

                            </>
                        </div>
                        {/* <div>
                        {isLoggedIn ? (
                            <Button onClick={() => {
                                handleLogout();
                                setLocation('logout')
                            }} color="inherit" sx={{ fontSize: 20 }}>Logout </Button>

                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                                <Button onClick={() => navigate('/register')} color="inherit" sx={{ fontSize: 20 }}>Register </Button>
                            </>
                        )}
                    </div> */}
                    </div>
                ) : (
                    <div className="landing-page-header" style={{ backgroundColor: "#293e8a", height: '150px', width: '100vw' }}>
                        <>
                            <div className="title">
                                <h1 style={{ fontSize: '50px' }}>📺n My Watch</h1>
                            </div>
                            <div className='login-register'>
                                <Button onClick={() => navigate('/login')} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                                <Button onClick={() => navigate('/register')} color="inherit" sx={{ fontSize: 20 }}>Register </Button>
                            </div>
                        </>
                    </div>
                )}
            </AppBar>
        </Box>
    )
}
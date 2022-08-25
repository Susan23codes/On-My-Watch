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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                bgcolor: "#293e8a",
            }}>
                <Toolbar className='toolbar' sx={{ height: 150 }}>

                    <Typography className='on-my-watch-title' component="div" sx={{ flexGrow: 1, fontSize: 80 }}>
                        📺n My Watch
                    </Typography>
                    <Typography component="div" paragraph sx={{ fontSize: 30 }}>
                        Come find your next favorite show!
                    </Typography>

                </Toolbar>

                <div className='navbar-buttons'>
                    <div className='home-button'>
                        <Button onClick={() => {
                            navigate('/');
                            setLocation('home')
                        }} color="inherit" sx={{ fontSize: 20 }}>Home</Button>
                    </div>

                    {isLoggedIn && <div>
                        {(location === 'new')
                            ? <div><div className='recommendation-button'>
                                <Button onClick={() => {
                                    setLocation('new')
                                    refreshPage();
                                }

                                } color="inherit" sx={{ fontSize: 20, }}> Make a New Recommendation</Button>

                                <Button onClick={() => {
                                    navigate('/search');
                                    setLocation('search')
                                }} color="inherit" sx={{ fontSize: 20, }}> Search </Button>
                            </div></div>









                            : <div><div className='recommendation-button'>
                                <Button onClick={() => {
                                    setLocation('new')
                                    navigate("/new");
                                }

                                } color="inherit" sx={{ fontSize: 20, }}>Make a New Recommendation</Button>

                                <Button onClick={() => {
                                    navigate('/search');
                                    setLocation('search')
                                }} color="inherit" sx={{ fontSize: 20, }}> Search </Button>
                            </div></div>
                        }
                    </div>}
                    <div>
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
                    </div>
                </div>
            </AppBar>
        </Box>
    )
}
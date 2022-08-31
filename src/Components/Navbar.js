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
        if (location === 'new') {
            window.location.reload(false);
        }
        else {
            navigate("/new");
        }

    }
    function refreshPageSearch() {
        if (location === 'search') {
            window.location.reload(false);
        }


    }
    // *******
    return (
        <div className="landing-page-header" style={{ backgroundColor: "#382069", height: '150px', width: '100vw' }}>
            <>
                <div className="title">
                    <img onClick={() => {
                        navigate('/');
                        setLocation('home')
                    }} className="logo" src="onMyWatchLogo.png" alt="logo"  ></img>
                    <Typography style={{ fontSize: '50px', color: 'white' }}>On My Watch</Typography>
                </div>
                <div className='login-register2'>
                    <Button onClick={() => {
                        refreshPage()
                        setLocation('new')
                    }



                    } color="inherit" sx={{ fontSize: 20, }}>Recommend</Button>

                    <Button onClick={() => {
                        navigate('/search');
                        setLocation('search');
                        refreshPageSearch();
                    }} color="inherit" sx={{ fontSize: 20, }}> Search </Button>
                    <Button onClick={() => {
                        navigate('/');
                        setLocation('home')
                    }} color="inherit" sx={{ fontSize: 20 }}>Home</Button>
                    <Button onClick={() => {
                        handleLogout();
                        setLocation('logout')
                    }} color="inherit" sx={{ fontSize: 20 }}>Logout </Button>

                </div>
            </>
        </div>

    )
}
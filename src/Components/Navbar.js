import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';



export default function Navbar(props) {
    const { navigate, handleLogout, isLoggedIn } = props


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                bgcolor: "#293e8a",
            }}>
                <Toolbar className='toolbar' sx={{ height: 200 }}>

                    <Typography className='on-my-watch-title' component="div" sx={{ flexGrow: 1, fontSize: 80 }}>
                        📺n My Watch
                    </Typography>
                    <Typography component="div" paragraph sx={{ fontSize: 30 }}>
                        Come find your next favorite show!
                    </Typography>

                </Toolbar>

                <div className='navbar-buttons'>
                    <div className='home-button'>
                        <Button onClick={() => navigate('/')} color="inherit" sx={{ fontSize: 20 }}>Home</Button>
                    </div>
                    <div className='recommendation-button'>
                        <Button onClick={() => alert("this is the recommendation button")} color="inherit" sx={{ fontSize: 20, }}>Make a New Recommendation</Button>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <Button onClick={() => handleLogout()} color="inherit" sx={{ fontSize: 20 }}>Logout </Button>

                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                                <Button onClick ={() => navigate('/register')} color="inherit" sx={{ fontSize: 20 }}>Register </Button>
                            </>
                        )}
                    </div>
                </div>
            </AppBar>
        </Box>
    )
}
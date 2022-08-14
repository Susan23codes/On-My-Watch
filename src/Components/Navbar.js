import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';




export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ 
                bgcolor: "#293e8a",
                // backgroundImage: "url('/film_image.jpg')",
                // backgroundSize: 'cover',
                // opacity: .6 
                }}>
                {/* <div> */}
                <Toolbar className='toolbar' sx={{ height: 200 }}>
                    {/* <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton> */}

                    <Typography className='on-my-watch-title' component="div" sx={{ flexGrow: 1, fontSize: 80 }}>
                        📺n My Watch
                    </Typography>
                    <Typography component="div" paragraph sx={{ fontSize: 30 }}>
                        Come find your next favorite show!
                    </Typography>

                </Toolbar>

                <div className='navbar-buttons'>
                    <div className='home-button'>
                        <Button onClick={() => alert("this is the home button")} color="inherit" sx={{ fontSize: 20 }}>Home</Button>
                    </div>
                    <div className='recommendation-button'>
                    <Button onClick={() => alert("this is the recommendation button")} color="inherit" sx={{ fontSize: 20,  }}>Make a New Recommendation</Button> 
                    </div>
                    <div>
                    <Button onClick={() => alert("this is the login button")} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                    <Button onClick={() => alert("this is the register button")} color="inherit" sx={{ fontSize: 20}}>Register </Button>
                    </div>
                </div>
            </AppBar>
        </Box>
    )
}
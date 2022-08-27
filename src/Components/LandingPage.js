import Button from '@mui/material/Button';


export default function LandingPage(props) {
    const {navigate} = props

    let mediums = [
        {
        name: "movie"
    },
    {
        name: "show"
    }
]


    return (
        <>
            <div className="landing-page-header" style={{ backgroundColor: "#293e8a", height: '150px', width: '100vw' }}>
                <>
                <div className="title">
                <h1 style={{fontSize:'50px'}}>📺n My Watch</h1>
                </div>
                <div className='login-register'>
                    <Button onClick={() => navigate('/login')} color="inherit" sx={{ fontSize: 20 }}>Login </Button>
                    <Button onClick={() => navigate('/register')} color="inherit" sx={{ fontSize: 20 }}>Register </Button>
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
        </>
    )
}
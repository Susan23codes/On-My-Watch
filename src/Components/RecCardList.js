import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { GiFilmProjector } from 'react-icons/gi';
import Carousel from 'react-material-ui-carousel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { CardActionArea } from '@mui/material';


const style = {
    // position: 'absolute',
    marginTop: '400px',
    marginLeft: '400px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#d8e0e6',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function RecCardList(props) {
    const { isLoggedIn, token, navigate, username } = props

    const [recommendationList, setRecommendationList] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/recommendation/')
            .then(res => {
                console.log("Date")
                console.log(new Date(res.data[0].created_at))
                let results = (res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
                setRecommendationList(results)
                console.log(results)

            })
    }, [])



    return (
        <>
            <div className='homepage-sidebar-and-cards'>
                {isLoggedIn &&
                    <>
                        <div className='homepage-sidebar'>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <GiFilmProjector style={{ marginTop: '38px' }} />
                                <GiFilmProjector style={{ marginTop: '42px' }} />
                                <GiFilmProjector style={{ marginTop: '42px' }} />
                                <GiFilmProjector style={{ marginTop: '60px' }} />

                            </div >
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px', marginTop:'18px' }}>
                                <Link to={"/mywatchlist"} style={{ textDecoration: 'none', color: 'white', marginBottom: '35px', marginTop: '20px' }}> My Watchlist</Link>
                                <Link to={"/following"} style={{ textDecoration: 'none', color: 'white', marginBottom: '35px' }}> Following</Link>
                                <Link to={"/watched"} style={{ textDecoration: 'none', color: 'white', marginBottom: '35px' }}> What I've Watched</Link>
                                <a href="#" onClick={handleOpen} style={{ textDecoration: 'none', color: 'white', marginBottom: '35px' }}> Sentiment Analysis Color Key</a>

                            </div>

                        </div>
                    </>
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-color-key"
                    aria-describedby="modal-emotion-color-key"
                >
                    <Box sx={style}>
                        <div className='close-color-key'>
                            <CardActionArea style={{ width: '20px', height: '20px' }}>
                                <CloseIcon style={{ height: '20px', width: '20px' }} onClick={handleClose} />
                            </CardActionArea>
                        </div>
                        <div className='color-key' style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '30px' }}>
                                Color Key:
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#A9DEF9' }} >
                                Sadness
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#FFFF99' }}>
                                Joy
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#E4C1F9' }}>
                                Fear
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#EDE7B1' }}>
                                Disgust
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#FBC4A3' }}>
                                Surprise
                            </div>
                            <div className='emotion-names' style={{ backgroundColor: '#FF4137' }}>
                                Anger
                            </div>
                        </div>
                    </Box>
                </Modal>


                <div className='homepage-cards-and-welcome'>

                    {isLoggedIn &&
                        <p style={{ fontSize: 25, textAlign:'center', fontStyle: 'italic', color: "#293e8a", }}>Welcome, {username}!  Check out the latest recommendations...</p>
                    }


                    <div className='card' style={{ height: '400px' }}>
                        {!recommendationList &&
                            <img src="/loadingAnimation.gif"
                                className="checkGif"
                                alt="gifImage"
                                height="200"
                                style={{ paddingRight: 200, marginTop: 100 }}>
                            </img>}
                        <Carousel
                            className='carousel'
                            CycleNavigation
                            interval={3000}
                            fullHeightHover={false}
                        // IndicatorIcon={false}
                        >
                            {/* {recommendationList && recommendationList.filter(cardObject => cardObject.user !== username).slice(0, 25) */}
                            {recommendationList && recommendationList.slice(0, 25)

                                .map((cardObject, index) => {
                                    return (
                                        <SingleCard className='carouselCards'
                                            cardObject={cardObject}
                                            key={index}
                                            id={cardObject.id}
                                            isLoggedIn={isLoggedIn}
                                            token={token}
                                            username={username}
                                            navigate={navigate}
                                        />
                                    )
                                }
                                )}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>

    );
}
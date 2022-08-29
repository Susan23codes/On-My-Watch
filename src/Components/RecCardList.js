import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { GiFilmProjector } from 'react-icons/gi';
import Carousel from 'react-material-ui-carousel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
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
                            <ul className='my-stuff'></ul>
                            <li><GiFilmProjector /><Link to={"/mywatchlist"} style={{ textDecoration: 'none', color: 'white' }}> My Watchlist</Link></li><br />
                            <li><GiFilmProjector /><Link to={"/following"} style={{ textDecoration: 'none', color: 'white' }}> Following</Link></li><br />
                            <li><a href="#" onClick={handleOpen} style={{ textDecoration: 'none', color: 'white' }}><GiFilmProjector /> Sentiment Analysis Color Key</a></li><br />
                            <li><GiFilmProjector /><Link to={"/watched"} style={{ textDecoration: 'none', color: 'white' }}> What I've Watched</Link></li><br />
                            <li><GiFilmProjector /><Link to={"/new"} style={{ textDecoration: 'none', color: 'white' }}> Make a New Recommendation</Link></li>
                        </div>
                    </>
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                        <p style={{ fontSize: 25 }}>Welcome, {username}!  Check out these latest recommendations!</p>
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
                                        <SingleCard
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
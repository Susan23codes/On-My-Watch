import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { GiFilmProjector } from 'react-icons/gi';
import Carousel from 'react-material-ui-carousel';
import { red } from '@mui/material/colors';
import { isVisible } from '@testing-library/user-event/dist/utils';




export default function RecCardList(props) {
    const { isLoggedIn, token, navigate, username } = props

    const [recommendationList, setRecommendationList] = useState(null)



    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/recommendation/')
            .then(res => {
                let results = (res.data)
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
                            <li><GiFilmProjector /><Link to={"/search"} style={{ textDecoration: 'none', color: 'white' }}> Search</Link></li><br />
                            <li><GiFilmProjector /><Link to={"/watched"} style={{ textDecoration: 'none', color: 'white' }}> What I've Watched</Link></li><br />
                            <li><GiFilmProjector /><Link to={"/new"} style={{ textDecoration: 'none', color: 'white' }}> Make a New Recommendation</Link></li>
                        </div>
                    </>
                }
                {!isLoggedIn &&
                    <div className='homepage-sidebar-logged-out'>
                        <ul className='my-stuff'></ul>
                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Need inspiration for a new show?  You've come to the right place!</li><br />
                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Browse the latest recommendations for new ideas!</li><br />
                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Sign in or Register to follow people and see their recommendations!</li><br />
                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Search for your next favorite show!</li><br />

                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Make your own recommendations!</li><br />
                        <li style={{ fontSize: 20 }}><GiFilmProjector style={{ marginRight: 10 }} /> Add recommendations to your Watchlist! </li>


                    </div>
                }

                <div className='homepage-cards-and-welcome'>
                    {isLoggedIn &&
                        <p style={{  fontSize: 25 }}>Welcome, {username}!  Check out these latest recommendations!</p>
                    }
                    {/* {!isLoggedIn &&
                        <p style={{ paddingLeft: 20, fontSize: 25 }}>See the latest recommendations below!  Log in or sign up to access other great features!</p>
                    } */}
                    <div className='card' style={{ height: '400px'}}>
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
                            {recommendationList && recommendationList.filter(cardObject => cardObject.user !== username).slice(0, 25)
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
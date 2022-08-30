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

                            <li className='sidebarItem'><GiFilmProjector /><Link to={"/mywatchlist"} style={{ textDecoration: 'none', color: 'white' }}> My Watchlist</Link></li><br />
                            <li className='sidebarItem'><GiFilmProjector /><Link to={"/following"} style={{ textDecoration: 'none', color: 'white' }}> Following</Link></li><br />
                            <li className='sidebarItem'><GiFilmProjector /><Link to={"/search"} style={{ textDecoration: 'none', color: 'white' }}> Search</Link></li><br />
                            <li className='sidebarItem'><GiFilmProjector /><Link to={"/watched"} style={{ textDecoration: 'none', color: 'white' }}> What I've Watched</Link></li><br />

                        </div>
                    </>
                }


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
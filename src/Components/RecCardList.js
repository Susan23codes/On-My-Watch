import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { GiFilmProjector } from 'react-icons/gi';



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
                    <ul className='my-stuff'>My Stuff</ul>
                    <li><GiFilmProjector/><Link to={"/mywatchlist"} style={{ textDecoration: 'none', color: 'white' }}> My Watchlist</Link></li><br />
                    <li><GiFilmProjector/> Following</li><br />
                    <li><GiFilmProjector/> Search</li><br />
                    <li><GiFilmProjector/> Make a New Recommendation</li>
                </div>
                </>
                }
                {!isLoggedIn &&
                <div className='homepage-sidebar'>
                    <ul className='my-stuff'></ul>
                    <li style={{fontSize: 20}}><GiFilmProjector style={{marginRight:10}}/> Need inspiration for a new show?  You've come to the right place!</li><br />
                    <li style={{fontSize: 20}}><GiFilmProjector style={{marginRight:10}}/> Browse the latest recommendations for new ideas!</li><br />
                    <li style={{fontSize: 20}}><GiFilmProjector style={{marginRight:10}}/> Sign in or Register to follow people and see their recommendations!</li><br />
                    <li style={{fontSize: 20}}><GiFilmProjector style={{marginRight:10}}/> Search for your next favorite show!</li>
                </div>
                }
                <div className='card'>
                    {recommendationList && recommendationList.map((cardObject, index) => {
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
                </div>
            </div>
        </>

    );
}
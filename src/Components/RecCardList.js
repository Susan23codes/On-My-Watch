import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'



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
                <div className='homepage-sidebar'>
                    <ul className='my-stuff'>My Stuff:</ul>
                    <li><Link to={"/mywatchlist"} style={{ textDecoration: 'none', color: 'white' }}>My Watchlist</Link></li><br />
                    <li>Following</li><br />
                    <li>Make a New Recommendation</li>
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
                            />
                        )
                    }
                    )}
                </div>
            </div>
        </>

    );
}
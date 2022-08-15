import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';


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
            <button onClick={() => navigate('/mywatchlist')}>See my watchlist</button>
        </>

    );
}
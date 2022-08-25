import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function MyWatchlist(props) {
    const {navigate, token, SingleCard, isLoggedIn, username} = props
    const [error, setError] = useState(null)
    const [watchlist, setWatchlist] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/user/watchlist/recommendations/', 
        {headers: {
            Authorization: `Token ${token}`,
            }},)
        .then(res => {
            console.log(res.data)
            setWatchlist(res.data.reverse())

    
        })
    }, [] )
    
    
    return (
        <>
        <h1 style={{ textAlign: "center", fontSize: 50, color: "#293e8a",}}>Don't Just Watch TV, Watch Good TV!</h1>
        <h2 style={{ textAlign: "center", fontSize: 30, color: "#293e8a",}}>My Watchlist:</h2>
        <div className='watchlist-cards'>
        {watchlist && watchlist.map((cardObject, index) => {
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
        </>
    )

}
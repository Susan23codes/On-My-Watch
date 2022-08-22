import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function Watched(props) {
    const {navigate, token, SingleCard, isLoggedIn, username} = props
    const [error, setError] = useState(null)
    const [alreadyWatched, setAlreadyWatched] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/watchedlist/', 
        {headers: {
            Authorization: `Token ${token}`,
            }},)
        .then(res => {
            console.log(res.data)
            setAlreadyWatched(res.data)
            // setWatchList(Watchlist.reverse())
           
    
        })
    }, [] )
    
   
    return (
        <>
        <h1 style={{ textAlign: "center", fontSize: 50}}>I've already watched these fantastic shows:</h1>
        <div className='watchlist-cards'>
        {alreadyWatched && alreadyWatched.map((cardObject, index) => {
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
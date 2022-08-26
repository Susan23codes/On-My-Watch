import axios from 'axios';
import React, { useEffect, useState } from 'react';





export default function MyWatchlist(props) {
    const { navigate, token, SingleCard, isLoggedIn, username } = props
    const [error, setError] = useState(null)
    const [watchlist, setWatchlist] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/user/watchlist/recommendations/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setWatchlist(res.data.reverse())


            })
    }, [])


    return (
        <>
            <p style={{ textAlign: "left", fontSize: 30, fontStyle: 'italic', color: "#293e8a", }}>Don't Just Watch TV, Watch Good TV</p>
            <div className='watchlist-cards'>
                {!watchlist &&
                    <img src="/loadingAnimation.gif"
                        className="checkGif"
                        alt="gifImage"
                        height="200"
                        style={{ paddingRight: 200, marginTop: 100 }}>
                    </img>}
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
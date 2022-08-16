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
            setWatchlist(res.data)
            // let myWatchlist = (res.data.questions)
            // console.log(res.data)
            // setMyQuestionList(myQuestions.reverse())
            // console.log(myQuestions)
            // console.log(myQuestionList)
    
        })
    }, [] )
    
    // function handleSeeWatchlist() {
    //     // console.log("works")
    //     setError(null)

    //     axios.get(`https://onmywatch.herokuapp.com/api/user/favorite/recommendations/`,
    //         {
    //             headers: { Authorization: `Token ${token}` },
    //         })
    //         .then((res) => {
    //             navigate('/mywatchlist');
    //             console.log(res)
    //         })
    //         .catch((error) => {
    //             setError(error.message)
    //         })
    // }
    return (
        <>
        <h1 style={{ textAlign: "center", fontSize: 50}}>My Watchlist</h1>
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
                            />
                    )
        }
        )}
        </div>
        </>
    )

}
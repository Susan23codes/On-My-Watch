import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function MyWatchlist(props) {
    const {navigate, token, SingleCard, isLoggedIn} = props
    const [error, setError] = useState(null)
    const [onWatchlist, setOnWatchlist] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/user/favorite/recommendations/', 
        {headers: {
            Authorization: `Token ${token}`,
            }},)
        .then(res => {
            console.log(res.data)
            setOnWatchlist(res.data)
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
        <h1>My Watchlist</h1>
        {onWatchlist && onWatchlist.map((cardObject, index) => {
                    return (
                        <SingleCard 
                            cardObject={cardObject}
                            key={index}
                            id={cardObject.id}
                            isLoggedIn={isLoggedIn}
                            token={token}
                            />
                    )
        }
        )}
        </>
    )

}
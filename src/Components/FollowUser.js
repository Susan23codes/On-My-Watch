import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function FollowUser(props) {
    const { navigate, token, isLoggedIn, username } = props
    const [error, setError] = useState(null)
    const [followinglist, setFollowinglist] = useState(false)

    useEffect(() => {
        axios.post('https://onmywatch.herokuapp.com/api/following/', 
        {headers: {
            Authorization: `Token ${token}`,
            }},)
        .then(res => {
            console.log(res.data)
            setFollowinglist(res.data)    
        })
    }, [] )


    return (

    // <>
    <h1>Here are the people I'm following!</h1>
    // {followinglist.map((person, index) => (
    //         <p key={index}>{person}</p>
    //     ))
    // }
    // </>  
    )


}
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiFilmProjector } from 'react-icons/gi';




export default function FollowUser(props) {
    const { navigate, token, isLoggedIn, username } = props
    const [error, setError] = useState(null)
    const [followinglist, setFollowinglist] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/following/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setFollowinglist(res.data)
            })
    }, [])


    return (

        <>
            <h1>Here are the fabulous people I'm following!</h1>
            {followinglist && followinglist.map((followingObject, index) => {
                return (
                    <ul>
                        <li key={index} style={{ fontSize: 30, listStyleType:"none"}}><GiFilmProjector style={{ marginRight: 10 }} />{followingObject.followee}</li>
                    </ul>
                )
            })
            }
        </>
    )


}
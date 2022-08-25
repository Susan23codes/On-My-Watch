import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiFilmProjector } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import FollowingCard from './FollowingCard';





export default function FollowUser(props) {
    const { navigate, token, isLoggedIn, username, SingleCard } = props
    const [error, setError] = useState(null)
    const [followinglist, setFollowinglist] = useState(false)
    const [recommendationList, setRecommendationList] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)

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
        axios.get('https://onmywatch.herokuapp.com/api/recommendation/')
            .then(res => {
                let results = (res.data)
                setRecommendationList(results)
                console.log(results)

            })
    }, [])


    return (

        <>
            <div className='following-background'
                style={{ height: '100vh', backgroundColor: '#c1c5c9' }}>
                <h1 style={{
                    fontSize: 40,
                    paddingLeft: 40,
                    paddingTop: 100,
                    marginTop: 0,
                    textAlign: 'center',
                    color: "#293e8a",
                }}>
                    🌟 We May All Be Stars in Our Own Show, But We Definitely Need a Supporting Cast! 🌟</h1>
                <h1 style={{
                    paddingLeft: 150,
                    color: "#293e8a"
                }}>
                    Here's Mine:</h1>
                <div className='following-list'>

                    {followinglist && followinglist.map((followingObject, index) => {
                        return (
                            <div className='following-list-item'>
                                <>
                                    <FollowingCard
                                        followingObject={followingObject}
                                        recommendationList={recommendationList}
                                        token={token}
                                    />

                                </>
                            </div>

                        )
                    })
                    }
                </div>
            </div>
        </>
    )


}
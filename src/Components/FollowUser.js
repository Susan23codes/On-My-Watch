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
            <h1 style={{ paddingLeft: 40 }}>Here are the fabulous people I'm following and their recommendations!</h1>
            <div className='following-list'>
                {followinglist && followinglist.map((followingObject, index) => {
                    return (
                        <FollowingCard 
                            followingObject={followingObject}
                            recommendationList={recommendationList}
                            />
                    )
                })
                }
            </div>
        </>
    )


}
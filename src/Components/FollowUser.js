import axios from 'axios';
import React, { useEffect, useState } from 'react';
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


<p style={{ marginLeft: '20px', textAlign: "left", fontSize: 30, fontStyle: 'italic', color: "#293e8a", }}>My Supporting Cast</p>
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

        </>
    )


}
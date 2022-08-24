import React, { useState } from 'react';
import axios from 'axios';
import { GiFilmProjector } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Tooltip, CardActionArea } from '@mui/material';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';



export default function FollowingCard(props) {
    const { followingObject, recommendationList, token, followPk } = props
    const [isExpanded, setIsExpanded] = useState(false)
    const [error, setError] = useState(null)
    const [isFollowing, setIsFollowing] = useState(true)

    function handleUnfollowUser() {
        setError(null)
        console.log(`https://onmywatch.herokuapp.com/api/follows/${followingObject.id}/delete/`)
        axios.delete(`https://onmywatch.herokuapp.com/api/follows/${followingObject.id}/delete/`,
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                setIsFollowing(false)
            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })

    }

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <>


            <div className='following-list-names' >
                <div className='following-list-name-and-avatar' style={{ fontSize: 40, paddingLeft: 40, listStyleType: "none", }}>
                    <Avatar sx={{ bgcolor: red[500], mr: 2 }} aria-label="recipe">
                        {followingObject.followee.charAt(0).toUpperCase()}
                    </Avatar>
                    {followingObject.followee}
                    {isExpanded ? (
                        <Tooltip title="See Less" arrow>
                            <IconButton onClick={() => setIsExpanded(false)} aria-label="mark as watched">
                                <ExpandLessIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="See Info" arrow>
                            <IconButton onClick={() => setIsExpanded(true)} aria-label="mark as watched">
                                <ExpandMoreIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <button onClick={() => { handleUnfollowUser(); refreshPage() }}
                        style={{ backgroundColor: '#293e8a', color: 'white', borderRadius: 15 }}
                    >
                        Unfollow {followingObject.followee}</button>
                </div>
            </div>
            {isExpanded ? (
                <>

                    <div className='following-list-cards' style={{ paddingLeft: 70 }}>
                        {recommendationList && recommendationList.filter(cardObject => cardObject.user === followingObject.followee)
                            .map((cardObject, index) => {
                                return (
                                    <div className='following-smaller-card'>
                                        <>
                                            <div className='following-info'>
                                                <div>
                                                    <img src={cardObject.poster} width='70' />
                                                </div>
                                                <div className='following-text'>
                                                    <p><strong>Title: </strong>{cardObject.title}</p>
                                                    <p><strong>Medium: </strong>{cardObject.medium}</p>
                                                    {/* <p><strong>Genre: </strong>{cardObject.genre}</p> */}
                                                    <Link to={`/detail/${cardObject.id}`}>Go to full recommendation card</Link>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                )
                            }
                            )}
                    </div>
                </>
            ) : (
                ('')
            )
            }

        </>
    )
}
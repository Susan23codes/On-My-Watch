import React, { useState } from 'react';
import { GiFilmProjector } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';


export default function FollowingCard(props) {
    const { followingObject, recommendationList } = props
    const [isExpanded, setIsExpanded] = useState(false)


    return (
        <>
            <div className='following-list-item'>
                <div className='following-list-names' >
                    <div className='following-list-name-and-avatar' style={{ fontSize: 40, paddingLeft: 40, listStyleType: "none", color: '#293e8a' }}>
                        <Avatar sx={{ bgcolor: red[500], mr:2 }} aria-label="recipe">
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
                    </div>
                </div>
                {isExpanded ? (
                    <>

                        <div style={{ paddingLeft: 100 }}>
                            {recommendationList && recommendationList.filter(cardObject => cardObject.user === followingObject.followee)
                                .map((cardObject, index) => {
                                    return (
                                        <div className='following-smaller-card'>
                                            <>
                                                <p><strong>Title: </strong>{cardObject.title}</p>
                                                <p><strong>Medium: </strong>{cardObject.medium}</p>
                                                {/* <p><strong>Genre: </strong>{cardObject.genre}</p> */}
                                                <Link to={`/detail/${cardObject.id}`}>Go to full recommendation card</Link>
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
            </div>
        </>
    )
}
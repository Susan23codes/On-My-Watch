import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiFilmProjector } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Tooltip, CardActionArea } from '@mui/material';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';




export default function FollowingCard(props) {
    const { followingObject, recommendationList, token, followPk } = props
    const [isExpanded, setIsExpanded] = useState(false)
    const [error, setError] = useState(null)
    const [isFollowing, setIsFollowing] = useState(true)
    const [open, setOpen] = useState(false)
    /* for (let i = 0; i < cardObject.genre.length; i++) {
         console.log(cardObject.genre[i].key)
     }*/

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        // bgcolor: 'background.paper',
        bgcolor: '#c1c5c9',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
                <div className='following-list-name-and-avatar' style={{ fontSize: 30, listStyleType: "none", }}>
                    <div className='avatar-and-name'>
                        {followingObject.user_info.image ? (
                            <Avatar src={followingObject.user_info.image} sx={{mr: 2, width: '60px', height: '60px' }} aria-label="avatar" alt="avatar" />

                        ) : (
                            <Avatar sx={{ bgcolor: red[500], mr: 2, height: 60, width: 60 }} aria-label="recipe">
                                {followingObject.followee.charAt(0).toUpperCase()}
                            </Avatar>
                        )
                        }
                        {followingObject.followee}
                    </div>
                    <div className='unfollow-and-modal-question-mark'>
                        <Tooltip title={`Unfollow ${followingObject.followee}`} placement="top-start">
                            <IconButton onClick={() => { handleUnfollowUser(); refreshPage() }} aria-label="unfollow">
                                <img className="follow-image"
                                    src="/following.png"
                                    height='24'
                                    padding='8'
                                    alt="Unfollow"

                                />
                            </IconButton>
                        </Tooltip>
                        {/* <button onClick={() => { handleUnfollowUser(); refreshPage() }}
                            style={{ backgroundColor: '#293e8a', color: 'white', borderRadius: 15 }}
                        >
                            Unfollow {followingObject.followee}</button> */}
                        <Tooltip title="See Recommendations">
                            <VisibilityIcon onClick={handleOpen}></VisibilityIcon>
                        </Tooltip>
                    </div>
                </div>

            </div>
            <>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-following-recommendations"
                    aria-describedby="modal-recommendations"
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style} >
                            <div className='close-icon-login'>
                                <CardActionArea style={{ width: '30px', height: '30px' }}>
                                    <CloseIcon style={{ height: '30px', width: '30px' }} onClick={handleClose} />
                                </CardActionArea>
                            </div>
                            <div className='following-list-cards' >
                                {/* <div className='close-icon-and-following'> */}
                                {/* <div>
                                    <CardActionArea style={{ width: '30px', height: '30px' }}>
                                        <CloseIcon style={{ height: '40px', width: '40px' }} onClick={handleClose} />
                                    </CardActionArea>
                                </div> */}

                                {recommendationList && recommendationList.filter(cardObject => cardObject.user === followingObject.followee)
                                    .map((cardObject, index) => {
                                        return (
                                            <div className={`following-smaller-card`}>
                                                <>
                                                    <div className='following-info'>
                                                        <div className='following-poster'>
                                                            <img src={cardObject.poster} width='70' alt='poster' />
                                                        </div>
                                                        <div className='following-text'>
                                                            <p>{cardObject.title}</p>
                                                            <p>{cardObject.medium}</p>
                                                            <Link to={`/detail/${cardObject.id}`}>Go to full recommendation card</Link>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        )
                                    }
                                    )}
                                {/* </div> */}
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </>
        </>
    )
}
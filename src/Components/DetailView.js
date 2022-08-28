
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import moment from 'moment'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Comments from "./Comments";
import TheatersIcon from '@mui/icons-material/Theaters';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { CardActionArea, Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import MoreMovies from "./MoreMovies";
import { flexbox } from '@mui/system';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function DetailView(props) {
    const { isLoggedIn, token, length, username } = props

    const [cardDetail, setCardDetail] = useState(null)
    const [expanded, setExpanded] = useState(false);
    const [isOnWatchList, setIsOnWatchList] = useState(false)
    const [isOnWatchedList, setIsOnWatchedList] = useState(false)
    const [error, setError] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followPk, setFollowPk] = useState(null)
    const [comment, setComment] = useState('')
    const [showAddComment, setShowAddComment] = useState(false)
    // const [showRelatedMovies, setShowRelatedMovies] = useState(false)
    const [otherUserSameRecommendation, setOtherUserSameRecommendation] = useState(null)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }


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

    const params = useParams()
    console.log(params)

    let firstRequestResults = null
    useEffect(() => {
        axios.get(`https://onmywatch.herokuapp.com/api/recommendation/${params.recommendationId}`)
            .then(res => {
                let results = (res.data)
                console.log('first axios')
                setCardDetail(results)
                firstRequestResults = results
                console.log(results)
                if (results.saved_by.includes(username)) {
                    setIsOnWatchList(true)
                    // console.log("yes")
                }
                else {
                    setIsOnWatchList(false)
                    // console.log("no")
                }



                axios.get('https://onmywatch.herokuapp.com/api/following/',
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    })
                    .then(res => {
                        let results = (res.data)
                        console.log(res.data)

                        let filteredList = results.filter(result => result.followee_id === firstRequestResults.user_info.id)
                        if (filteredList.length === 1) {
                            setFollowPk(filteredList[0].id)
                        }


                        let mappedList = results.map(result => result.followee_id)
                        // console.log("***")
                        // console.log(filteredList)
                        console.log(mappedList)
                        // console.log("***")

                        if (mappedList.includes(firstRequestResults.user_info.id)) {
                            // console.log("yes")
                            setIsFollowing(true)
                        }
                        else {
                            setIsFollowing(false)
                            // console.log("no")
                        }
                    })


                axios.get('https://onmywatch.herokuapp.com/api/watchedlist/',
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    })
                    .then(res => {
                        let results = (res.data)
                        // firstRequestResults = results
                        console.log(results)

                        let mappedList = results.map(result => result.imdbid)

                        if (mappedList.includes(firstRequestResults.imdbid)) {
                            // console.log("yes")
                            setIsOnWatchedList(true)
                        }
                        else {
                            setIsOnWatchedList(false)
                            // console.log("no")
                        }

                    })

                axios.get(`https://onmywatch.herokuapp.com/api/search/recommendations/?search=${firstRequestResults.imdbid}`)
                    .then(res => {
                        let results = (res.data)
                        // console.log("***")
                        console.log(results)
                        // console.log("***")
                        let filteredList = results.filter(result => {
                            return result.imdbid === firstRequestResults.imdbid && result.user !== firstRequestResults.user
                        })
                        console.log("***")
                        console.log(filteredList)
                        console.log("***")
                        // console.log(filteredList.map(listObject => listObject.user.charAt(0).toUpperCase()))
                        let userInfoForWhoElseRecommended = filteredList.map(listObject => listObject.user_info)
                        console.log(userInfoForWhoElseRecommended)
                        setOtherUserSameRecommendation(userInfoForWhoElseRecommended)
                    })

            })
    },
        [])




    function handleAddToWatchList() {
        console.log(`added ${cardDetail.id}!`)
        // setOnWatchList(true)
        setError(null)
        axios.post(`https://onmywatch.herokuapp.com/api/recommendation/${cardDetail.id}/watchlist/`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log("This is a favorite!")
                setIsOnWatchList(true)

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function handleDeleteFromWatchList() {
        console.log("deleted!")
        setIsOnWatchList(false)
        setError(null)
        axios.delete(`https://onmywatch.herokuapp.com/api/recommendation/${cardDetail.id}/watchlist/`,
            {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                setIsOnWatchList(false)
                console.log("This is no longer a favorite!")

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function handleDeleteRecommendationCard() {
        setError(null)

        axios.delete(`https://onmywatch.herokuapp.com/api/recommendation/${cardDetail.id}/delete/`,
            {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                navigate('/');
                console.log(res)
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    function handleFollowUser() {
        setError(null)
        axios.post('https://onmywatch.herokuapp.com/api/follows/',

            { followee: cardDetail.user_info.id },

            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log(`added ${cardDetail.user_info.id}!`)
                setIsFollowing(true)
                setFollowPk(res.data.pk)

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }


    function handleUnfollowUser() {
        setError(null)
        // console.log(`https://onmywatch.herokuapp.com/api/follows/${followPk}/delete/`)
        axios.delete(`https://onmywatch.herokuapp.com/api/follows/${followPk}/delete/`,
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log(`added ${cardDetail.user_info.id}!`)
                setIsFollowing(false)
            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })

    }

    function handleMovetoWatchedList() {
        setError(null)
        axios.post(`https://onmywatch.herokuapp.com/api/recommendation/${cardDetail.id}/watchedlist`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log("You've watched this now!")
                setIsOnWatchedList(true)


            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function handleDeleteFromWatchedList() {
        setError(null)
        axios.delete(`https://onmywatch.herokuapp.com/api/recommendation/${cardDetail.id}/watchedlist`,
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log("You've deleted this from WATCHED!")
                setIsOnWatchedList(false)

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function handleShowComment() {
        if (!showAddComment) {
            return (
                <Tooltip title="Add a Comment Below" arrow>
                    <IconButton onClick={() => setShowAddComment(true)} aria-label="add">
                        <CommentIcon sx={{ color: "red" }} />
                    </IconButton>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Add a Comment Below" arrow>
                    <IconButton onClick={() => setShowAddComment(false)} aria-label="add">
                        <CommentIcon sx={{ color: "red" }} />
                    </IconButton>
                </Tooltip>
            )
        }
    }

    function handleDelete() {

        if (username === cardDetail.user) {
            return (
                <Tooltip title="Delete Your Recommendation" arrow>
                    <IconButton onClick={() => handleDeleteRecommendationCard()} aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} className="see-related" />
                    </IconButton>
                </Tooltip>
            )
        } else {
            return (
                ('')
            )
        }
    }

    function getAddedToWatchedListIcon() {
        if (isLoggedIn && !isOnWatchList) {
            return (
                <>
                    {handleDelete()}
                    {handleIsFollowing()}

                    <Tooltip title="Related Shows" arrow>
                        <IconButton onClick={handleOpen} aria-label="add">
                            <TheatersIcon sx={{ color: "red" }} className="see-related" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Add to Watchlist" arrow>
                        <IconButton onClick={() => handleAddToWatchList()} aria-label="add">
                            <AddToQueueIcon sx={{ color: "red" }} className="addtoqueue" />
                        </IconButton>
                    </Tooltip>
                    {handleShowComment()}
                </>
            )
        }
        else if (isLoggedIn && isOnWatchList && !isOnWatchedList) {
            return (
                <>
                    {handleDelete()}
                    {handleIsFollowing()}


                    <Tooltip title="See Related Movies Below" arrow>
                        <IconButton onClick={handleOpen} aria-label="add">
                            <TheatersIcon sx={{ color: "red" }} className="see-related" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Added to Watchlist!" arrow>
                        <IconButton onClick={() => handleDeleteFromWatchList()} aria-label="delete">
                            <BookmarkAddedIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                    {handleShowComment()}
                    <Tooltip title="Mark as Watched" arrow>
                        <IconButton onClick={() => handleMovetoWatchedList()} aria-label="mark as watched">
                            <CheckCircleOutlineIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
        else if (isLoggedIn && isOnWatchList && isOnWatchedList) {
            return (
                <>
                    {handleDelete()}
                    {handleIsFollowing()}


                    <Tooltip title="See Related Movies Below" arrow>
                        <IconButton onClick={handleOpen} aria-label="add">
                            <TheatersIcon sx={{ color: "red" }} className="see-related" />
                        </IconButton>
                    </Tooltip>

                    {handleShowComment()}
                    <Tooltip title="You've Watched This" arrow>
                        <IconButton onClick={() => handleDeleteFromWatchedList()} aria-label="delete from watched">
                            <CheckCircleIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    }

    function handleAddComment(e) {
        e.preventDefault()
        setError(null)
        console.log(comment)

        axios.post(`https://onmywatch.herokuapp.com/api/recommendation/${params.recommendationId}/comment/`,
            {
                comment: comment,
                recommendation: params.recommendationId
            },
            {
                headers: { Authorization: `Token ${token}` },
            })
            .then(res => {
                setComment('')
                console.log(comment)
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    function handleIsFollowing() {
        if (isFollowing) {
            return (
                <>
                    <Tooltip title={`Unfollow ${cardDetail.user}`} placement="top-start">
                        <IconButton onClick={() => handleUnfollowUser()} aria-label="unfollow">
                            <img className="follow-image"
                                src="/following.png"
                                height='24'
                                padding='8'
                                alt="Unfollow"

                            />
                        </IconButton>
                    </Tooltip>
                </>)
        } else {
            return (
                <>
                    <Tooltip title={`Follow ${cardDetail.user}`} placement="top-start">
                        <IconButton onClick={() => handleFollowUser()} aria-label="follow">
                            <img className="follow-image"
                                src="/follow.png"
                                padding='8'
                                height='24'
                                alt="Follow"
                            />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    }




    return (
        <>
            {cardDetail &&
                <>
                    {/* <p style={{  marginLeft:'80px', marginBottom: 0 }}>You have great taste!</p> */}
                    <div className="detail-page">

                        <Card className="card-detail" sx={{ bgcolor: '#e9eef0', width: '75vw', mr: 2, ml: 10, mt: 5, mb: 2, border: 2, pt: 2, gridRowStart: 1 }}>

                            <CardHeader
                                sx={{
                                    pt: 0,
                                }}
                                avatar={cardDetail.user_info.image ? (
                                    <Avatar src={cardDetail.user_info.image} sx={{ width: '60px', height: '60px' }} aria-label="avatar" alt="avatar" />
                                ) : (
                                    <Avatar sx={{ bgcolor: red[500], mr: 2, height: 60, width: 60 }} aria-label="recipe">
                                        {cardDetail.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                )
                                } 
                                titleTypographyProps={{ variant: 'h3' }}
                                action={getAddedToWatchedListIcon()}
                                title={cardDetail.title}
                                subheader=
                                {<Tooltip title="See other recommendations by this user">
                                    <CardActionArea sx={{ fontSize: '15px' }} onClick={() => navigate(`/more/${cardDetail.user_info.id}`)}>
                                        Recommended by: {cardDetail.user} on {moment(cardDetail.created_at)
                                            .format('MM/DD/YY')}
                                    </CardActionArea>
                                </Tooltip>
                                }

                            />

                            <div className='poster-and-text'>
                                <div className='poster'>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        sx={{ width: 250, pl: 5 }}
                                        image={cardDetail.poster}
                                        alt="TV poster"
                                    />
                                </div>
                                <CardContent className="card-content">
                                    {/* sx={{ width: 1000 }}> */}

                                    <div className="avatars-and-medium">
                                        <div className="medium-and-watched-on">
                                            <Typography paragraph>
                                                <strong>Medium:</strong> {cardDetail.medium}
                                            </Typography>

                                            <Typography paragraph>
                                                <strong>Watched on:</strong> {cardDetail.streaming_service}
                                            </Typography>
                                            <Typography paragraph>



                                            </Typography>
                                        </div>
                                        <div className="avatars-who-else">
                                            {otherUserSameRecommendation && otherUserSameRecommendation.slice(0, 4).map((user, index) => {
                                                return (
                                                    <Tooltip title={`${user.username} has also recommended this!`} placement="top-start">

                                                        {user.image ? (
                                                            <Avatar src={user.image} sx={{ width: '60px', height: '60px' }} aria-label="avatar" alt="avatar" />
                                                        ) : (
                                                            
                                                            <Avatar sx={{ bgcolor: red[500], mr: 2, height: 60, width: 60 }} aria-label="recipe">
                                                                {user.username.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                        )
                                                        }
                                                    </Tooltip>
                                                )
                                            })
                                            }
                                            {otherUserSameRecommendation && (otherUserSameRecommendation.length > 4) &&
                                                <>
                                                    <Avatar sx={{ fontSize: 14, textAlign: "center", bgcolor: "black", color: "white", width: 45, height: 45 }}>
                                                        {`+ ${otherUserSameRecommendation.length - 1} more!`}
                                                    </Avatar>
                                                </>
                                            }
                                        </div>
                                    </div>



                                    {cardDetail.genre !== null &&
                                        <>
                                            <div>
                                                <div className='movieBox'>
                                                    <strong>Genre: </strong>
                                                    <div>
                                                        &ensp;{cardDetail.genre.map((genreObj) => genreObj.key).join(', ')}
                                                    </div>


                                                </div>
                                            </div>

                                        </>
                                    }

                                    <Typography paragraph>
                                    </Typography>

                                    <Typography paragraph>
                                        <strong>Tags: </strong>{cardDetail.tag.join(', ')}
                                    </Typography>
                                    <Typography
                                        className="recommendation"
                                        sx={{ width: 600 }}>
                                        <strong>My Recommendation: </strong> {cardDetail.reason}
                                    </Typography>
                                </CardContent>


                            </div>


                            <CardActions className="see-comments">
                                See comments
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        <Comments
                                            token={token}
                                        />
                                    </Typography>
                                </CardContent>
                            </Collapse>

                        </Card>

                    </div>

                    {showAddComment && (
                        <>
                            <h2 className='comment-form'>Want to join in the conversation?  Add a comment below.</h2>
                            <div className='comment-form'>
                                <form>
                                    <textarea
                                        value={comment}
                                        className="write-comment"
                                        placeholder='Write a comment'
                                        rows={10}
                                        cols={50}
                                        onChange={(e) => setComment(e.target.value)}
                                    >

                                    </textarea>
                                </form>

                                <button type="button" onClick={handleAddComment} className="comment-button">Submit Comment</button>
                            </div>
                        </>
                    )}

                </>

            }
            {/* {showRelatedMovies && ( */}
            <>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-related-shows"
                    aria-describedby="modal-related-shows"
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    {/* <Fade in={open}> */}
                    <Box sx={style}>
                        <div className='close-icon-and-title'>
                            <CardActionArea style={{ width: '30px', height: '30px' }}>
                                <CloseIcon style={{ height: '40px', width: '40px' }} onClick={handleClose} />
                            </CardActionArea>
                            <div style={{ textAlign: 'start', fontStyle: 'italic', marginLeft: '10px', height: '100px', fontSize: '30px' }}><strong>More Shows Like This:</strong></div>
                        </div>
                        {cardDetail !== null && <MoreMovies object={cardDetail}></MoreMovies>}
                    </Box>
                    {/* </Fade> */}
                </Modal>
            </>

        </>
    )

}

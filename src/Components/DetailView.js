import SingleCard from "./SingleCard";
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
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { GiFilmProjector } from 'react-icons/gi';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Comments from "./Comments";
import TheatersIcon from '@mui/icons-material/Theaters';
import CheckIcon from '@mui/icons-material/Check';
import { StarIcon } from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { DarkMode } from '@mui/icons-material';
import { CardActionArea, Tooltip } from '@mui/material';
import { flexbox, maxWidth } from '@mui/system';
import MoreMovies from "./MoreMovies";


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
    const [showRelatedMovies, setShowRelatedMovies] = useState(false)
    const [otherUserSameRecommendation, setOtherUserSameRecommendation] = useState(null)
    const [color, setColor] = useState('#e9eef0')
    const sad = '#a9def9'
    const joy = '#ede7b1'
    const fear = '#e4c1f9'
    const disgust = '#ede7b1'
    const surprise = '#fbc4a3'
    const anger = '#f694c1'
    /* for (let i = 0; i < cardObject.genre.length; i++) {
         console.log(cardObject.genre[i].key)
     }*/
    function handleColor() {
        if (cardDetail.emotion !== null) {
            if (cardDetail.emotion.emotions_detected[0] !== null) {
                //   console.log(Object.keys(cardObject.emotion.emotion_scores).reduce((a, b) => cardObject.emotion.emotion_scores[a] > cardObject.emotion.emotion_scores[b] ? a : b))


                //      console.log(cardObject.emotion.emotions_detected[0])
                if (cardDetail.emotion.emotions_detected[0] === 'joy') { setColor(joy) }
                if (cardDetail.emotion.emotions_detected[0] === 'anger') { setColor(anger) }
                if (cardDetail.emotion.emotions_detected[0] === 'sadness') { setColor(sad) }
                if (cardDetail.emotion.emotions_detected[0] === 'disgust') { setColor(disgust) }
                if (cardDetail.emotion.emotions_detected[0] === 'surprise') { setColor(surprise) }
                if (cardDetail.emotion.emotions_detected[0] === 'fear') { setColor(fear) }
            }

        }
    }
    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }


    const params = useParams()
    console.log(params)

    let firstRequestResults = null
    useEffect(() => {
        handleColor()
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
                        console.log("***")
                        console.log(results)
                        console.log("***")
                        let filteredList = results.filter(result => {
                            return result.imdbid === firstRequestResults.imdbid && result.user !== firstRequestResults.user
                        })
                        // console.log("***")
                        console.log(filteredList)
                        // console.log("***")
                        // console.log(filteredList.map(listObject => listObject.user.charAt(0).toUpperCase()))
                        let avatarForWhoElseRecommended = filteredList.map(listObject => listObject.user)
                        console.log(avatarForWhoElseRecommended)

                        setOtherUserSameRecommendation(avatarForWhoElseRecommended)
                    })

            })
    },
        [])

    function seeWhoElseRecommended() {
        // axios.get(`https://onmywatch.herokuapp.com/api/search/recommendations/?search=${firstRequestResults.imdbid}&${otherUserSameRecommendation}`)
        //             .then(res => {
        //                 let results = (res.data)
        //                 console.log("***")
        //                 console.log(results)
        //                 console.log("***")
        //             })

        // let userFilteredList = otherUserSameRecommendation.filter((one, index) => one === user)
        console.log(otherUserSameRecommendation)

    }



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

    function getAddedToWatchedListIcon() {
        if (isLoggedIn && !isOnWatchList) {
            return (
                <>
                    {handleIsFollowing()}

                    {!showRelatedMovies ? (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(true)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(false)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    )}
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
                    {handleIsFollowing()}

                    {!showRelatedMovies ? (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(true)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(false)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    )}
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
                    {handleIsFollowing()}

                    {!showRelatedMovies ? (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(true)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="See Related Movies Below" arrow>
                            <IconButton onClick={() => setShowRelatedMovies(false)} aria-label="add">
                                <TheatersIcon sx={{ color: "red" }} className="see-related" />
                            </IconButton>
                        </Tooltip>
                    )}
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
                        <div className="detail-page-text">

                            {username === cardDetail.user ? (
                                <>
                                    <div className="delete-recommendation">
                                        <h2><GiFilmProjector /> Delete your recommendation?</h2>
                                        <Button onClick={() => handleDeleteRecommendationCard()}
                                            variant="contained" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                ('')
                            )
                            }

                        </div>
                        <Card className="card-detail" sx={{ bgcolor: color, width: '75vw', mr: 2, ml: 10, mt: 5, mb: 2, border: 2, pt: 2, gridRowStart: 1 }}>

                            <CardHeader
                                sx={{
                                    pt: 0,
                                }}
                                avatar={
                                    <Avatar sx={{
                                        bgcolor: red[500], width: 56, height: 56
                                    }} aria-label="avatar">
                                        {cardDetail.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                titleTypographyProps={{ variant: 'h3' }}
                                action={getAddedToWatchedListIcon()}
                                title={cardDetail.title}
                                subheader=
                                {<Tooltip title="See other recommendations by this user">
                                    <CardActionArea onClick={() => navigate(`/more/${cardDetail.user_info.id}`)}>
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
                                        height="230"
                                        sx={{ width: 200, pl: 5 }}
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
                                                    <Tooltip title={`${user} has also recommended this!`} placement="top-start">
                                                        <Avatar key={index} onClick={seeWhoElseRecommended} sx={{
                                                            bgcolor: red[500], width: 56, height: 56
                                                        }} aria-label="avatar">
                                                            {user.charAt(0).toUpperCase()}
                                                        </Avatar>
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
            {showRelatedMovies && (
                <>
                    <div style={{ textAlign: 'start', fontStyle: 'italic', marginLeft: '10px', marginTop: '30px', height: '100px', fontSize: '30px' }}><strong>More Movies Like This:</strong></div>
                    {cardDetail !== null && <MoreMovies object={cardDetail}></MoreMovies>}
                </>
            )}
        </>
    )

}
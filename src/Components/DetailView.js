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
import { autocompleteClasses, CardActionArea, Tooltip } from '@mui/material';
import { flexbox, maxWidth } from '@mui/system';


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
    const { isLoggedIn, token, SingleCard, cardObject, key, id, username } = props

    const [cardDetail, setCardDetail] = useState(null)
    const [expanded, setExpanded] = useState(false);
    const [isOnWatchList, setIsOnWatchList] = useState(false)
    const [isOnWatchedList, setIsOnWatchedList] = useState(false)
    const [error, setError] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followPk, setFollowPk] = useState(null)
    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }


    const params = useParams()
    console.log(params)

    useEffect(() => {
        let firstRequestResults = null
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
                            console.log("yes")
                            setIsFollowing(true)
                        }
                        else {
                            setIsFollowing(false)
                            console.log("no")
                        }
                    })

                console.log(`Starting watchedList request.  Results of frr: ${firstRequestResults}`)
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
                            console.log("yes")
                            setIsOnWatchedList(true)
                        }
                        else {
                            setIsOnWatchedList(false)
                            console.log("no")
                        }

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
                console.log("You've watched this now!")
                setIsOnWatchedList(false)

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function getAddedToWatchedListIcon() {

        if (isLoggedIn && !isOnWatchList) {
            return (
                <>
                    <Tooltip title="Add to Watchlist" arrow>
                        <IconButton onClick={() => handleAddToWatchList()} aria-label="add">
                            <AddToQueueIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="See/Add Comments" arrow>
                        <IconButton onClick={() => navigate(`/comments/${cardDetail.id}`, { state: { title: cardDetail.title } })} aria-label="add">
                            <CommentIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>

                </>
            )
        }
        else if (isLoggedIn && isOnWatchList && !isOnWatchedList) {
            return (
                <>
                    <Tooltip title="Added to Watchlist!" arrow>
                        <IconButton onClick={() => handleDeleteFromWatchList()} aria-label="delete">
                            <BookmarkAddedIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="See/Add Comments" arrow>
                        <IconButton onClick={() => navigate(`/comments/${cardDetail.id}`, { state: { title: cardDetail.title } })} aria-label="add">
                            <CommentIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
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
                    <Tooltip title="See/Add Comments" arrow>
                        <IconButton onClick={() => navigate(`/comments/${cardDetail.id}`, { state: { title: cardDetail.title } })} aria-label="add">
                            <CommentIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="You've Watched This" arrow>
                        <IconButton onClick={() => handleDeleteFromWatchedList()} aria-label="delete from watched">
                            <CheckCircleIcon sx={{ color: "red" }} />
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
                    <h1 style={{ textAlign: 'center' }}>You have great taste!  Here are some more details about {cardDetail.title}!</h1>
                    <div className="detail-page">
                        <div className="detail-page-text">
                            <h2><GiFilmProjector /> Click here to see {cardDetail.user}'s other recommendations!</h2>
                            <h2><GiFilmProjector /> Click here to see who else has recommended {cardDetail.title}!</h2>

                            {!isFollowing ? (
                                <>
                                    <CardActionArea sx={{ fontSize: 16 }}>
                                        <h2 onClick={() => handleFollowUser()}><GiFilmProjector /> Click here to follow {cardDetail.user}!</h2>
                                    </CardActionArea>
                                </>
                            ) : (
                                <CardActionArea sx={{ fontSize: 16 }}>
                                    <h2 onClick={() => handleUnfollowUser()}><GiFilmProjector /> You are now following {cardDetail.user}!  Click to unfollow.</h2>
                                </CardActionArea>
                            )
                            }

                            {username === cardDetail.user ? (
                                <>
                                    <h2><GiFilmProjector /> Would you like to delete your recommendation?</h2>
                                    <Button onClick={() => handleDeleteRecommendationCard()}
                                        variant="contained" startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </>
                            ) : (
                                ('')
                            )
                            }

                        </div>
                        <Card className="card-detail" sx={{ bgcolor: '#e9eef0', width: 550, mr: 2, ml: 10, mt: 5, mb: 2, border: 2, pt: 2, gridRowStart: 1 }}>
                            <CardHeader
                                sx={{
                                    pt: 0,
                                    '& .MuiCardHeader-title, css-1qvr50w-MuiTypography-root': {
                                        width: 250
                                    }
                                }}
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {cardDetail.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                titleTypographyProps={{ variant: 'h5' }}
                                action={getAddedToWatchedListIcon()}
                                title={cardDetail.title}
                                subheader=

                                {<Tooltip title="See other recommendations by this user">
                                    <CardActionArea>
                                        Recommended by: {cardDetail.user} on {moment(cardDetail.created_at)
                                            .format('MM/DD/YY')}
                                    </CardActionArea>
                                </Tooltip>}

                            />
                            <div className='poster-and-text'>
                                <div className='poster'>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={cardDetail.poster}
                                        alt="TV poster"
                                    />
                                </div>
                                <CardContent>
                                    <Typography paragraph>
                                        <strong>Medium:</strong> {cardDetail.medium}
                                    </Typography>
                                    <Typography paragraph>
                                        <strong>Streaming on:</strong> {cardDetail.streaming_service}
                                    </Typography>
                                    <Typography paragraph>
                                        <strong>Genre:</strong> {cardDetail.genre}
                                    </Typography>
                                    <Typography paragraph>
                                        <strong>Tags: </strong>{cardDetail.tag.join(', ')}
                                    </Typography>
                                </CardContent>
                            </div>
                            <CardActions disableSpacing>
                                Click to see my recommendation!
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
                                    {/* <Typography paragraph>Why I Recommend this:</Typography> */}
                                    <Typography paragraph>
                                        {cardDetail.reason}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                </>
            }
        </>
    )

}
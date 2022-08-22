import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Navigate, useParams, } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
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




export default function SingleCard(props) {
    const { cardObject, id, isLoggedIn, token, username, navigate } = props

    const [expanded, setExpanded] = useState(false);
    const [onWatchList, setOnWatchList] = useState(false)
    const [error, setError] = useState(null)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const params = useParams()
    // console.log(`QL: ${params.id}`)

    useEffect(() => {
        if (cardObject.saved_by.includes(username)) {
            setOnWatchList(true)
            console.log("yes")
        }
        else {
            setOnWatchList(false)
            console.log("no")
        }
    }, [])


    function handleAddToWatchList() {
        console.log(`added ${cardObject.id}!`)
        // setOnWatchList(true)
        setError(null)
        axios.post(`https://onmywatch.herokuapp.com/api/recommendation/${cardObject.id}/watchlist/`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                console.log("This is a favorite!")
                setOnWatchList(true)

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    function handleDeleteFromWatchList() {
        console.log("deleted!")
        setOnWatchList(false)
        setError(null)
        axios.delete(`https://onmywatch.herokuapp.com/api/recommendation/${cardObject.id}/watchlist/`,
            {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                setOnWatchList(false)
                console.log("This is no longer a favorite!")

            })
            .catch((error) => {
                setError(Object.values(error.response.data))
                console.log(error)
            })
    }

    // function getWatchListIcon() {
    //     if (isLoggedIn && !onWatchList) {
    //         return (
    //             <>
    //                 <Tooltip title="Add to Watchlist" arrow>
    //                     <IconButton onClick={() => handleAddToWatchList()} aria-label="add">
    //                         <AddToQueueIcon sx={{ color: "red" }} />
    //                     </IconButton>
    //                 </Tooltip></>
    //         )
    //     } else if (isLoggedIn && onWatchList) {
    //         return (
    //             <>
    //                 <Tooltip title="Added to Watchlist!" arrow>
    //                     <IconButton onClick={() => handleDeleteFromWatchList()} aria-label="delete">
    //                         <BookmarkAddedIcon sx={{ color: "red" }} />
    //                     </IconButton>
    //                 </Tooltip>
    //             </>
    //         )
    //     }
    //     return <></>
    // }

    

    return (
        <Card sx={{
            width: 550, mr: 2, mb: 2, border: 2, pt: 2, bgcolor: '#e9eef0', boxShadow: 3,
            "&:hover": {
                boxShadow: 9,
            },
        }}>
            <CardHeader
                sx={{
                    pt: 0,
                    '& .MuiCardHeader-title, css-1qvr50w-MuiTypography-root': {
                        width: 250
                    }
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {cardObject.user.charAt(0).toUpperCase()}
                    </Avatar>
                }
                titleTypographyProps={{ variant: 'h5' }}
                // action={getWatchListIcon()}
                title={cardObject.title}
                subheader=

                {<Tooltip title="See other recommendations by this user">
                    <CardActionArea>
                        Recommended by: {cardObject.user} on {moment(cardObject.created_at).format('MM/DD/YY')}
                    </CardActionArea>
                </Tooltip>}

            />
            <div className='poster-and-text'>
                <div className='poster'>
                    <CardMedia
                        component="img"
                        height="220"
                        image={cardObject.poster}
                        alt="Poster"
                    />
                </div>
                <CardContent>
                    <Typography paragraph>
                        <strong>Medium:</strong> {cardObject.medium}
                    </Typography>
                    <Typography paragraph>
                        <strong>Streaming on:</strong> {cardObject.streaming_service}
                    </Typography>
                    <Typography paragraph>
                        <strong>Genre:</strong> {cardObject.genre}
                    </Typography>
                    <Typography paragraph>
                        <strong>Tags: </strong>{cardObject.tag.join(', ')}
                    </Typography>
                </CardContent>
            </div>
            {isLoggedIn &&
                <CardActions>
                    <Button onClick={() => navigate(`/detail/${cardObject.id}`)} size="small">Click to See More!</Button>
                </CardActions>
            }
        </Card>
    )
}

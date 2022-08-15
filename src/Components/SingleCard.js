import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
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
    const { card, id, isLoggedIn } = props

    const [expanded, setExpanded] = useState(false);
    const [onWatchList, setOnWatchList] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const params = useParams()
    // console.log(`QL: ${params.id}`)


    function handleAddToWatchList() {
        console.log("added!")
        setOnWatchList(true)

    }

    function handleDeleteFromWatchList () {
        console.log("deleted!")
        setOnWatchList(false)
    }

    return (
        <Card sx={{ width: 450, mr: 2, mb: 2, border: 2, pt: 2, }}>
            <CardHeader
                sx={{
                    pt: 0,
                    '& .MuiCardHeader-title, css-1qvr50w-MuiTypography-root': {
                        width: 250
                    }
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {card.recommended_by.charAt(0).toUpperCase()}
                    </Avatar>
                }
                titleTypographyProps={{ variant: 'h5' }}
                action=
                {isLoggedIn && !onWatchList ? (
                    <>
                        <Tooltip title="Add to Watchlist" arrow>
                            <IconButton onClick={() => handleAddToWatchList()} aria-label="add">
                                <AddToQueueIcon sx={{ color: "red" }} />
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Add Recommender to Friend List" arrow>
                        <IconButton onClick={() => alert("Star is working")} aria-label="follow">
                            <StarBorderIcon  sx={{ color: "red" }} />
                        </IconButton>
                        </Tooltip> */}
                    </>
                ) : (
                    <>
                        <Tooltip title="Added to Watchlist!" arrow>
                            <IconButton onClick={() => handleDeleteFromWatchList()} aria-label="delete">
                                <CheckIcon sx={{ color: "red" }} />
                            </IconButton>
                        </Tooltip>
                    </>
    )}

                title={card.title}
                subheader=

                {<Tooltip title="Add to Friend List"><CardActionArea>Recommended by: {card.recommended_by}</CardActionArea></Tooltip>}

            />
            <div className='poster-and-text'>
                <div className='poster'>
                    <CardMedia
                        component="img"
                        height="220"
                        image="/dark_poster.jpeg"
                        alt="TV poster"
                    />
                </div>
                <CardContent>
                    <Typography paragraph>
                        <strong>Medium:</strong> {card.medium}
                    </Typography>
                    <Typography paragraph>
                        <strong>Streaming on:</strong> {card.streaming_on}
                    </Typography>
                    <Typography paragraph>
                        <strong>Genre:</strong> {card.genre.join(', ')}
                    </Typography>
                    <Typography paragraph>
                        <strong>Tags: </strong>{card.tags.join(', ')}
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
                    <Typography paragraph>Why I Recommend this:</Typography>
                    <Typography paragraph>
                        {card.recommendation}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

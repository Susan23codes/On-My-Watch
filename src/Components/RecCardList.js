import React from 'react';
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
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { DarkMode } from '@mui/icons-material';
import { autocompleteClasses, CardActionArea } from '@mui/material';
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

const dummyData = [
    {
        title: "Dark",
        recommended_by: "Susan",
        medium: "TV",
        streaming_on: "Netflix",
        genre: ["crime", "drama", "mystery"],
        tags: ["suspense", "foreign", "subtitled"],
        recommendation: "The series is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
    },
    {
        title: "It's Always Sunny in Philadelphia",
        recommended_by: "Me",
        medium: "TV2",
        streaming_on: "Netflix",
        genre: ["crime", "drama", "mystery"],
        tags: ["suspense", "foreign", "subtitled"],
        recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
    },
    {
        title: "Dark II",
        recommended_by: "Me",
        medium: "TV2",
        streaming_on: "Netflix",
        genre: ["crime", "drama", "mystery"],
        tags: ["suspense", "foreign", "subtitled"],
        recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
    },
    {
        title: "Dark II",
        recommended_by: "Joey",
        medium: "TV2",
        streaming_on: "Netflix",
        genre: ["crime", "drama", "mystery"],
        tags: ["suspense", "foreign", "subtitled"],
        recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
    },
    {
        title: "Dark II",
        recommended_by: "Nancy",
        medium: "TV2",
        streaming_on: "Netflix",
        genre: ["crime", "drama", "mystery"],
        tags: ["suspense", "foreign", "subtitled"],
        recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
    }
]


export default function RecCardList() {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className='card'>
                {dummyData.map((card, index) => {

                    return (
                        <Card sx={{ maxWidth: 450, mr: 2, mb: 2, border: 2, pt: 2, }}>
                            <CardHeader
                                sx={{ 
                                    pt: 0,
                                    '& .MuiCardHeader-title, css-1qvr50w-MuiTypography-root': {
                                        // border: 1,
                                        width: 250
                                
                                    } 
                                }}
                                avatar={
                                    <Avatar  sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {card.recommended_by.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                titleTypographyProps={{ variant: 'h5' }}
                                action={
                                    <>
                                        Add to WatchList <br />
                                        <IconButton aria-label="settings">
                                            <AddToQueueIcon sx={{ color: "red" }} />
                                        </IconButton>
                                        {/* <IconButton aria-label="settings">
              <StarIcon sx={{color:"black"}}/>
            </IconButton> */}
                                    </>
                                }
                                title={card.title}
                                subheader={<CardActionArea>Recommended by: {card.recommended_by}</CardActionArea>}  
                                
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
                                {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
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
                )}
            </div>
        </>
    );
}
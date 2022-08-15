import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

// const dummyData = [
//     {
//         title: "Dark",
//         id: 1,
//         image: "/dark_poster.jpeg",
//         recommended_by: "Susan",
//         medium: "TV",
//         streaming_on: "Netflix",
//         genre: ["crime", "drama", "mystery"],
//         tags: ["suspense", "foreign", "subtitled"],
//         recommendation: "The series is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
//     },
//     {
//         title: "It's Always Sunny in Philadelphia and I love living here",
//         id: 2,
//         image: "/dark_poster.jpeg",
//         recommended_by: "Me",
//         medium: "TV2",
//         streaming_on: "Netflix",
//         genre: ["crime", "drama", "mystery"],
//         tags: ["suspense", "foreign", "subtitled"],
//         recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
//     },
//     {
//         title: "Dark II",
//         id: 3,
//         image: "/dark_poster.jpeg",
//         recommended_by: "Me",
//         medium: "TV2",
//         streaming_on: "Netflix",
//         genre: ["crime", "drama", "mystery"],
//         tags: ["suspense", "foreign", "subtitled"],
//         recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
//     },
//     {
//         title: "Dark II",
//         id: 4,
//         image: "/dark_poster.jpeg",
//         recommended_by: "Joey",
//         medium: "TV2",
//         streaming_on: "Netflix",
//         genre: ["crime", "drama", "mystery"],
//         tags: ["suspense", "foreign", "subtitled"],
//         recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
//     },
//     {
//         title: "Dark II",
//         id: 5,
//         image: "/dark_poster.jpeg",
//         recommended_by: "Nancy",
//         medium: "TV2",
//         streaming_on: "Netflix",
//         genre: ["crime", "drama", "mystery"],
//         tags: ["suspense", "foreign", "subtitled"],
//         recommendation: "The TV show is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
//     }
// ]




export default function RecCardList(props) {
    const { isLoggedIn, token, navigate, username } = props

    const [recommendationList, setRecommendationList] = useState(null)
    const [error, setError] = useState(null)
    const [onWatchList, setOnWatchList] = useState(false)


    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/recommendation/')
        .then(res => {
                let results = (res.data)
                setRecommendationList(results)
                console.log(results)
                results.map((cardObject, index) => {
                    if (results.favorited_by.includes(username)){
                        setOnWatchList(true)
                        console.log("yes")
                    }
                    else {
                        setOnWatchList(false)
                        console.log("no")
                }
              
                }
         ) })
    }, [])


    return (
        <>
            <div className='card'>
                {recommendationList && recommendationList.map((cardObject, index) => {
                    return (
                        <SingleCard 
                            cardObject={cardObject}
                            key={index}
                            id={cardObject.id}
                            isLoggedIn={isLoggedIn}
                            token={token}
                            />
                    )
                }
                )}
            </div>
            <button onClick={() => navigate('/mywatchlist')}>See my watchlist</button>
        </>
    
    );
}
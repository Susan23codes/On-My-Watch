import React from 'react';
import SingleCard from './SingleCard';

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
        title: "It's Always Sunny in Philadelphia and I love living here",
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

    return (
        <>
            <div className='card'>
                {dummyData.map((card, index) => {

                    return (
                        <SingleCard card={card} key={index}/>
                    )
                }
                )}
            </div>
        </>
    );
}
import { useState, useEffect } from "react";
import SingleCard from './SingleCard'
import axios from "axios";
import MultipleSelectChip from "./ChipTagSelector";
import './RecForm.css';

export default function RecForm({ token }) {

    const [mediaObj, setMediaObj] = useState([{
        "id": "",
        "resultType": "",
        "image": "https://manciniworldwide.com/wp-content/uploads/2019/02/invisible-png.png",
        "title": "",
        "description": ""
    }])
    const [submitComplete, setSubmitComplete] = useState(false)
    const [mediaChosen, setmediaChosen] = useState(false)
    const [IMDBid, setIMDBid] = useState('')
    const [searchParams, setSearchParams] = useState('')
    const [title, setTitle] = useState("");
    const [movieTitle, setMovieTitle] = useState('')
    const [genre, setGenre] = useState([])
    const [medium, setMedium] = useState("")
    const [streaming_on, setStreaming_on] = useState("")
    const [tags, setTags] = useState([])
    const [recommendation, setRecommendation] = useState([])
    const [mediaImage, setMediaImage] = useState('')

    /* const [card, setCard] = useState({
         title: "Dark",
         recommended_by: "Susan",
         medium: "TV",
         streaming_on: "Netflix",
         genre: ["crime", "drama", "mystery"],
         tags: ["suspense", "foreign", "subtitled"],
         recommendation: "The series is centered on four main families in a small German town, and when people start to go missing, it seems like this is a crime drama. Instead, most of the missing are wandering into a nearby cave, which has doors open to the past, and occasionally the future. While this starts as a “find the missing kid lost in time” story, it evolves to become much, much more than that."
     })*/

    /*
        useEffect(() => {
            const proxyCard = card
            proxyCard.title = title
            proxyCard.genre = genre
            proxyCard.medium = medium
            proxyCard.streaming_on = streaming_on
            proxyCard.tags = tags
            proxyCard.recommendation = recommendation
            setCard(proxyCard)
    
        }, [card, genre, title, medium, streaming_on, recommendation, tags]);
    
    */


    function logData() {
        console.log(mediaObj)
        console.log(IMDBid)
        console.log(genre)
        console.log(title)
        console.log(movieTitle)
        console.log(tags)
        console.log(streaming_on)
        console.log(recommendation)
        console.log(mediaImage)
        console.log(medium)

    }
    function setData() {
        setGenre(mediaObj.genreList)
        setMediaImage(mediaObj.image)
        setMovieTitle(mediaObj.title)
        setMedium(mediaObj.type)
    }
    function movieSearch() {
        setMediaObj(
            [{
                "id": "",
                "resultType": "",
                "image": "/loadingAnimation.gif",
                "title": "",
                "description": ""
            }]
        )

        axios
            .get(
                `https://imdb-api.com/en/API/SearchTitle/k_dniyd8ih/${searchParams}`,
                {},
                {
                    headers: {},
                }
            )
            .then((res) => {
                console.log(res.data.results);
                setMediaObj(res.data.results);
            });

    }

    function SpecificMovieSearch(id) {
        axios
            .get(
                `https://imdb-api.com/en/API/Title/k_dniyd8ih/${id}`,
                {},
                {
                    headers: {},
                }
            )
            .then((res) => {
                console.log(res.data);
                setMediaObj(res.data);
            });

    }






    function handleSubmit() {
        setSubmitComplete(true)
        logData()
    }
    const handleChoseMedia = (event) => {
        setmediaChosen(true)
        const tempID = String(event.target.getAttribute('data-id'))
        SpecificMovieSearch(tempID)
        setIMDBid(tempID);
        setData()
        //   setGenre(mediaObj.genreList)
        //  setMediaImage(mediaObj.image)
        //   setTitle(mediaObj.title)

    }
    const handleChangeTitle = (event) => {
        console.log(event.target.value);
        setTitle(event.target.value)
    };

    const handleChangeRecommendation = (event) => {
        console.log(event.target.value);
        setRecommendation(event.target.value);
    };

    const handleChangeSearchParams = (event) => {
        console.log(event.target.value);
        setSearchParams(event.target.value)
    };

    const handleChangeStreaming_on = (event) => {
        console.log(event.target.value);
        setStreaming_on(event.target.value)
    };





    return (
        <>





            <div class="container">
                <div>{mediaChosen ?
                    <div></div>
                    :
                    <div>                <div className="input-field">

                        <label>First Choose What You Watched</label>
                        <br></br>
                        <input
                            className="input"
                            type="text"
                            onChange={handleChangeSearchParams}
                            value={searchParams}
                        /><div className="emptySpace"></div>
                        <input type="button" value="Search" onClick={movieSearch}></input>

                    </div></div>
                }</div>


                <div>
                    <div>
                        <div>{mediaChosen
                            ? <div>

                                <div className="media" >{mediaObj.title}<br></br>
                                    <img src={mediaObj.image} alt="mediaImage" data-id={mediaObj.id} width="150" height="200"></img>
                                </div>

                            </div >
                            : <div> <div className="mediaBox">
                                {mediaObj.map((media) => (
                                    <div className="mediaTitle" >{media.title}<br></br>
                                        <img src={media.image} alt="mediaImage" data-id={media.id} height="200" onClick={handleChoseMedia}></img>
                                    </div>

                                ))}
                            </div></div>}

                        </div>
                    </div>











                    {!mediaChosen ? <div></div> :
                        <form action="/action_page.php">
                            <div class="row">
                                <div class="col-25">
                                    <label >Title</label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="fname" name="firstname" placeholder="Recommendation Title.." onChange={handleChangeTitle}
                                        value={title}></input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label >Streaming Platform</label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="lname" name="lastname" placeholder="What Streaming Service.." onChange={handleChangeStreaming_on}
                                        value={streaming_on}></input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label >Tags</label>
                                </div>
                                <div class="col-75">
                                    <MultipleSelectChip updateTags={setTags}>
                                    </MultipleSelectChip>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label >Recommendation</label>
                                </div>
                                <div class="col-75">
                                    <textarea id="subject" name="subject" placeholder="Write something.." onChange={handleChangeRecommendation}
                                        value={recommendation}></textarea>
                                </div>
                            </div>
                            <br></br>
                            <div class="row">
                                <div>{submitComplete ? <img src="/singleloopcheck.gif" className="checkGif" alt="gifImage" height="120"  ></img> : <input type="button" value="Submit" onClick={handleSubmit}></input>
                                }</div>

                            </div>
                        </form>
                    }</div>
            </div>
        </>

    )
}

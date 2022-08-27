import { useState } from "react";

import axios from "axios";
import MultipleSelectChip from "./ChipTagSelector";
import './RecForm.css';
import StreamingTagSelector from "./StreamingTagSelector";

export default function RecForm(props) {

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
    const [streaming_on, setStreaming_on] = useState("")
    const [tags, setTags] = useState([])
    const [recommendation, setRecommendation] = useState([])
    const [error, setError] = useState('')
    console.log(error)



    function logData() {
        /* console.log(mediaObj)
         console.log(IMDBid)
         console.log(mediaObj.genres)
         console.log(mediaObj.title)
         console.log(tags)
         console.log(streaming_on)
         console.log(recommendation)
         console.log(mediaObj.image)
         console.log(mediaObj.type)
         console.log(props.token)
         console.log(props.username)
         console.log(mediaObj.plot)*/

        console.log(mediaObj.genres)
        console.log(mediaObj.id)
        console.log(mediaObj.type)
        console.log(mediaObj.image)
        console.log(recommendation)
        console.log(streaming_on)
        console.log(tags)
        console.log(mediaObj.title)
        console.log(props.username)
        console.log(mediaObj.similars)
        console.log(mediaObj.keywordList)
        console.log(mediaObj.actorList)

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

        logData()
        axios
            .post(
                "https://onmywatch.herokuapp.com/api/recommendation/",
                {
                    description: mediaObj.plot,
                    saved_by: [],
                    watched_by: [],
                    genre: mediaObj.genreList,
                    imdbid: mediaObj.id,
                    medium: mediaObj.type,
                    poster: mediaObj.image,
                    reason: recommendation,
                    streaming_service: streaming_on,
                    tag: tags,
                    title: mediaObj.title,
                    user: props.username,
                    related_shows: mediaObj.similars,
                    keywords: mediaObj.keywordList,
                    actors: mediaObj.actorList,

                },
                {
                    headers: {
                        Authorization: `Token ${props.token}`,
                    },
                }
            )
            .then(setSubmitComplete(true))
            .catch((error) => {
                setError(error.message);
            });
    }
    const handleChoseMedia = (event) => {
        setmediaChosen(true)
        const tempID = String(event.target.getAttribute('data-id'))
        SpecificMovieSearch(tempID)
        setIMDBid(tempID);

        //   setGenre(mediaObj.genreList)
        //  setMediaImage(mediaObj.image)
        //   setTitle(mediaObj.title)

    }


    const handleChangeRecommendation = (event) => {
        console.log(event.target.value);
        setRecommendation(event.target.value);
    };

    const handleChangeSearchParams = (event) => {
        console.log(event.target.value);
        setSearchParams(event.target.value)
    };






    return (
        <>





            <div class="container">
                <div>{mediaChosen ?
                    <div></div>
                    :
                    <div>                <div className="input-field">

                        <label style={{ fontSize: 20 }}>First Tell Us What You Watched and then Choose the Appropriate Poster:</label>
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


                <div className="formBox">
                    <div>
                        <div>{mediaChosen
                            ? <div>

                                <div className="media" >{mediaObj.title}<br></br>
                                    <img src={mediaObj.image} className='formImage' alt="mediaImage" data-id={mediaObj.id} width="" height="500"></img>
                                </div>

                            </div >
                            : <div> <div className="mediaBox3">
                                {mediaObj.map((media) => (
                                    <div className="mediaTitle"  >{media.title}<br></br>
                                        <img src={media.image} className='formImage' alt="mediaImage" data-id={media.id} height="200" onClick={handleChoseMedia}></img>
                                    </div>

                                ))}
                            </div></div>}

                        </div>
                    </div>


                    {!mediaChosen ? <div></div> :
                        <form action="/action_page.php">
                            <div class="row">

                            </div>
                            <div class="row">
                                <div>
                                    <label >Streaming Platform</label>
                                </div>
                                <div class="col-75">
                                    <StreamingTagSelector updateStreaming={setStreaming_on}></StreamingTagSelector>

                                </div>
                            </div>
                            <div class="row">
                                <div >
                                    <label >Tags</label>
                                </div>
                                <div class="col-75">
                                    <MultipleSelectChip updateTags={setTags}>
                                    </MultipleSelectChip>
                                </div>
                            </div>
                            <div class="row">
                                <div >
                                    <label >Your Recommendation</label>
                                </div>
                                <div class="col-75">
                                    <textarea
                                        id="subject"
                                        name="subject"
                                        placeholder="Write something.."
                                        onChange={handleChangeRecommendation}
                                        value={recommendation}
                                        cols={100}
                                        rows={14}>

                                    </textarea>

                                </div>
                            </div>
                            <br></br>
                            <div class="row submissionArea">
                                <div >{submitComplete ? <div><div class="submissionMessage">Submission Complete!</div><img src="/singleloopcheck.gif" className="checkGif" alt="gifImage" height="120"  ></img></div> : <input type="button" value="Submit" onClick={handleSubmit}></input>
                                }</div>

                            </div>
                        </form>
                    }</div>
            </div>
        </>

    )
}

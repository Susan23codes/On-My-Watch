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
    const [submitClicked, setSubmitClicked] = useState(false)
    const [emotion, setEmotion] = useState({
        "emotions_detected": [
            "anger"
        ],
        "emotion_scores": {
            "anger": 0.09726930964706901,
            "disgust": 0.045160579551742214,
            "sadness": 0.015571307354332055,
            "fear": 0.013315186787932039,
            "surprise": 0.0002625598717371884,
            "joy": 0
        },
        "thresholds": {
            "disgust": 0.04,
            "sadness": 0.04,
            "anger": 0.04,
            "joy": 0.04,
            "surprise": 0.04,
            "fear": 0.04
        },
        "version": "7.0.8",
        "author": "twinword inc.",
        "email": "help@twinword.com",
        "result_code": "200",
        "result_msg": "Success"
    })
    console.log(error)


    function logData() {

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
        console.log(JSON.stringify(emotion))

    }
    const options = {
        method: 'GET',
        url: 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/',
        params: {
            text: recommendation
        },
        headers: {
            'X-RapidAPI-Key': '9158ae4b07msh28a956118045d24p16ea00jsn7c0c5666fd33',
            'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
        }
    };






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
            }).catch((error) => {
                setError(error.message);

            });;

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
            }).catch((error) => {
                setError(error.message);
            });;

    }






    async function handleSubmit() {
        setSubmitClicked(true)
        let a = await axios.request(options);

        console.log(a);
        /** .then(function (response) {
            setEmotion(response.data);
        }).catch(function (error) {
            console.error(error);
        });

        //logData()
        console.log(a)*/
        await axios
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
                    emotion: a.data,

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
                                <div>
                                    <label >Watched On</label>
                                </div>
                            </div>
                            <div class="row">

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

                                <div >{submitComplete ?
                                    <div><div class="submissionMessage">Submission Complete!</div>
                                        <img src="/singleloopcheck.gif" className="checkGif" alt="gifImage" height="120"  ></img>
                                    </div>
                                    : <div> {!submitClicked ?
                                        <input type="button" value="Submit" onClick={handleSubmit}></input> :
                                        <div><img src="/loadingAnimation.gif" className="loading" alt="loading" height="120"  ></img></div>
                                    }</div>}</div>

                            </div>
                        </form>
                    }</div>
            </div>
        </>

    )
}

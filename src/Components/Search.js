import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material"
import axios from "axios";
import SingleCard from "./SingleCard";
import ComponentSearch from "./ComponentSearch";


export default function Search(props) {
    const [data, setData] = useState('')
    const [keyword, setKeyword] = useState('')
    const [medium, setMedium] = useState('Movie')
    const [searchParams, setSearchParams] = useState('')
    const [choice, setChoice] = useState('')
    const choices = [{ "value": "tags", "label": "Tags" }, { "value": "genre", "label": "Genre" }]
    const [tag, setTag] = useState('')
    const [genre, setGenre] = useState('')
    const tags = [
        {
            "id": 1,
            "label": "British"
        },
        {
            "id": 3,
            "label": "Scary"
        },
        {
            "id": 4,
            "label": "Funny"
        },
        {
            "id": 5,
            "label": "Kid-friendly"
        },
        {
            "id": 6,
            "label": "Foreign/Subtitled"
        },
        {
            "id": 7,
            "label": "Multi-season"
        },
        {
            "id": 8,
            "label": "Heartwarming"
        },
        {
            "id": 9,
            "label": "Sad"
        },
        {
            "id": 10,
            "label": "Thought Provoking"
        },
        {
            "id": 11,
            "label": "Smart"
        },
        {
            "id": 12,
            "label": "Witty"
        },
        {
            "id": 13,
            "label": "Grim"
        },
        {
            "id": 14,
            "label": "Charming"
        },
        {
            "id": 15,
            "label": "Quirky"
        },
        {
            "id": 16,
            "label": "Silly"
        },
        {
            "id": 18,
            "label": "Bucolic"
        },
        {
            "id": 19,
            "label": "Crude"
        }
    ]
    const genres = [{ "value": "action", "label": "Action" }]
    const mediums = [{ "value": "Movie", "label": "Movie" }, { "value": "TVSeries", "label": "TV" }, { "value": "Both", "label": "Both" }]


    const handleChangeSearchParams = (event) => {
        setKeyword(event.target.value)
    };

    const handleChoice = (event) => {
        setChoice(event.target.value)
    }

    const handleChangeMedium = (event) => {
        setMedium(event.target.value)
    };

    const handleTag = (value) => {
        setTag(value)
    };

    const handleGenre = (value) => {
        setGenre(value)
    };

    const handleSearch = async (event) => {
        var string = ""
        if (tag !== undefined && tag !== "") {
            string = "&tag=" + tag.id
        }
        else if (genre !== undefined && genre !== "") {
            string = "&genre=" + genre.value
        }
        let a = await axios
            .get(
                `https://onmywatch.herokuapp.com/api/search/recommendations/?medium=${medium}` + string + `&search=${keyword}`,
                {},
                {
                    Authorization: `Token ${props.token}`,
                }
            );
        setData(a.data)
    }




    return (<div className="searchBox"><div className="Search"><div> </div><br></br>Filter For Your Recommendation:<div></div><br></br>
        <TextField select sx={{ 'width': '20%' }} label='search' defaultValue={"Movie"} value={medium} onChange={handleChangeMedium}>
            {mediums.map((option) => (<MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>))}
        </TextField><TextField sx={{ 'width': '80%' }} label='Keyword' value={keyword} onChange={handleChangeSearchParams} />
        <div className="emptySpace"></div>
        <label for="medium">Additional Options:</label>
        <div className='searchBox'>
            <TextField select sx={{ 'width': '25%' }} label='Search' defaultValue={"Tags"} value={choice} onChange={handleChoice}>
                {choices.map((option) => (<MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>))}
            </TextField>
            {choice === "tags" ? <ComponentSearch array={tags} onChange={handleTag}></ComponentSearch> : <ComponentSearch array={genres} onChange={handleGenre}></ComponentSearch>}
        </div>
        <input type="button" value="Search" onClick={handleSearch}></input>


        <div>
            {data !== '' && <h1>{data.map((data, index) =>
                <SingleCard cardObject={data}
                    key={index}
                    id={data.id}
                    isLoggedIn={props.isLoggedIn}
                    token={props.token}
                    username={data.user_info.username}
                    navigate={props.navigate}
                />
            )} </h1>}


        </div>
    </div>
    </div >
    )
    //call api to get list with props.searchType and props.params

    //map function in way we like
}
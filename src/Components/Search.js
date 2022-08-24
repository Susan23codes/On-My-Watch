import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";


export default function Search(props) {
    const [data, setData] = useState('')
    const [medium, setMedium] = useState('TV')
    const [searchParams, setSearchParams] = useState('')
    const handleChangeSearchParams = (event) => {
        console.log(event.target.value);
        setSearchParams(event.target.value)
    };

    const handleChangeMedium = (event) => {
        console.log(event.target.value);
        setMedium(event.target.value)
    };

    const handleSearch = (event) => {
        if (medium === "Movie") {
            console.log("getting movie")
            axios
                .get(
                    `https://onmywatch.herokuapp.com/api/search/movie/recommendations/?search=${searchParams}`,
                    {},
                    {
                        Authorization: `Token ${props.token}`,
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                });
        } else if (medium === "TVSeries") {
            console.log("getting TV")
            axios
                .get(
                    `https://onmywatch.herokuapp.com/api/search/tvs/recommendations/?search=${searchParams}`,
                    {},
                    {
                        Authorization: `Token ${props.token}`,
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                });

        }
        else {
            console.log("getting both")
            axios
                .get(
                    `https://onmywatch.herokuapp.com/api/search/recommendations/?search=${searchParams}`,
                    {},
                    {
                        Authorization: `Token ${props.token}`,
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                });
        }
    }




    return (<div><div> </div><br></br>Search For Your Recommendation<div></div><br></br>
        <input
            className="input"
            type="text"
            onChange={handleChangeSearchParams}
            value={searchParams}
        /><div className="emptySpace"></div>
        <label for="medium">Choose a search:</label>

        <select name="medium" id="medium" onChange={handleChangeMedium}>
            <option value="TV">TV</option>
            <option value="Movie">Movie</option>
            <option value="Both">Both</option>
        </select>
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
    )
    //call api to get list with props.searchType and props.params

    //map function in way we like
}
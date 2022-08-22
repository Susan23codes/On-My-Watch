import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "./SingleCard"
import { useParams } from "react-router-dom";

export default function UserRecs(props) {
    const [data, setData] = useState('')
    const { userId } = useParams();

    useEffect(() => {
        axios
            .get(
                `https://onmywatch.herokuapp.com/api/user/${userId}/recommendations/`,
                {},
                {
                    Authorization: `Token ${props.token}`,
                }
            )
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            });
    }, [props.token, userId]);




    return (
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
    )
}



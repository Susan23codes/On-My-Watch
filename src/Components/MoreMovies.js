import { Movie } from "@mui/icons-material";
import { useState } from "react";

export default function RecForm(props) {


    return (
        <> {props.object.related_shows !== null && <div><div className="movieBox">
            {props.object.related_shows.map(movie => {
                return (

                    <div className="movieIcon">
                        {movie.title}<br></br>
                        <img src={movie.image} alt='poster' width='300px'></img>
                    </div>
                )
            })}
        </div></div>}

        </>
    )

}

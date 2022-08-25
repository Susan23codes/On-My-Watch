import { Movie } from "@mui/icons-material";
import { useState } from "react";

export default function RecForm(props) {


    return (
        <><div className="outBox"> {props.object.related_shows !== null && <div><div className='movieBox2 center'>
            {props.object.related_shows.map(movie => {
                return (

                    <div className="movieIcon">
                       <div style={{fontSize:'25px'}}><strong>{movie.title} </strong> </div><br></br>
                        <img src={movie.image} style={{border:'3px solid', maxHeight: '420px'}} alt='poster'  width='300px'></img>
                    </div>
                )
            })}
        </div></div>}
        </div>
        </>
    )

}

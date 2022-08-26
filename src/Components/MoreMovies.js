import { Movie } from "@mui/icons-material";
import { useState } from "react";

export default function RecForm(props) {


    return (
        <><div className="outBox"> {props.object.related_shows !== null && <div><div className='movieBox2 center'>
            {props.object.related_shows.map(movie => {
                return (

                    <div className="movieIcon">
                       <div style={{fontSize:'20px', width: '200px', height:'50px'}}><strong>{movie.title} </strong> </div><br></br>
                        <img src={movie.image} style={{border:'1px solid', maxHeight: '300px'}} alt='poster'  ></img>
                    </div>
                )
            })}
        </div></div>}
        </div>
        </>
    )

}

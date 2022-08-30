import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Comment } from '@mui/icons-material';
import moment from 'moment'



export default function Comments(props) {
    const { token } = props
    const {state} = useLocation()
    // const {title} = state
    
    console.log(`state: ${state}`)

    // console.log(location.state.title)

    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState(null)
    const [error, setError] = useState('')


    const params = useParams()
    // console.log(params)

    useEffect(() => {
        axios.get(`https://onmywatch.herokuapp.com/api/recommendation/${params.recommendationId}/comment/`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setCommentList(res.data)
            })
    }, [comment])




    return (
    <>
        {commentList && commentList.map((comment, index) => (
                        <>
                            <div className='individual-comment'>
                                <p style={{marginLeft: 10}} key={index}>{comment.comment}</p>
                                <p className='comment-who-wrote' style={{fontStyle:'italic', marginLeft: 10}}> 
                                    By: {comment.user} on {moment(comment.created_at).format('MM/DD/YY h:mm a')}</p>
                            </div>
                        </>
                    ))}
        </>

    )
}
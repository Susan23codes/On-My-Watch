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

    function handleAddComment(e) {
        e.preventDefault()
        setError(null)
        console.log(comment)
    
        axios.post(`https://onmywatch.herokuapp.com/api/recommendation/${params.recommendationId}/comment/`,
        { comment: comment,
          recommendation: params.recommendationId 
        },
            {
                headers: { Authorization: `Token ${token}` },
            })
            .then(res => {
                setComment('')
                console.log(comment)
            })
            .catch((error) => {
                setError(error.message)
            })
    }


    return (
    <>
        <h1 style={{marginLeft:7}}>See what people are saying about {state.title} !</h1>
        {commentList && commentList.map((comment, index) => (
                        <>
                            <div className='individual-comment'>
                                <p style={{marginLeft: 10}} key={index}>{comment.comment}</p>
                                <p className='comment-who-wrote' style={{fontStyle:'italic', marginLeft: 10}}> 
                                    By: {comment.user} on {moment(comment.created_at).format('MM/DD/YY h:mm a')}</p>
                            </div>
                        </>
                    ))}
            <h2 className='comment-form'>Want to join in the conversation?  Add a comment below!</h2>
            <div className="comment-form">
                <form>
                    <textarea
                        value={comment}
                        className="write-comment"
                        placeholder='Write a comment'
                        rows={10}
                        cols={50}
                        onChange={(e) => setComment(e.target.value)}
                    >

                    </textarea>
                </form>

                <button type="button" onClick={handleAddComment} className="comment-button">Submit Comment</button>
            </div>
        </>

    )
}
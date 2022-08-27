import axios from "axios"
import { useState, useRef } from 'react'



export default function Registration(props) {

    const { navigate, setAuth } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [confirmPass, setConfirmPass] = useState('')

    const imageFileInput = useRef(null)


    function handleRegistrationSubmit(event) {
        event.preventDefault()
        setError(null)
        if (password !== confirmPass) {
            alert("Passwords don't match!")
        }
        const imageFile = imageFileInput.current.files[0]
        console.log(imageFile)

        axios.post('https://onmywatch.herokuapp.com/auth/users/', {
            username: username,
            password: password,
            email: email,
        }).then((res) => {
            event.preventDefault()
            setError(null)


            axios.post('https://onmywatch.herokuapp.com/auth/token/login/', {
                username: username,
                password: password,
            },
            )
                .then((res) => {
                    const token = res.data.auth_token
                    setAuth(username, token)
                    // navigate('/')
                
                // .catch((error) => {
                //     setError(error.message)
                    
                    axios.patch('https://onmywatch.herokuapp.com/api/upload/', imageFile, {
                        headers: {
                            Authorization: `Token ${token}`,
                            'Content-Type': imageFile.type,
                            'Content-Disposition': `attachment; filename=${imageFile.name}`
                        }},
                        )
                        .then((res) => {
                            console.log("got this far")
                            navigate('/')
                        },)
                        .catch((error) => {
                            setError(error.message)
                        })
                    // })
                })
            })
        }
   

            // .catch((error) => {
            //     setError(Object.values(error.response.data))
            //     console.log(error)
            // })



    return (
        <>
            {error && <div>{error}</div>}
            <h2 style={{ textAlign: 'center' }}>Sign up and starting watching great TV!</h2>
            <div className="registration-text">        </div>
            <form id="registration-form" onSubmit={handleRegistrationSubmit}>

                <div className="form-controls">
                    <label className="label" htmlFor="username-field">Username </label>
                    <input id="username-field" type="text" placeholder="Create a username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-controls">
                    <label className="label" htmlFor="password-field">Password </label>
                    <input id="password" type="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-controls">
                    <label className="label" htmlFor="confirm-password-field">Confirm Password </label>
                    <input id="confirm-password" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPass(e.target.value)} required />
                </div>
                <div className="form-controls">
                    <label  htmlFor="image-upload-field">Upload a Profile Pic</label>
                    <input id="image" type="file" placeholder="Upload an Image" ref={imageFileInput} />
                </div>
                <div className="form-submit">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </>
    )
}
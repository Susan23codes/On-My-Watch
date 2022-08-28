// import React, { useState } from 'react';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom'




// export default function Login({ setAuth, isLoggedIn }) {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState(null)
//     const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         setError(null)

//         axios.post('https://onmywatch.herokuapp.com/auth/token/login/', {
//             username: username,
//             password: password,
//         },
//         )
//             .then((res) => {
//                 const token = res.data.auth_token
//                 setAuth(username, token)

//             })
//             .catch((error) => {
//                 setError(error.message)
//             })
//     }

//     if (isLoggedIn) {
//         return <Navigate to="/" />
//     }

//     return (
//         <>
//             <div className="entire-login-form">
//                 <h2 className='login-form'>Please Log In!</h2>
//                 {error && <div className='error'>{error}</div>}
//                 <form id="login-form" onSubmit={handleSubmit}>
//                     <div className="form-controls">
//                         <label className="label" htmlFor="username-field">Username</label>
//                         <input id="username-field" type="text" onChange={(e) => setUsername(e.target.value)} />
//                     </div>
//                     <div className="form-controls">
//                         <label className="label" htmlFor="password-field">Password  </label>
//                         <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                     <div className="form-submit">
//                         <input type="submit" value="Log In" />
//                     </div>
//                 </form>
//             </div>

//         </>
//     )
// }
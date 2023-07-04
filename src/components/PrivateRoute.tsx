// import React from 'react'
// import { Navigate } from 'react-router-dom';
// import {useContext} from 'react'
// import { AppContext} from './context/context'

// interface ProviderProps{
//     children: React.ReactNode
//   }

// export default function PrivateRoute({children}:ProviderProps) {
//     // const token:(string |null)= localStorage.getItem('token');
//     const {token,setToken}= useContext(AppContext)
//     if(!token)
//     {
//         alert("You are not logged in")
//         return <Navigate to="/login"/>
//     }
//     return children
// }

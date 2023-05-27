import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import gotham from '../font/GothamBold.ttf';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import '../styles/adminview.css'

export default function AdminView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        if (user === '' || !isAdmin){
          navigate('/login')
        } else {
            fetchUsers();
        }
      }, [user ,navigate]);

      async function fetchUsers() {
        try{
            const url = `https://bmusicboxd.onrender.com/userbox/`;
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json()
            setUsersData(data)
        } catch {
           // navigate('/login')
        }
        }

        async function deluser(id) {
            try{
                const url = `https://bmusicboxd.onrender.com/userbox/${id}`;
                const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                if(response.ok){
                    
                    fetchUsers();
                }
            } catch {
               // navigate('/login')
            }
            }


        return(
            <div className="artistView">
                <h1 className='txtgestion'>Gestion des utilisateurs</h1>
                <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}></Sidebar>
                {usersData ? (
                    
                    <Stack spacing={0} direction="column" sx={{width:'85%',marginTop:'3vh'}}>
                        {usersData.map((user) => (
                        <div className="user" >
                            <Avatar
                            alt={user.identifiant}
                            src={user.photo}
                            sx={{marginLeft: '2vw', marginTop:'2vh'}}
                            />
                            <p className='iduser'>@{user.identifiant}</p>
                            <p className='pseudouser'>{user.pseudo}</p>
                            <IconButton aria-label="delete" size="large" sx={{position:'fixed',marginTop:'1vh',marginLeft:'50vw', zIndex:'4'}} onClick={() => deluser(user.identifiant)}>
                            <DeleteIcon sx={{color:'#1ED75A'}} fontSize='2.5rem'/>
                            </IconButton>

                        </div>
                        ))}

                    </Stack>
                ):(
                    <CircularProgress/>
                )}


            </div>
        )
}
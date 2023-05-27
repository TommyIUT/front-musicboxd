import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {Link, useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import gotham from '../font/GothamBold.ttf';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AlbumIcon from '@mui/icons-material/Album';

import '../styles/artistsview.css'

export default function ListenListView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}){
    const [userData, setUserData] = useState(null);
    const [albums, setAlbums] = useState(null)
    const [nb, setNb] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        if (user === ''){
          navigate('/login')
        } else {
          fetchUser(user);
          fetchListenList(user);
        }
      }, [user, navigate]);

    async function fetchUser(id) {
    try{
        const url = `http://localhost:5000/userbox/id/${id}`;
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json()
        const res = [data[0].pseudo, data[0].bio, data[0].pronoms, data[0].localisation, data[0].photo]
        setUserData(res)
    } catch {
        navigate('/login')
    }
    }

    async function fetchListenList(id) {
        try{
            const url = `http://localhost:5000/listenlist/${id}`;
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json()
            setNb(data.length)
            setAlbums(data)
        } catch {
            navigate('/login')
        }
        }
    

    return(
        <div className='artistsview'>
        <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}></Sidebar>
        {userData ? (
            <div className='useravatar'>
                <Stack spacing={0} direction="column" sx={{marginLeft:'-50px'}}>
                <Stack spacing={0} direction="row">
                <Link to='/user'>
                    <Avatar
                    alt={user}
                    src={userData[4]}
                    sx={{ width: 200, height: 200, marginTop: '30px', marginLeft: '200px'}}
                    /></Link>
                <h1 className='pseudo'>{userData[0]}</h1>
                </Stack>
                <Button variant="contained" startIcon={<AccountCircleSharpIcon sx={{fontSize:'25px'}}/>} sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: '#1ED75A',
                }, width: '40vw', marginLeft:'390px', marginTop:'10px',color: 'white', backgroundColor: '#1ED75A', fontFamily: gotham, fontSize:'25px', zIndex: '4'}}>
                ListenList ( {nb} )
                </Button>
                </Stack>
            </div>
        ):(
            <CircularProgress/>
        )}
        {albums ? (
            <div className='userartists'>
                {albums.map((album) => (
                <div className="album" >
                    <Link to={`/album/${album.id_album}`}>
                    <img src={album.photo} alt={album.nom_album} />
                    </Link>
                </div>
                ))}
            </div>
        ):(
            <CircularProgress/>
        )}    
        </div>
    )




}
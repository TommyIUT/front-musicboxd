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

export default function ArtistsView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}){
    const [userData, setUserData] = useState(null);
    const [artists, setArtists] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (user === ''){
          navigate('/login')
        } else {
          fetchUser(user);
          fetchArtists(user);
        }
      }, [user, navigate]);

    async function fetchUser(id) {
    try{
        const url = `https://bmusicboxd.onrender.com/userbox/id/${id}`;
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

    async function fetchArtists(id) {
        try{
            const url = `https://bmusicboxd.onrender.com/abonne/${id}`;
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json()
            setArtists(data)
        } catch {
            navigate('/login')
        }
        }
    

    return(
        <div className='activiteview'>
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
                <Stack spacing={0} direction="row">
                    <Link to="/albums">
                    <Button href="/login" variant="contained" startIcon={<AlbumIcon />} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, marginTop:'20px',marginLeft:'200px', width: '500px',color: 'black', backgroundColor: '#1ED75A', fontFamily: gotham}}>
                    Albums
                    </Button></Link>
                    <Link to="/artists">
                    <Button href="/login" variant="contained" startIcon={<AccountCircleSharpIcon />} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, marginTop:'20px', width: '500px',color: 'black', backgroundColor: '#1ED75A', fontFamily: gotham}}>
                    Artistes
                    </Button></Link>
                    </Stack>
                </Stack>
            </div>
        ):(
            <CircularProgress />
        )}
        {artists ? (
            <div className='userartists'>
                {artists.map((artist) => (
                <div className="artist" >
                    <Link to={`/artist/${artist.id_artist}`}>
                    <img src={artist.photo_artiste} alt={artist.nom_artiste} />
                    </Link>
                    <h2>{artist.nom_artiste}</h2>
                </div>
                ))}
            </div>
        ):(
            <CircularProgress />
        )}    
        </div>
    )




}
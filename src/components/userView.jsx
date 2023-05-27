import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import gotham from '../font/GothamBold.ttf'
import Button from '@mui/material/Button';
import AlbumIcon from '@mui/icons-material/Album';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

import '../styles/userview.css'


export default function UserView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === ''){
      navigate('/login')
    } else {
      fetchUser(user);
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
  
  return (
    <div className="userView">
      <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
      {userData ? (
        <Stack spacing={3} direction="column" sx={{marginLeft:'-30px'}}>
        <Stack spacing={1} direction="row">
        <Stack spacing={3} direction="column">
        <Link to={userData[4]} target="_blank">
        <Avatar
          alt={user}
          src={userData[4]}
          sx={{ width: 300, height: 300, marginTop: '30px', marginLeft: '200px'}}
        /></Link>
        <Link to="/edit">
        <Button href="/login" variant="contained" sx={{ '&:hover': {
            color: 'white',
            backgroundColor: '#1a1a1a',
          }, marginLeft:'200px', width: '300px',color: 'black', backgroundColor: '#1ED75A', fontFamily: gotham}}>
          éditer
        </Button></Link>
        </Stack>
        <Stack spacing={0} direction="column">
        <h1 className='pseudo'>{userData[0]}</h1>
        <p className='idUser'>@{user}</p>
        <p className='pronomUser'>{userData[2]}<span className='espace'></span><Link className='liennormal' to= {`https://www.google.com/maps/place/${userData[3]}`} target="_blank">{userData[3]}</Link></p>
        <p className='bioUser'>{userData[1]}</p>
        </Stack>
        </Stack>
        <p className='bibliothequeUser'>Bibliothèque</p>
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
        <p ><Link className='voiractivite' to='/activite'>Voir l'activité...</Link></p>
        </Stack>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
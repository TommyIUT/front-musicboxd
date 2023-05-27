import React, { useEffect, useState } from 'react';
import tpab from '../assets/topimpabutterfly.png'
import logogris from '../assets/logo_txt_gris.png'
import Sidebar from './sidebar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import gotham from '../font/GothamBold.ttf';
import {Link} from 'react-router-dom';


import '../styles/homeView.css';

export default function HomeView({isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {
  return (
    <div className="homeView">
      <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}></Sidebar>
      <Stack spacing={0} direction="column">

        <div className='home'>
        <Stack spacing={0} direction="column">
         <img src={tpab} className='tpab'></img>
         <img src={logogris} className='logoaccueil'></img>
         <h1 className='txtaccueil'>Notez les albums que vous avez écoutés
          <br></br> Gardez pour plus tard ceux qui vous intéressent
         </h1>
         {isConnected ? null :
         <Link to="/register">
         <Button href="/register" variant="contained" sx={{
          '&:hover': {
            color: 'white',
            backgroundColor: '#1a1a1a',
          }, width:'100%',color: '#FFFFFF', backgroundColor: '#1ED75A', fontFamily: gotham, marginLeft:'85px'}}>
          Commencer
        </Button></Link>}
         </Stack>
        </div>

        <div className='footer'>
          <p>Musicboxd. Application créée par un <a target='_blank' href='https://www.linkedin.com/in/tom-philippe-214a9a224/' className='lien'>étudiant français</a>. Données : <a target='_blank' href='https://deezer.com' className='lien'>Deezer </a></p>
        </div>

      </Stack>
    </div>
  );
}

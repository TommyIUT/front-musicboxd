import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {Link, useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import gotham from '../font/GothamBold.ttf';
import { ReactComponent as DeezerIcon } from '../assets/deezer.svg'
import AlbumIcon from '@mui/icons-material/Album';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import '../styles/artistview.css'

export default function ArtistView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {

    const [artistData, setArtistData] = useState(null);
    const [artistAlbums, setArtistAlbums] = useState(null);
    const [isSubbed, setIsSubbed] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (user === ''){
          navigate('/login')
        } else {
            fetchArtist(id);
            fetchArtistAlbums(id);
            checkIfSubbed();
        }
      }, [user ,navigate]);

    useEffect(() => {
    if (artistData !== null){
        checkIfSubbed()
    }
    }, [artistData]);
    
    async function fetchArtist(id) {
    try{
        const url = `https://api.deezer.com/artist/${id}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const res  = JSON.parse(data.contents.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''));
        setArtistData(res)
    } catch {
        navigate('/login')
    }
    }

    const handleGoBack = () => {
        navigate(-1);
      };


    async function fetchArtistAlbums(id) {
        try{
            const url = `https://api.deezer.com/artist/${id}/albums`;
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const res  = JSON.parse(data.contents.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''));
            setArtistAlbums(res.data)
        } catch {
           // navigate('/login')
        }
        }

    async function checkIfSubbed() {
        try {
            const response = await fetch(`https://bmusicboxd.onrender.com/abonne/${user}/${artistData.id}`, {
                method: "GET",
                headers: {"Content-Type" : "application/json"},
            });
            const data = await response.json();
        
            if (data.length > 0) {
                setIsSubbed(true);
            } else {
                setIsSubbed(false);
            }
        } catch (error) {
            console.error(error);
            // navigate('/login');
        }
        }

    async function SubTo() {
        try {
            const id_user = user;
            const id_artist = artistData.id
            const nom_artiste = artistData.name
            const photo_artiste = artistData.picture_medium
            const body = { id_user, id_artist, nom_artiste, photo_artiste }
            const response = await fetch(`https://bmusicboxd.onrender.com/abonne/`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response)
        
            if (response.ok) {
                setIsSubbed(true);
                // activité
                const id_user = user;
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                const activite_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const contenu = 'Vous vous êtes abonné à ' + artistData.name
                const body = {id_user, activite_date, contenu}
                const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                })
              } else {
                console.log("Erreur lors de l'abonnement.");
              }
        } catch (error) {
            console.error(error);
            // navigate('/login');
        }
        }

        async function DeSubTo() {
            try {
                const response = await fetch(`https://bmusicboxd.onrender.com/abonne/${user}/${artistData.id}`, {
                    method: "DELETE",
                    headers: {"Content-Type" : "application/json"}
                });
            
                if (response.ok) {
                    setIsSubbed(false);
                    // activité
                    const id_user = user;
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    const activite_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const contenu = 'Vous vous êtes désabonné de ' + artistData.name
                    const body = {id_user, activite_date, contenu}
                    const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                  } else {
                    console.log("Erreur lors de l'abonnement.");
                  }
            } catch (error) {
                console.error(error);
                // navigate('/login');
            }
            }

            const handleGoEnAvant = () => {
                navigate(+1);
              };


    return(
        <div className="artistView">
            <div className='bandegrise'></div>
            <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}></Sidebar>
            <IconButton aria-label="delete" size="small" sx={{position:'fixed', margin:'15px'}} onClick={handleGoBack}>
            <ArrowBackIosIcon sx={{color:'white'}} fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small" sx={{position:'fixed',marginLeft:'40px', marginTop:'15px', zIndex:'4'}} onClick={handleGoEnAvant}>
            <ArrowForwardIosIcon sx={{color:'white'}} fontSize="15px" />
            </IconButton>
            {artistData ? (
            <div className='artistdata'>
            <ToastContainer />
            <Stack spacing={2} direction="row" sx={{marginTop:'15px', marginLeft:'40px'}}>
            <Stack spacing={2} direction="column" >
                <Link to={artistData.picture_medium} target='_blank'>
                <Avatar
                alt={artistData.title}
                src={artistData.picture_medium}
                sx={{ width: 300, height: 300}}
                /></Link>
                {isSubbed ? (
                    <Button variant="contained" onClick={DeSubTo} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '100%',color: 'white', backgroundColor: '#1ED75A', fontFamily: gotham}} className='test'>
                    Se désabonner
                    </Button>
                ) : (
                    <Button variant="contained" onClick={SubTo} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '100%',color: 'white', backgroundColor: '#1ED75A', fontFamily: gotham}} className='test'>
                    S'abonner
                    </Button>
                )}
                
            </Stack>
            <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                <div className='artistdatacontainer'></div>
                <p className='artistd'>ARTISTE</p>
                <h1 className='nomartiste'>{artistData.name}</h1>
                <p className='linktodeezerartist'> <a href={artistData.link} target='_blank' className='linktodeezerartist'>Écouter Écouter sur Deezer <DeezerIcon className='icon'/></a></p>
            </Stack>
            </Stack>
            </div>):(
                <CircularProgress />
            )}

            {artistAlbums && artistData ? (
            <div className='artistalbums'>
                <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                <Button variant="contained" startIcon={<AlbumIcon />} sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: '#1ED75A',
                }, width: '40vw', marginLeft:'23vw', marginTop:'10px',color: 'white', backgroundColor: '#1ED75A', fontFamily: gotham, fontSize:'25px', zIndex: '4'}}>
                Albums ( {artistData.nb_album} )
                </Button>
                <div className='resalbums'> 
                {artistAlbums.map((album) => (
                    <div className="album">
                        <Link to={`/album/${album.id}`}>
                        <img src={album.cover_medium} alt={album.title} />
                        </Link>
                    </div>
                    ))}
                </div>
                </Stack>
            </div>
            ):(
                <CircularProgress sx={{marginTop:'55vh'}}/>
            )}

           
        </div>
    )

}
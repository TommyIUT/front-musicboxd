import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './sidebar';
import {Link, useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import { ReactComponent as DeezerIcon } from '../assets/deezer.svg'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TextField from '@mui/material/TextField';
import gotham from '../font/GothamBold.ttf';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';

import '../styles/albumview.css'

export default function AlbumView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {

    const [albumData, setAlbumData] = useState(null);
    const [listenList, setListenList] = useState(null);
    const [isReviewing, setIsReviwing] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const [reviewdata,setReviewData] = useState(null);
    const [review_note, setReview_note] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const CssTextField = styled(TextField)({
      '& label.Mui-focused': {
        color: '#1ED75A',
      },
      '& label': {
          color: '#1ED75A',
        },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#1ED75A',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#1ED75A',
        },
        '&:hover fieldset': {
          borderColor: '#1ED75A',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1ED75A',
        },
      },
    });

    const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
        color: '#1ED75A',
        fontSize: '3rem',
      },
      '& .MuiRating-iconHover': {
        color: '#1ED75A',
        fontSize: '3rem',
      },
      '& .MuiRating-icon': {
        color: '#1ED75A',
        fontSize: '3rem',
      },
    });

    useEffect(() => {
        if (user === ''){
          navigate('/login')
        } else {
          fetchAlbum(id);
          fetchListenList(id);
          fetchReview(id);
        }
      }, [user, navigate]);
    
    async function fetchAlbum(id) {
    try{
        const url = `https://api.deezer.com/album/${id}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const res  = JSON.parse(data.contents.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''));
        // console.log(res.artist.id)
        setAlbumData(res)
    } catch {
        navigate('/login')
    }
    }

    async function fetchListenList(id) {
      try{
          const response = await fetch(`https://bmusicboxd.onrender.com/listenlist/${user}/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });
        const data = await response.json();
        
        if (data.length > 0) {
          setListenList(true);
        } else {
          setListenList(false);
        }
      } catch {
          navigate('/login')
      }
      }

      async function fetchReview(id) {
        try{
            const response = await fetch(`https://bmusicboxd.onrender.com/review/${user}/${id}`, {
              method: "GET",
              headers: {"Content-Type" : "application/json"},
          });
          const data = await response.json();
          
          if (data.length > 0) {
            setHasReview(true);
            setReviewData(data[0]);
            setReview_note(data[0].note)
          } else {
            setHasReview(false);
          }
        } catch(error) {
            console.log(error)
        }
        }

      function add_review(){
        setIsReviwing(true);
      }

      function annuler_review(){
        setIsReviwing(false);
        setReview_note(0)
      }

      async function addToListenList() {
        try {
            const id_user = user;
            const id_album = albumData.id
            const nom_album = albumData.title
            const photo = albumData.cover_medium
            const body = { id_user, id_album, nom_album, photo }
            const response = await fetch(`https://bmusicboxd.onrender.com/listenlist/`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response)
        
            if (response.ok) {
                setListenList(true);
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
                const contenu = 'Vous avez ajouté ' + albumData.title + ' à votre listenlist'
                const body = {id_user, activite_date, contenu}
                const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                })
              } else {
                console.log("Erreur lors de l'ajout.");
              }
        } catch (error) {
            console.error(error);
            // navigate('/login');
        }
        }

       
    
      async function deleteListenlist() {
        try {
            const response = await fetch(`https://bmusicboxd.onrender.com/listenlist/${user}/${albumData.id}`, {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"}
            });
        
            if (response.ok) {
              setListenList(false);
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
                const contenu = 'Vous avez retiré ' + albumData.title + ' de votre listenlist'
                const body = {id_user, activite_date, contenu}
                const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                })
              } else {
                console.log("Erreur lors de l'ajout.");
              }
        } catch (error) {
            console.error(error);
            // navigate('/login');
        }
        }

        async function review() {
          try {
              const id_user = user;
              const id_album = albumData.id
              const nom_album = albumData.title
              const photo = albumData.cover_medium
              const note = review_note
              const texte = document.getElementById("review_txt").value;
              console.log(texte)
              const body = { id_user, id_album, nom_album, photo,note,texte }
              const response = await fetch(`https://bmusicboxd.onrender.com/review/`, {
                  method: "POST",
                  headers: {"Content-Type" : "application/json"},
                  body: JSON.stringify(body)
              });
          
              if (response.ok) {
                  fetchReview(id)
                  if (listenList){
                  deleteListenlist()}
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
                  const contenu = 'Vous avez ajouté ' + albumData.title + ' à vos albums écoutés'
                  const body = {id_user, activite_date, contenu}
                  const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                      method: "POST",
                      headers: {"Content-Type" : "application/json"},
                      body: JSON.stringify(body)
                  })
                } else {
                  console.log("Erreur lors de l'ajout.");
                }
          } catch (error) {
              console.error(error);
              // navigate('/login');
          }
          }

          async function deleteReview() {
            try {
                const response = await fetch(`https://bmusicboxd.onrender.com/review/${user}/${albumData.id}`, {
                    method: "DELETE",
                    headers: {"Content-Type" : "application/json"}
                });
            
                if (response.ok) {
                    fetchReview(id)
                    setReview_note(0)
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
                    const contenu = 'Vous avez retiré ' + albumData.title + ' de vos albums écoutés'
                    const body = {id_user, activite_date, contenu}
                    const responseact = await fetch(`https://bmusicboxd.onrender.com/activite/`, {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                  } else {
                    console.log("Erreur lors de l'ajout.");
                  }
            } catch (error) {
                console.error(error);
                // navigate('/login');
            }
            }
      
    const handleGoBack = () => {
        navigate(-1);
      };

      const handleGoEnAvant = () => {
        navigate(+1);
      };

      

    return(
        <div className="albumView">
            <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}></Sidebar>
            <IconButton aria-label="delete" size="small" sx={{position:'fixed', margin:'15px', zIndex:'4'}} onClick={handleGoBack}>
            <ArrowBackIosIcon sx={{color:'white'}} fontSize="15px" />
            </IconButton>
            <IconButton aria-label="delete" size="small" sx={{position:'fixed',marginLeft:'40px', marginTop:'15px', zIndex:'4'}} onClick={handleGoEnAvant}>
            <ArrowForwardIosIcon sx={{color:'white'}} fontSize="15px" />
            </IconButton>
            {albumData ? (
            <div className='albumdata'>
            <Stack spacing={0} direction="column" sx={{marginLeft:'-30px'}}>
            <Stack spacing={3} direction="row" >
                <Link to={albumData.cover_medium} target="_blank"><img src={albumData.cover_medium} className='albumcover'></img></Link>
                <div className='txtcontaineralbum'>
                    <p className='albumd'>ALBUM</p>
                    <h1 className='titrealbum'>{albumData.title}</h1>
                    <p className='moredataalbum'>{albumData.release_date.substring(0, 4)} <CircleIcon/> {albumData.nb_tracks} titres <CircleIcon/> {(Math.floor(albumData.duration / 3600)) + 'h' + (Math.floor((albumData.duration % 3600) / 60)) + 'min'}</p>
                </div>
            </Stack>
            <Stack spacing={1} direction="row" >
                <p className='linktoartist'><Link to={'/artist/'+albumData.artist.id} className='linktoartist'>{albumData.artist.name}</Link></p>
                <p className='linktodeezeralbum'> <a href={albumData.link} target='_blank' className='linktodeezeralbum'>Écouter sur Deezer <DeezerIcon className='icon'/></a></p>
            </Stack>

            </Stack>

            </div>):(
                <CircularProgress sx={{marginLeft:'75px'}}/>
            )}
            <Stack spacing={0} direction="row" >
            <div className='listenlist'>
              {listenList && albumData ? (
                <div className='llistenlist'>
                <h3>Retirer de la Listenlist</h3>
                <IconButton aria-label="delete" sx={{width:'100px', height:'100px'}} onClick={deleteListenlist}>
                <WatchLaterIcon sx={{color:'#1ED75A', width:'100%', height:'100%'}} fontSize="100%" />
                </IconButton>
                </div>
              ):(
                <div className='llistenlist'>
                <h3>Ajouter à la Listenlist</h3>
                <IconButton aria-label="delete" sx={{width:'100px', height:'100px'}} onClick={addToListenList}>
                <WatchLaterOutlinedIcon sx={{color:'#1ED75A', width:'100%', height:'100%'}} fontSize="100%" />
                </IconButton>
                </div>
              )}
            </div>
            <div className='review'>
              {hasReview && reviewdata ? (

                <div className='rreview'>
                  <p className='txtreview'>Votre review :</p>
                  <Stack spacing={0} direction="column">
                  <StyledRating
                        name="customized-color"
                        defaultValue={review_note}
                        disabled
                        sx={{marginLeft:'10vw',marginTop:'5px'}}
                      />
                  <p className='txtreview'>{reviewdata.texte}</p>
                  <Button variant="contained" onClick={deleteReview} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '10vw',color: 'white',marginLeft:'45vw', backgroundColor: '#454545', fontFamily: gotham}} className='test'>
                      Supprimer
                    </Button>
                    </Stack>
                </div>

              ):(
                <div className='rreview'>
                  {isReviewing? (
                    <div>
                      <Stack spacing={0} direction="column" sx={{marginTop:'7vh'}}>
                      <StyledRating
                        name="customized-color"
                        defaultValue={review_note}
                        sx={{marginLeft:'10vw'}}
                        onChange={(event, newValue) => {
                          if(newValue===null){setReview_note(0);}else{
                          setReview_note(newValue);}
                        }}
                      />
                 <CssTextField label="Votre review" id="review_txt"
                    multiline
                    maxRows={3}
                    fullWidth
                    borderColor='white'
                    InputProps={{
                        style: {
                        color: 'white',
                        borderColor: '#1ED75A',
                        },
                    }}
                    sx={{width: '75%',marginLeft:'10vw',marginTop:'5px'}}
                />
                <Stack spacing={0} direction="row" sx={{marginLeft:'35vw',marginTop:'2.5vh'}}>
                <Button variant="contained" onClick={annuler_review} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '9vw',color: 'white', backgroundColor: '#454545', fontFamily: gotham}} className='test'>
                      Annuler
                    </Button>
                    <Button variant="contained" onClick={review} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '9vw',marginLeft:'2vw',color: 'white', backgroundColor: '#1ED75A', fontFamily: gotham}} className='test'>
                      Enregistrer   
                    </Button>
                </Stack>
                </Stack>
                    </div>
                  ) : (
                    <div>
                      <Button variant="contained" onClick={add_review} sx={{ '&:hover': {
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }, width: '75%',color: 'white', marginLeft:'10vw', backgroundColor: '#1ED75A',marginTop:'10vh', fontFamily: gotham}} className='test'>
                      Noter cet album
                    </Button>
                    </div>
                  )}
                </div>

              )}


            </div>
            </Stack>
        </div>
    )

}
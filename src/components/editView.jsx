import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import gotham from '../font/GothamBold.ttf';
import { ToastContainer, toast } from 'react-toastify';


import '../styles/editview.css'


const pronoms = [
    {
      value: 'he/him',
      label: 'he/him',
    },
    {
      value: 'she/her',
      label: 'she/her',
    },
    {
      value: 'they/them',
      label: 'they/them',
    },
    {
      value: 'others',
      label: 'others',
    },
    {
      value: '',
      label: '',
    },
  ];

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




export default function EditView({ isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {
    const [userData, setUserData] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [pronom, setPronom] = useState('');
    const navigate = useNavigate(); 

    function changePhoto(){
        const newphoto = document.getElementById("photo").value;
        setPhoto(newphoto)
    }

    function changePseudo(){
        const newpseudo = document.getElementById("pseudo").value;
        setPseudo(newpseudo)
    }

    const handlePronomChange = (event) => {
        setPronom(event.target.value);
    };
    
    function logout() {
        setIsConnected(false)
        localStorage.removeItem("token")
        setUser({})
        setUserData(null)
        toast.success("Déconnexion réussie");
        navigate('/')
      }

    const modifuser = async (e) => {
        const newpseudo = document.getElementById("pseudo").value;
        const newphoto = document.getElementById("photo").value;
        const newpronoms = pronom
        const newloc = document.getElementById("localisation").value;
        const newbio = document.getElementById("bio").value;
        if (newpseudo===''){
            toast.error("Veuillez renseigner votre pseudo");
        } else if(newphoto==='') {
            toast.error('Veuillez renseigner une photo de profil valide')
        } else{
            const body = {newpseudo, newbio, newpronoms, newloc,newphoto}
            const url = 'https://bmusicboxd.onrender.com/userbox/'+user;
            console.log(body)
            try{
                const response = await fetch(url, {
                        method: "PUT",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                console.log(response)
                navigate('/user')
            }catch{
                toast.error('Erreur lors de la sauvegarde')
            }
           
        }
    }

    useEffect(() => {
        if (user === ''){
        navigate('/login')
        } else {
        fetchUser(user);
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
        setPseudo(data[0].pseudo)
        setLocalisation(data[0].localisation)
        setBio(data[0].bio)
        setPhoto(data[0].photo)
        setPronom(data[0].pronoms)
        setUserData(res)
        } catch {
        navigate('/login')
        }
    }

    return (
        <div className="editView">
          {userData ? (
            
            <Stack direction="column">
                <ToastContainer />
            <Link to='/user' style={{ color: 'white' }}>
            <Stack direction="row">
            <Avatar alt={user}
            src={photo}
            sx={{ width: 150, height: 150, marginTop: '30px', marginLeft: '400px'}}/>
            <h1 className='pseudoModif'>{pseudo}</h1>
            </Stack></Link>
            <Stack spacing={0} direction="row" sx={{ marginTop: '50px', marginLeft: '200px', marginRight: '200px' }}>
              <Box
                sx={{
                    width: '500px',
                    maxWidth: '100%',
                    marginLeft:'10px'
                }}
                >
              <Stack spacing={3} direction="column">
              <CssTextField label="Pseudo" id="pseudo"
                    defaultValue={pseudo}
                    fullWidth
                    borderColor='white'
                    onChange={changePseudo}
                    InputProps={{
                        style: {
                        color: 'white',
                        borderColor: '#1ED75A',
                        },
                    }}
                    sx={{marginRight:'45px'}}
                />
                <CssTextField label="Localisation" id="localisation"
                    defaultValue={localisation}
                    fullWidth
                    borderColor='white'
                    InputProps={{
                        style: {
                        color: 'white',
                        borderColor: '#1ED75A',
                        },
                    }}
                />
                <CssTextField label="Pronoms" id="pronoms"
                    defaultValue={pronom}
                    fullWidth
                    onChange={handlePronomChange}
                    borderColor='white'
                    InputProps={{
                        style: {
                        color: 'white',
                        borderColor: '#1ED75A',
                        },
                    }}
                    sx={{marginRight:'45px'}}
                    select
                >
                {pronoms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </CssTextField>
              </Stack></Box>
              <Box
                sx={{
                    width: '500px',
                    maxWidth: '100%',
                    marginLeft:'100px'
                }}
                >
              <Stack spacing={3} direction="column">
              
                <CssTextField label="Lien vers votre photo de profil" id="photo"
                    defaultValue={photo}
                    maxRows={5}
                    fullWidth
                    borderColor='white'
                    multiline
                    onChange={changePhoto}
                    InputProps={{
                        style: {
                        color: 'white',
                        borderColor: '#1ED75A',
                        },
                    }}
                />
                <CssTextField label="Bio" id="bio"
                defaultValue={bio}
                maxRows={5}
                InputProps={{
                    style: {
                    color: 'white',
                    borderColor: '#1ED75A',
                    },
                }}
                multiline
                width='250px'
                fullWidth
                />
              </Stack></Box>
              
            </Stack>
            <Stack spacing={0} direction="row" sx={{ marginTop: '50px', marginLeft: '200px', marginRight: '200px' }}>
                <Button variant="contained" onClick={modifuser} sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: '#1a1a1a',
                }, color: 'black', width:'100%',marginRight:'50px', marginLeft:'50px', backgroundColor: '#1ED75A', fontFamily: gotham}}>
                Enregistrer
                </Button>

                <Button variant="contained" onClick={logout} sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: '#1a1a1a',
                }, color: 'white', width:'100%', marginRight:'50px', marginLeft:'50px', backgroundColor: '#960603', fontFamily: gotham}}>
                Se déconnecter
                </Button>

            </Stack>
            </Stack>
          ) : (
            <CircularProgress />
          )}
        </div>
      );
    }
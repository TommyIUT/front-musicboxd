import '../styles/connexionView.css';
import logotxtgris from '../assets/logo_txt_gris.png'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import gotham from '../font/GothamBold.ttf'
import { ToastContainer, toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';


export default function ConnexionView({isAdmin, setIsAdmin,user, setUser, isConnected, setIsConnected}) {
    const bcrypt = require('bcryptjs');
    const navigate = useNavigate();

    const setAuth = boolean => {
        setIsConnected(boolean)
    }

    const handleButtonClick = async (e) => {
        e.preventDefault();
        const mail = document.getElementById("email").value;
        const passwd = document.getElementById("password").value;
        const password = await bcrypt.hash(passwd, 10);

        if (!(mail==='') && !(password==='')){

            // test si mail existe
            const url = `http://localhost:5000/userbox/mail/${mail}`;
            const response = await fetch(url, {
                method: "GET"
            });
            const data = await response.json();
    
            if (data.length===0){
                toast.error(mail + " n'existe pas");
            } else {
                const body = {mail, password}
                const response = await fetch("http://localhost:5000/auth/login", {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                const parseRes = await response.json()
                if (parseRes.invalid) {
                    toast.error('Le mot de passe est incorrect');
                } else {
                    toast.success("Connexion réussie");
                    localStorage.setItem("token",parseRes.token)
                    setAuth(true)
                    setUser(data[0].identifiant)
                    if (data[0].identifiant==="tommy" || data[0].isAdmin ){setIsAdmin(true)}
                    navigate('/user')
                }

            }

        } else {
            toast.error("Veuillez tout remplir");
        }

    }



    return (
        <div className='connexionView'>
            <Stack spacing={1} direction="column">
            <Link to="/"><a href='/' ><img src={logotxtgris} alt="Musicboxd" className='logo-login'/></a></Link>
            <form className='login-form'>
                <div class="input-login">
                    <label for="email">E-mail :</label>
                    <input type="email" id="email" name="email" required></input>
                </div>
                <div class="input-login">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <button type="submit" className='login-button' onClick={handleButtonClick}>SE CONNECTER</button>
            </form>
                <ToastContainer />

                <div class="divider"></div>
                <p className='noaccount'> Vous n'avez pas de compte ?</p>
                <Link to="/register">
                <Button href="/register" variant="contained" startIcon={<AccountCircleSharpIcon />} sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: '#1a1a1a',
                }, color: 'black', width:'100%', backgroundColor: '#1ED75A', fontFamily: gotham}}>
                S'INSCRIRE
                </Button></Link>

            </Stack>

            
        </div>
    
    );
  }
  
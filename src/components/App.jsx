import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from './homeView.jsx'
import UserView from './userView.jsx'
import ConnexionView from './connexionView.jsx'
import InscriptionView from'./inscriptionView.jsx'
import SearchView from './searchView.jsx';
import EditView from './editView.jsx';
import AlbumView from './albumview';
import ArtistView from './artistView.jsx';
import {useState} from "react";
import ArtistsView from './artistsview.jsx';
import ListenlistView from './listenlistView.jsx';
import ActiviteView from './activiteView';
import AlbumsView from './albumsView.jsx';
import AdminView from './adminView.jsx';


function App() {

  const [user, setUser] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' element={<h1>404: page not found </h1>}></Route>
          <Route path='/' exact element={<HomeView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/user' exact element={<UserView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/login' exact element={<ConnexionView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/register' exact element={<InscriptionView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/search' exact element={<SearchView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/artist/:id' exact element={<ArtistView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/album/:id' exact element={<AlbumView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/artists' exact element={<ArtistsView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/activite' exact element={<ActiviteView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/albums' exact element={<AlbumsView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/admin' exact element={<AdminView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/listenlist' exact element={<ListenlistView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
          <Route path='/edit' exact element={<EditView isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { app } from "./app";
import CreatePlaylist from "./endpoints/Playlist/createPlaylist";
import CreateUser from "./endpoints/User/createUser";
import DeletePlaylist from "./endpoints/Playlist/deletePlaylist";
import DeleteUser from "./endpoints/User/deleteUser";
import EditPlaylist from "./endpoints/Playlist/editPlaylist";
import EditUser from "./endpoints/User/editUser";
import GetAllPlaylists from "./endpoints/Playlist/getAllPlaylists";
import GetAllUsers from "./endpoints/User/getAllUsers";
//Endpoints Users

//Get All Users
app.get('/users', GetAllUsers)
//Create User
app.post('/user', CreateUser);
//Edit User
app.put('/user/:id', EditUser);
//Delete User
app.delete('/user/:id', DeleteUser);


//Endpoints Playlists

//Get All Playlists
app.get('/playlists', GetAllPlaylists);
//Create Playlist
app.post('/playlist/:userId', CreatePlaylist);
//Edit Playlist
app.put('/playlist/:id', EditPlaylist);
//Delete Playlist
app.delete('/playlist/:id', DeletePlaylist);
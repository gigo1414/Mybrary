import React, { useEffect, useState } from "react";
import './App.css';
import Post from "./Post";
import {auth, db} from "./firebase";
import Modal from "@mui/material/Modal";
import {Button, Input} from "@mui/material";
import Image from "./Image"
import { InstagramEmbed } from 'react-social-media-embed';



function App() {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn]= useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(()=>{
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()

      })))

      });
  },[]);

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=> alert(error.message))
  }

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message))
  }
  

  return (
    <div className="app">
     

      <Modal  
      open={openSignIn} 
      onClose={()=> setOpenSignIn(false)}
      >
        <div className="modal">
          <form className="app-signup">
          <center>
          <img className="app-logo" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""
          />
          </center>
          <Input 
              type="text"
              placeholder="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
          />
           <Input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
          />

          <Button onClick={signIn}>Sign In</Button>

          </form>
          
        </div>
      </Modal>




      <Modal  
      open={open} 
      onClose={()=> setOpen(false)}
      >
        <div className="modal">
          <form className="app-signup">
          <center>
          <img className="app-logo" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""
          />
          </center>
          <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
          />
           <Input 
              type="text"
              placeholder="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
          />
           <Input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
          />

          <Button onClick={signUp}>Sign Up</Button>

          </form>
          
        </div>
      </Modal>



      <div className="app-header">
      <img className="app-logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
      {
        user ? (<Button onClick={()=> auth.signOut()}>Logout</Button>) :
        ( <div className="app-login">
        <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={()=> setOpen(true)}>Sign Up</Button>
        </div>)
      }
     
      </div>

      <div className="app-posts">
        <div className="app-posts-left">
        {
        posts.map(({id, post})=> (
          <Post key={id} username={post.username} user={user}
          caption={post.caption} imageUrl={post.imageUrl} postId={id}/>
        ))
        }
        </div>
        <div className="app-posts-right">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
           <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width="100%" />
       </div>
        </div>
      </div>


      { user?.displayName ? (<Image username={user.displayName}/>) 
      : (<h3 className="image-text"> Login to upload </h3>)
      } 

    </div>
  )
}

export default App;

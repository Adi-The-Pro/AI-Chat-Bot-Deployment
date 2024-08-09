import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink'
import styles from './Header.module.css';
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
      <Toolbar sx={{display:"flex"}}>
        <Logo/>
        <div className="">
          {auth?.isLoggedIn ? 
            <div className={styles.cont}>
              <div className={styles.navLink1}>
                <NavigationLink to="/chat" text="Go To Chat"/>
              </div>
              <div className={styles.navLink2}>
                <NavigationLink to='/' text="logout" onClick={auth.logout} />
              </div>
            </div> : 
            <div className={styles.cont}>
              <div className={styles.navLink1}>
                <NavigationLink to="/login" text="Login"/>
              </div>
              <div className={styles.navLink2}>
                <NavigationLink to='/signup' text="Signup" onClick={auth.signup} />
              </div>
            </div>
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

import React, { useEffect, useState } from 'react'
import { Box} from '@mui/material'
import TextInput from '../components/shared/TextInput'
import Button from '../components/shared/Button';
import {toast} from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const auth = useAuth(); //useContext Hook
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //If the user is already logged in redirect to /chat
  useEffect(() => {
    if(auth?.user){
      return navigate('/chat');
    }
  },[auth]);

  const handleSubmit = async () => {
    try{
      toast.loading("Sigining In",{id:"Login"});
      await auth?.login(email, password);
      toast.success("Signed In Successfully",{id:"Login"});
    }
    catch(error){
      console.log(error);
      toast.error("Signing In Failed",{id:"Login"});
    }
  }

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={5} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt='Robot' style={{ width: "300px", height: "400px" }}></img>
      </Box>
      <Box display={'flex'} flex={{ xs: 0.5, md: 0.5 }} justifyContent={"center"} alignItems={'center'} padding={2} ml={40} mt={1}>
        <div
          style={{
            background: "#05101c",
            margin: "auto",
            padding: "5px 30px",
            boxShadow: "40px 40px 400px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: 'center', margin: '13px 0px' }}><h1 style={{ margin: '0px' }}>Login</h1></div>
          <TextInput placeholder='Enter Your Email' type='email' onChange={(e) => setEmail(e.target.value)}></TextInput>
          <TextInput style={{ margin: '2px 0px' }} placeholder='Enter Your Password' type='password' onChange={(e) => setPassword(e.target.value)}></TextInput>
          <Button onClick={handleSubmit} text='Login'></Button>
        </div>
      </Box>
    </Box>
  )
}

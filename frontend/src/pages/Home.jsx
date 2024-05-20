import React from 'react'
import { Box } from '@mui/material'
import Typer from '../components/Typer/Typer'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box sx={{
        display: "flex", width: "100%", flexDirection:'column',alignItems: 'center',mx:'auto',mt:1
      }}>
        <Box>
          <Typer/>
        </Box>
        <Box sx={{
          width: "100%", display: "flex", flexDirection:{md:"row",xs:"column"}, gap:5, my:10
        }}>
          <img src="robot.png" alt="robot" style={{width:"180px", margin:"auto"}} />
          <img className='image-inverted rotate' src="openai.png" alt="openai" style={{width:"180px", margin:"auto"}}/>
        </Box>
        <Box sx={{
          display: "flex", width: "100%", mx:"auto"
        }}>
          <img src="chat.png" alt="chatbot" style={{display:'flex', margin:'auto', width:"60%",marginTop:"20px",
          marginBottom:"20px",borderRadius:20, boxShadow:"-5px -5px 105px #64f3d5"}}/>
        </Box>
        <Footer/>
      </Box>
    </Box>
  )
}

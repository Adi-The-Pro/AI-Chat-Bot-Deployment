import React,{useRef,useState,useEffect} from 'react'
import {Box,Avatar,Button,Typography,IconButton, typographyClasses} from '@mui/material'
import {useAuth} from '../context/AuthContext';
import {red} from '@mui/material/colors';
import { ChatItem } from '../components/Chat/ChatItem';
import {IoMdSend} from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../http';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Chat() {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [chatMessages,setChatMessages] = useState([]);
  //Fetching All The Chats Of The User
  useEffect(() => {
    const getChats = async () => {
      if(auth?.isLoggedIn && auth.user){
        toast.loading("Loading Chats",{id:"Loadchats"});
        try{
          const data = await getUserChats();
          setChatMessages(data);
          toast.success("Successfully loaded the chats",{id:"Loadchats"});
        }catch(err){
          console.log(err);
          toast.error("Loading Failed",{id:"Loadchats"});
        }
      }
    }
    getChats();
  },[auth]);
  //If Without Login Someone tries to access /chat page
  useEffect(() => {
    if(!auth.user){
      return navigate('/login');
    }
  },[auth]);
  //Deleting all the chats of the user and replacing the state variable with and empty []
  const handleDeleteChats = async () => {
    try{
      toast.loading("Deleting Chats",{id:"deletechats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted All The Chats",{id:"deletechats"});
    }catch(err){
      console.error(err);
      toast.error("Deleting Chats Failed",{id:"deletechats"});
    }
  }
  //Handling Submition of a query
  const handleSubmit = async () => {
    const content = inputRef.current?.value;
    const newMessage = {role:"user",content};
    setChatMessages((prev) => [...prev,newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    inputRef.current.value=" ";
  }
  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}>
      <Box sx={{display:{md: "flex", xs:"none", sm:"none", flex:0.25, flexDirection:"column"}}}>
        <Box sx={{
          display:"flex", 
          width:"100%",
          height: "60vh", 
          bgcolor:"rgb(17,29,39)", 
          borderRadius:5, 
          flexDirection:"column",
          mx:3
        }}>
          <Avatar sx={{
            mx:"auto",
            my:2,
            backgroundColor:"white",
            color:"black",
            fontWeight:700,
          }}>
            {auth?.user?.name[0]}{auth?.user?.name?.split(" ")?.[1]?.[0]}
          </Avatar>
          <Typography sx={{mx:"auto", fontFamily:"work sans", my:0, p:3}}>
            You can ask some questions related to Knowledge, Business, Advices, Education, etc. But Avoid 
            sharing personal information.
          </Typography>
          <Button onClick={handleDeleteChats} sx={{
            width: "200px",
            my: "auto",
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            backgroundColor: red[300],
            ":hover":{
              backgroundColor:red.A400 
            }
          }}>Clear Conversation</Button>
        </Box>
      </Box>
      <Box sx={{display:"flex", flex:{md:0.8,xs:1,sm:1}, flexDirection:"column", mx:3}}>
        <Typography sx={{mx:"auto", textAlign:"center",fontSize:"40px",color:"white",mb:2,fontWeight:"600"}}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{
          width: "100%",
          height: "60vh",
          borderRadius:3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll", overflowX:"hidden", overflowY:"" ,scrollBehavior:"smooth",
        }}>
          {chatMessages.map((chat,index) => 
            <ChatItem key={index} content={chat.content} role={chat.role}/>
          )}
        </Box>
        <div styles={{width: "100%",borderRadius: 8, backgroundColor: "rgb(17,27,39)", display:"block",margin: "auto"}}>
          <input ref={inputRef} type='text' style={{margin:"8px 0px",width: "94%",backgroundColor:"#004d5612",padding: "10px",borderRadius: "10px",color: "white", fontSize: "20px",}}></input>
          <IconButton onClick={handleSubmit} sx={{ml:"auto", color:"white"}}> <IoMdSend/></IconButton>
        </div>
      </Box>
    </Box>
  )
}

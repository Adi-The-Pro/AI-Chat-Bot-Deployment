import axios from 'axios';
export const loginUser = async (email,password) => {
    const res = await axios.post("/user/login",{email,password});
    if(res.status !== 200){
        throw new Error('Unable to Login');
    }
    const data = await res.data;
    return data;
}

export const signupUser = async (name,email,password) => {
    const res = await axios.post("/user/signup",{name,email,password});
    if(res.status !== 201){
        throw new Error('Unable to Signup');
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async (email) => {
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200){
        throw new Error('Unable to Authenticate');
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async (message) => {
    const res = await axios.post("/chat/new",{message});
    if(res.status !== 200){
        throw new Error('Unable to Send Chat');
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if(res.status !== 200){
        throw new Error('Unable to Fetch All Chats');
    }
    const data = await res.data;
    const {chats} = data;
    return chats;
}

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if(res.status !== 200){
        throw new Error('Unable to delete Chat');
    }
    const data = await res.data;
    return data;
}
export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if(res.status !== 200){
        throw new Error('Unable to logout Chat');
    }
    const data = await res.data;
    return data;
}

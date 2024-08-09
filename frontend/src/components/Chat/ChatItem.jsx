import { Box, Avatar, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export const ChatItem = ({ content, role }) => {
    const auth = useAuth();
    const extractCodeFromString = (message) =>{
        if (message.includes("```")) {
            const blocks = message.split("```");
            return blocks;
        }
    }
    const isCodeBlock = (str) =>{
        if (str.includes("=") || str.includes(";") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("#") || str.includes("}") || str.includes("//")){
            return true;
        }
        return false;
    }
    const codeBlocks = extractCodeFromString(content);
    return (
        role === "assistant" ?
            <Box sx={{display: "flex", p: 2, backgroundColor: "#004d5612", my: 2, gap: 2, flexDirection:"column"}}>
                <Avatar sx={{ ml: "0" }}>
                    <img src="openai.png" alt='openai' width="30px"></img>
                </Avatar>
                {!codeBlocks && <Typography fontSize={"20px"}>{content}</Typography>} 
                { codeBlocks && codeBlocks.length>0 && codeBlocks.map((block,index) => isCodeBlock(block) ? 
                    <SyntaxHighlighter key={index} language="javascript" style={coldarkDark}>
                        {block}
                    </SyntaxHighlighter>: 
                    <Typography key={index} fontSize={"20px"}>{block}</Typography>
                )}
            </Box>
            :
            <Box sx={{
                display: "flex",
                p: 2, backgroundColor: "#004d56", gap: 2
            }}>
                <Avatar sx={{ ml: "0", backgroundColor: "black", color: "white" }}>
                    {auth?.user?.name[0]}{auth?.user?.name.split(" ")?.[1]?.[0]}
                </Avatar>
                <Typography fontSize={"20px"}>{content}</Typography>
            </Box>
    )
}

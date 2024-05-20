const User = require("../models/user");
const { configureOpenAI } = require("../config/openai-config");
const { OpenAIApi } = require("openai");

exports.generateChatCompletion = async (req,res,next) => {
    const {message} = req.body;
    try{
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).json({message:"User not registered OR token malfunctioned"});
        }

        //Grabs all chats of user
        const chats = user.chats.map(({role,content}) => ({role,content}));
        chats.push({content:message,role:"user"});
        user.chats.push({content:message,role:"user"});

        //Send all chats with the new one to the openAI api
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        //Get latest response
        try{
            console.log(chats);
            const chatResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: chats,
            });
            user.chats.push(chatResponse.data.choices[0].message);
            await user.save();
            return res.status(200).json({chats: user.chats});
        }
        catch(err){
            console.log("here")
            return res.status(500).json({message:"Something went wrong"});
        }

    }
    catch(err){
        // console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
    
}
exports.sendChatsToUser = async (req,res,next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
          return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK",chats:user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.deleteChats = async (req,res,next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
          return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).send("Permissions didn't match");
        }
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
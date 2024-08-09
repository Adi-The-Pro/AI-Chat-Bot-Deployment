const User = require("../models/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

        //Get latest response
        try{
            // Access your API key as an environment variable (see "Set up your API key" above)
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);

            async function run() {
                // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                const result = await model.generateContent(message);
                const response = await result.response;
                const text = response.text();
                user.chats.push({content:text,role:"assistant"});
                await user.save();
                return res.status(200).json({chats: user.chats});
            }
            run();
        }
        catch(err){
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
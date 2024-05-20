const { Configuration }  =  require('openai');
exports.configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_2,
        organization: process.env.OPEN_AI_1,
    });
    return config;
}
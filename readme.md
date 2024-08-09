# BrainyBot

BrainyBot is an AI-powered chat application that leverages the Gemini API to provide users with solutions to their questions. It offers a seamless and interactive experience akin to the original Gemini Chatbot.



## Features

- AI-Powered Chat: Utilizes the Gemini API to generate human-like responses to user queries.
- Real-Time Interaction: Provides instant feedback and solutions to user questions, mimicking a natural conversation.
- User-Friendly Interface: A clean and intuitive front end for easy interaction.
- User Authentication: Allows users to register and log in for personalized experiences.


![Home Page](https://github.com/Adi-The-Pro/AI-Chat-Bot-Deployment/assets/98386784/ebcc1388-f216-4d49-8e31-9001d6fe2667)

![LoginPage](https://github.com/Adi-The-Pro/AI-Chat-Bot-Deployment/assets/98386784/a72d8d28-6be5-4bfc-8311-cd285c7d583d)


![SignupPage](https://github.com/Adi-The-Pro/AI-Chat-Bot-Deployment/assets/98386784/4792c675-d096-4a4b-8e97-b90a58ac0c3d)


![Chatting Page](https://github.com/Adi-The-Pro/AI-Chat-Bot-Deployment/assets/98386784/52fece31-7297-49a8-a136-9af935e34087)
## How To Use
- Sign Up / Log In: Create an account or log in to your existing account.
- Ask Questions: Once logged in, you'll be directed to the chat interface. Type your questions into the chat input field and press Enter to send them.
- Receive Answers: BrainyBot will process your question using the OpenAI API and provide a response in real-time.
## Technologies Used
- Frontend : Vite.js, Material UI, HTML, CSS, JavaScript
- Backend  : Node.js, Express.js
- Database : MongoDB
- API: Gemini Flash 1.5 AI's API (NLP Model)
## Run Locally

Step-1: Clone the project

```bash
  git clone https://github.com/Adi-The-Pro/CouchCriticDeployment
  cd CouchCriticDeployment
```

Step 2: Create Your MongoDB Account and Database Cluster
- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.
- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change <password> with your own password
- Add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

Step 3: Edit the Environment File
- Check a file named .env in the /backend directory.
- This file will store environment variables for the project to run.

Step 4: Update MongoDB URI
- In the .env file, find the line that reads:
- MONGODB_URI="your-mongodb-uri"
- Replace "your-mongodb-uri" with the actual URI of your MongoDB database.

Step 5: Install Backend And Frontend Dependencies
- In your terminal, navigate to the /backend directory and /myapp directory
```bash
  npm install
```

Step 6: Run the Backend Server
- In the same terminal, run the following command to start the backend server:
```bash
  npm run dev
```

Step 7: Run the Frontend Server
- After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:
```bash
  npm run dev
```
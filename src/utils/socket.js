import { io } from 'socket.io-client';
const socket = io('https://collaborative-learning-tracker-backend.onrender.com'); // or your deployed URL
export default socket;

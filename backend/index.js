import express from 'express';
import cors from 'cors';
import { Gemini } from './gemini.js';
const server = express();

server.use(express.json());
const corsOptions = {
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
server.use(cors(corsOptions));
server.use(express.raw({ type: "application/pdf", limit: "10mb" }))

server.get("/",(req,res)=>{
    res.send("status:200")
})
server.post('/api/upload',async (req,res)=>{
    
   const p=await Gemini(req.body);
   res.json(p)
})


server.listen(3000,()=>{
    console.log('Server is running on port 3000');
})















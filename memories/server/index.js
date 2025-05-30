import express from 'express';
import bodyParset from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParset.json({ limit:"30mb",extended: true}));
app.use(bodyParset.urlencoded({ limit:"30mb",extended: true}));
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Hello to Memories API.');
})
// mongoose.connect(CONNECTION_URL)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

mongoose.connect(process.env.CONNECTION_URL,{useNewURLParser : true, useUnifiedTopology: true})
    .then(() => { app.listen(PORT, () => console.log(`server running on port : ${PORT}`))   })
    .catch((err)=>{ console.log(err);   
})

// mongoose.set('useFindAndModify', false); 
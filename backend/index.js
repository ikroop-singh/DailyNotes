const connectToMongo=require('./db')
const express=require('express');
const app=express();
const router=require('./routes/auth');
const router2=require('./routes/notes');
const port=5000;
var cors = require('cors')

connectToMongo();
app.use(express.json());
app.use(cors());

//available routes
app.use(router);
app.use(router2);
// app.use('/api/auth',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`DailyNotes backend Listenng at http://localhost:${port}`);
})

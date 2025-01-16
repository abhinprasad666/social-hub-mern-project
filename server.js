
const express=require('express');
const authRouter= require('./routes/auth-route');
const { dbConnection } = require('./DB/db-connected');

const app=express()



app.use('/api/auth/',authRouter)









const port = process.env.PORT || 5000;

app.listen(port, () =>{console.log(`Server running on port ${port} 🔥`)
            //   database connecting...
                  dbConnection()
});













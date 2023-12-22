const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');
const apiRoutes = require('./routes/route');

const app = express();

/**Middle ware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

/**Routes*/
// app.use('/login' ,(req,res)=>{
//     res.status(201).send(`Route for login`);
// })

// app.use('/signup' ,(req,res)=>{
//     res.status(201).send(`Route for signup`);
// })

/**Mongodb connection*/
const mongodb = require('./mongo/connection');

/**Server starts only when mongo is connected */
mongodb().then(() => {
    try{
        const PORT = process.env.PORT || 8000;
        app.listen(PORT , ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(error){
        console.log('Cannot connect to server');
    }
}).catch(error=>{
    console.log('Invalid database connection');
});


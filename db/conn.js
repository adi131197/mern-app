const mongoose = require('mongoose');
const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true, 
    useFindAndModify:false
}).then(()=>{
    console.log('DB Connection is Successfull !!')
}).catch((e)=> {
    console.log(`An Error occured ->`, e);
})

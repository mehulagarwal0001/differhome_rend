const mongoose=require('mongoose');

const ConnectToMongo = (uri)=>{

    mongoose.connect(uri).then(()=>{
        console.log('Database connected');
    }).catch((err)=> console.log('Database Error', err  ));

}

module.exports=ConnectToMongo;
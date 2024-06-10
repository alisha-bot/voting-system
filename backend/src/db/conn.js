const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://student:wMiVSQTyqFPKIrfo@cluster0.hugd71a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to database')
}).catch((err)=>{
    console.log('Could not connect to database')
})
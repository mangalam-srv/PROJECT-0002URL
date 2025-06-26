const express = require ('express'); //this is used to make servers easily 
require('dotenv').config();
   

    const path = require("path");
    const {connecttomongodb} = require("./connection");//this is required here for connection of the db because the db function is also called here 
    const URL = require('./models/url');
    const ejs = require('ejs');
    const cookieparser = require("cookie-parser");
    const urlroute = require("./routes/url");
    const userroute = require("./routes/user");
    const staticroute = require('./routes/staticrouter');
    const {restricttologgedinusersonly}=require("./middlewares/auth")

    const app = express();//create an instance of the app
    const PORT = 8001;

    app.set("view engine","ejs");//this tells that my view engine is ejs
    app.set("views",path.resolve("./views"));//this tells that all my views files are in the ./views folder

    //connection to DB
    connecttomongodb(process.env.MONGODB_URI)//short-url is the db name this whole string can be found through terminal/mongosh
    .then(()=>{
        console.log("mongodb connected");
    })//this then catch is function same as if else



    //middleware
    app.use(express.json());//this only accpets the data which is sent from the postman in the json format other req are denied
    app.use(express.urlencoded({ extended: false}));//this means it will support json as well as from data 
    app.use(cookieparser());

    app.use("/url",restricttologgedinusersonly,urlroute);//all the req to /url will be handled by the urlroute
    app.use("/",staticroute);//all the req with / will be handled by this 
    app.use("/user",userroute);//if we will use .get then it will not have any further end points but .use will have 
    // app.get("/",async(req,res)=>{
    //     const allurls = await URL.find({});
    //     return res.render("home",{
    //         urls: allurls,
    //     });

    // })

    app.get('/:shortId',async(req,res)=>{
        const shortId = req.params.shortId;//this function finds the id after the :
        const entry = await URL.findOneAndUpdate({//this function is used to find the same short id details and update
            shortId
        },{
            $push :{
                visitHistory :{
                    timestamp : Date.now(),
                },
            },
        })
        
    if (!entry) {
        return res.status(404).send('<h1>Short URL not found</h1>');
    }
        res.redirect(entry.redirectURL);//redirect to the orignial website
    })


    app.listen (PORT,()=>{
        console.log(`server started on port ${PORT}`);
    }) 
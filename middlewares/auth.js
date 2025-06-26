const {getuser,setuser}= require("../service/auth");

function checkforauthentication(req,res,next){
    const authorizationheadervalue= req.headers["authorization"]
}

async function restricttologgedinusersonly(req,res,next){

    const useruid = req.cookies?.uid;

    if(!useruid) return res.redirect("/login");

    const user = getuser(useruid);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports={
    restricttologgedinusersonly,
}


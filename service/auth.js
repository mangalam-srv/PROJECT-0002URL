// const sessionidtousermap = new Map();  bcs now we dont want to maintain state 
const jwt =  require("jsonwebtoken");
const secret = "Mangalam@29"


function setuser(user){
    //  sessionidtousermap.set(id,user);
    
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },
    secret);
}//this func will create tokens for me 

function getuser(token){
//  return    sessionidtousermap.get(id);
try {
    return jwt.verify(token,secret);
    
} catch (error) {
    return null;
    
}


}

module.exports = {
    setuser,
    getuser,
}
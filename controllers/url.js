const shortid = require("shortid");//this is pkg which is used to generste the short id


const URL = require("../models/url");

async function handlegeneratenewurl(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error :'url is required'});
    }

    const shortId = shortid(8);
    await URL.create({
        shortId :shortId, 
        redirectURL :body.url,
        visitHistory : [],
        createdBy: req.user._id,

    })

    return res.render("home",{
        id:shortId,
    })
    


}


async function handlegetanalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics : result.visitHistory,
    })
}



module.exports = {
    handlegeneratenewurl,
    handlegetanalytics,
    

}
import ratelimit from "../config/upstash.js";



const ratelimiter = async(req, res, next) => {
    try 
    {
        const {success} = await ratelimit.limit("my-limit-key");
        //if there some errors
        if(!success) 
        {
            return res.status(429).json({
                message: "Too Many Request, Please Try Again Later"
            });
        }
        next();   
    } catch (error) 
    {
        console.log(`Rate Limit Error ${error}`);
        next(error);
    }
};


export default ratelimiter;
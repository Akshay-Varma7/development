const express = require("express");
const app = express();

app.use(express.json());
let count=0;//shld be global var
function countReq(req,res,next){
    count++;
    console.log("No of requests :",count);
    next();
}
//one req & res(objects) passed through all mw in order, each uses/modifies what it needs, and only next() moves to the next
function userMw(req,res,next){//3 params-for Mw
    const {username , password} =req.query;//memory for this stack
    if(username!="akshay"|| password!="1234"){
        res.status(403).json({//403 - refuses to authorize it
            msg:"Invalid username or password!"
        });
    }else{
        next();
    }
}
function kidneyMw(req,res,next){
    const {kidney} = req.query;//memory for this stack
    if(kidney!="1" && kidney!="2"){//if || then even for 2- true + req.query.kidney is a string (from the URL), not a number.
        res.status(403).json({
            msg:"Invalid kidneys!"
        });
    }else{
        next();
    }
}
//here if of MW satisfy then the handler using this MW wont progress as no next
app.get("/health-checkup",countReq,userMw,kidneyMw,function (req,res){//order of mw
    res.send("your healthy");
})
app.get("/heart-checkup",countReq,userMw,function (req,res){//acc to context -mw
    res.send("your heart is healthy");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
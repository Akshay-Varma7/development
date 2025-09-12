const express = require("express");
const app = express();

app.use(express.json());

function userMw(req,res,next){//3 params-for Mw
    if(username!="akshay"|| password!="1234"){
        res.status(403).json({//403 - refuses to authorize it
            msg:"Invalid username or password!"
        });
    }else{
        next();
    }
}
function kidneyMw(req,res,next){
    if(kidney!=1 && kidney!=2){//if || then even for 2- true
        res.status(403).json({
            msg:"Invalid kidneys!"
        });
    }else{
        next();
    }
}
//here if of MW satisfy then the handler using this MW wont progress as no next
app.get("/health-checkup",userMw,kidneyMw,function (req,res){
    res.send("your healthy");
})
app.get("/heart-checkup",userMw,function (req,res){//here no need kidney check
    res.send("your heart is healthy");
})
app.listen(3000);
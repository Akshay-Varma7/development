const express = require("express");
const app = express();
//global-catches are functions for i/p validation + error(not safe)
//runs only till i run

//correct json :{ "msg": "hi" }
//to access req.body.msg gives hi

app.use(express.json());//no need for get + express.json() parses only JSON requests and puts them as a JS object in req.body. 
app.post("/kidney",function (req,res){
    //kidney is array
    const { kidney } = req.body;//get-query + post/put - body[then we need app.use(express.json()) for mw]
    const countKidney =kidney.length;

    res.send("you have"+ countKidney +" kidneys");
    //any handler res. is main
})
app.use((error,req,res,next)=>{//4 params

})
app.listen(3001);
//global catche always be at bottom
//by using app.use we see the mw calls everytime we hit a route by any handler
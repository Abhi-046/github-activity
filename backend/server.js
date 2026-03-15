const express =require("express");
const axios =require("axios");
const cors=require("cors");

const app=express();
app.use(cors());

app.get("/activity/:username",async(req,res)=>{
    const username =req.params.username;
    try{
        const response=await axios.get(
            `https://api.github.com/users/${username}/events`
        );
       const activities=response.data.slice(0,10).map(event=>{
        switch (event.type){
            case "PushEvent":
                return `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`;
            case "WatchEvent":
                return `starred ${event.repo.name}`;
            case "ForkEvent":
                return `Forked ${event.repo.name}`;
            case "IssuesEvent":
                return `${event.repo.name}`
            default :
                return `${event.type} in ${event.repo.name}`;

        }
       });
       res.json(activities);

    }
    catch(error){
        res.status(404).json({error:"User not found"});

    }
});

app.listen(5000,()=>{
    console.log("server running on port 5000")
})

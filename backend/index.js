const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const fs=require('fs');
const {title}=require("process");
const app=express();

const port=3003;

app.use(bodyParser.json());
app.use(cors());

fs.readFile('todos.json', (err, data)=>{
    if(err) throw err
    jsonData=JSON.parse(data)
});

app.get("/todos", (req, res)=>{
    res.send(jsonData);
});

app.post("/todos", (req, res)=>{
    const todo={
        id:jsonData.length+1,
        title:req.body.title,
        completed:req.body.completed || false
    }

    jsonData.push(todo);

    fs.writeFile('todos.json', JSON.stringify(jsonData), (err)=>{
        if(err) throw err
        res.status(200).json({message: "todo created sucessfully"});
    });

})

app.put("/todos/:id", (req, res)=>{
    const id=parseInt(req.params.id);
    const todo=jsonData.find((t)=> t.id==id);

    if(!todo){
        return res.status(400).json({message: "todo not found bro!!"})
    }

    todo.title=req.body.title!==undefined?req.body.title:todo.title
    todo.completed=req.body.completed!==undefined?req.body.completed:todo.completed

    fs.writeFile('todos.json', JSON.stringify(jsonData), (err)=>{
        if(err) throw err
        res.status(200).json(jsonData);
    })
})

app.delete("/todos/:id", (req, res)=>{
    const id=parseInt(req.params.id);
    const index=jsonData.findIndex((t)=>t.id==id)

    if(index===-1){
        res.status(400).json({message:"Todo not found bro !!"});
    }
    jsonData.splice(index, 1)

    fs.writeFile('todos.json', JSON.stringify(jsonData), (err)=>{
        if(err) throw err
        res.status(200).json({message:"todo deleted sucessfully "})
    })
})

app.listen(port, ()=>{
    console.log(`app is running to ${port}`);
})
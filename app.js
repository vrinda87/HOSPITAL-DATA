const express=require('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./datas.json');
app.get('/hospital',(req,res)=>{
    res.send(data);
})
app.post('/hospital',(req,res)=>{
data.push(req.body);
fs.writeFile('datas.json',JSON.stringify(data), (err,resp)=>{
if(err){
    res.send("Data cannot be added");
}
else{
    res.send("Data added successfully");
}
})
})
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
            item.hospitalpatientCount=req.body.hospitalpatientCount;
            item.hospitalLocation=req.body.hospitalLocation;
        }
    })
    fs.writeFile('datas.json',JSON.stringify(data), (err,resp)=>{
        if(err){
            res.send("Data could not be updated");
        }
        else{
            res.send("Data updated successfully");
        }
    
})
})
app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    let value = data.filter(item => item.hospitalName !== name);
    fs.writeFile('datas.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data cannot be deleted");
        }
        else{
            res.send("Data deleted successfully");
        }
        
    })

})
app.listen(3000);
console.log("Server listening to port 3000");
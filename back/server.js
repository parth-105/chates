const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
const connectdb = require('./db/dbconnection')
const User = require('./db/usermodel')  
const messageModal = require('./db/messagemodel')

app.use(express.json())

app.use(cors())


app.get('/',(req,res)=>{
    res.json({msg:"hii"})
})

app.post('/register', async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.create({ 
            username,password,
        });
        res.status(201).json({ message: "register succesfully" })

    }
    catch (err) {
        res.status(500).json({ error: "failed register" })
    }

})

//Login:----
app.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "can't find user" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "invalide username or password" });
        }
        res.status(200).json({ message: "login successfully" ,user})
      res.send
        
    }
    catch (error) {
        res.status(500).json({ error: "login failed" })
    }

})

//seetavtar image

app.post('/setavtar/:id',async(req,res)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
         
         // Check if userId is valid:
         if (!userId) {
            return res.json({ error: 'User ID is required',status:false });
        }
        // find user and update in mongoDB DATABASE:
        const userData = await User.findByIdAndUpdate(
            userId,
            {
            isAvatarImageSet:true, 
            avatarImage,
            },
            {new : true}
        ) 
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        });

    }
    catch(err){
        return res.json({ error: 'errrrur' });
    }
})


app.get('/alluser/:id',async(req,res)=>{
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "username",
          "avatarImage",
          "_id",
        ]);
      //   console.log("users: ",users);
        return res.json(users);
      } catch (ex) {
        return res.json({ error: 'erur' });
      }
})


app.post('/addmsg',async(req,res)=>{

    try{
        
        const {from, to, message} = req.body;

        const data = await messageModal.create({
            message: {text:message},
            users:[from,to],
            sender:from,
        });

        if(data) return res.json({msg:"Message added successfully..."});

        return res.json({msg: "Failed to add message in Database..."});
   
    }catch(error){
        return res.json({ error: 'erur' });
    }

})


app.post('/getmsg',async(req,res)=>{

    try{
        const {from, to} = req.body;

        const messages = await messageModal.find({
            users:{
                $all:[from,to],
            }
        }).sort({updatedAt:1});

        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf : msg.sender.toString() === from,
                message: msg.message.text,
            }
        })

        res.json(projectMessages);
    }catch(error){
        return res.json({ error: 'erur' });
    }

})

connectdb();

app.listen(port, () => {
    console.log("app is running on port 8000")
})
const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fethchuser');
const { body, validationResult } = require('express-validator');

// Route 1. get all the notes using GET method -- signin required.
router.get('/api/notes/fetchingnotes', fetchuser, async (req, res) => {
    try{

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }catch(error){
        res.status(500).send('Error occured');
    }
})

// Route 2. Add a note using post.Login required
router.post('/api/notes/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength(3),
    body('description', 'enter a valid description').isLength(5),
], async (req, res) => {
    const{title,description,tag}=req.body;
    //if there are errors return bad request
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()});
    }
    try{

        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote);
    }
    catch(error){
       console.error(error.message);
       res.status(500).send('Internal server problem');
    }
})

// Router 3. for updating the notes signin required
router.put('/api/notes/updatenote/:id',fetchuser,async (req,res)=>{
     const{title,description,tag}=req.body;
     const newNote={};
     if(title) newNote.title=title;
     if(description) newNote.description=description;
     if(tag) newNote.tag=tag;
     
     //taking out the note to be upadated
     let note= await Notes.findById(req.params.id);
     

     if(!note){
        res.status(404).send('Note not found');
     }  

     if(note.user.toString()!== req.user.id){
        return res.status(401).send('Not allowed ');
     }

     // updating the notes
     note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     console.log(note)
     res.json(note);
      
})

 router.delete('/api/notes/deletenote/:id',fetchuser,async (req,res)=>{
    let note=await Notes.findById(req.params.id)
    if(!note){
        res.status(404).send("Note not found");
    }  
    if(req.user.id != note.user.toString()){
        res.status(401).send('Note not found');
    }
    try{

        note=await Notes.findByIdAndDelete(req.params.id);
        res.send({success:'Note have been deleted',note});
    }catch(error){
        res.status(500).send({error:'Internal server error'})
    }
    
 })

module.exports = router
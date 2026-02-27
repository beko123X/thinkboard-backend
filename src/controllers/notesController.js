import Note from "../models/Note.js";
export const getAllNotes = async (req, res)=>{   
    try 
    {
        const notes = await Note.find().sort({createdAt: -1});// using sort like this always the new item come at the top
        res.status(200).json(notes);    
    } catch (error) 
    {
        console.error(`Error in getAllNotes controller ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
   
}

export const getNoteById = async (req, res)=>
{
    try 
    {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);    
    } catch (error) 
    {
        console.error(`Error in getAllNotes controller ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
} 

export const createNote = async (req, res)=>{   
    try 
    {
        const {title, content} = req.body;
        const note = new Note({title, content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);   
    } catch (error) {
        console.error(`Error in CreateNote controller ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const updateNote = async (req, res)=>
{
    try 
    {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        
        if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote); 
    } catch (error) {
        console.error(`Error in updateNote controller ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }   
}

export const deleteNote = async (req, res)=>
{
    try 
    {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        
        if(!deleteNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: "Note Deleted Successfully"});
    } catch (error) 
    {
        console.error(`Error in CreateNote controller ${error}`);
        res.status(500).json({message: "Internal Server Error"});    
    }
}
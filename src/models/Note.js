import mongoose from "mongoose";



// 1- Create a Schema
// 2- Model Based of that Schema

const noteSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

}, 
{timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
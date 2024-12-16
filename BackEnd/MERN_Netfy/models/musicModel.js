import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    _id :{ type: String, required: true},
    title: { type: String, required: true },
    artist :{  type: String, required: true } ,
    album: { type: String, required: true },
    releaseDate :{ type: String, required: true} ,
    genres: { type: String, required: false },
    coverImage: { type: String, required: true },
    previewUrl:{ type: String, required: true} ,
    rating :{ type: String, required: true} ,
    description : { type: String, required: true} ,
   
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
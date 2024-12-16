import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image :{  type: String, required: true } ,
    genre: { type: String, required: true },
    review :{ type:Number ,required:true },
    overview: { type: String, required: false },
    releaseDate: { type: String, required: true },
    duration:{ type: String, required: true} ,
    trailer: { type: String, required: true },

});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

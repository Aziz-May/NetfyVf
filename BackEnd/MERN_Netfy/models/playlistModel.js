import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstTrackImage: { type: String, default: null },
    tracks: [{ type:String, ref: 'Music' }],
    createdAt: { type: Date, default: Date.now }
  });
  
  const Playlist = mongoose.model('Playlist', PlaylistSchema);
  export default Playlist;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Repeat, 
  Shuffle 
} from "lucide-react";
import spotifyTracks from '../../../../BackEnd/MERN_Netfy/spotify_tracks.json';

const MusicPlayer = () => {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const [trackChanging, setTrackChanging] = useState(false);

  // Fallback audio source (replace with your actual audio hosting solution)
  const getFallbackAudioSource = (track) => {
    // Option 1: Use a mock audio source for demonstration
    return `https://example.com/audio/${track._id}.mp3`;
    
    // Option 2: Use Spotify preview URLs (if available)
    // return track.previewUrl;
    
    // Option 3: Use a default placeholder audio
    // return '/path/to/default/audio.mp3';
  };

  // Debounced Track Change
  const changeTrack = useCallback((newIndex) => {
    if (trackChanging) return;

    setTrackChanging(true);
    setIsPlaying(false);

    // Small delay to prevent rapid switching
    setTimeout(() => {
      setCurrentTrackIndex(newIndex);
      setTrackChanging(false);
      setIsPlaying(true);
    }, 300);
  }, [trackChanging]);

  // Process Tracks with Fallback Audio
  useEffect(() => {
    const processTracksWithAudio = () => {
      setIsLoading(true);
      try {
        const processedTracks = spotifyTracks.map(track => ({
          ...track,
          audioUrl: getFallbackAudioSource(track),
          coverImage: track.coverImage || 'https://example.com/placeholder-cover.jpg',
          duration: track.duration || 30, // Default duration if not provided
          previewUrl: track.previewUrl || null, // Add previewUrl to each track
        }));

        setTracks(processedTracks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing tracks:', error);
        setIsLoading(false);
      }
    };

    processTracksWithAudio();
  }, []);

  // Initialize audio ref
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    audio.onerror = (e) => {
      console.error('Audio Error Details:', {
        error: e,
        src: audio.src,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setIsPlaying(false);
    };

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Find initial track
  useEffect(() => {
    const trackIndex = tracks.findIndex(t => 
      id ? t._id === id : true
    );
    setCurrentTrackIndex(trackIndex !== -1 ? trackIndex : 0);
  }, [id, tracks]);

  // Setup audio and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;
    
    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play().catch(handlePlayError);
      } else {
        changeTrack((currentTrackIndex + 1) % tracks.length);
      }
    };

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeating, tracks, currentTrackIndex, changeTrack]);

  // Play Error Handler
  const handlePlayError = (error) => {
    console.error("Detailed Play Error:", {
      error: error,
      track: tracks[currentTrackIndex],
      audioSrc: audioRef.current?.src
    });
    setIsPlaying(false);
  };

  // Play/Pause Logic
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio || tracks.length === 0) return;

    const currentTrack = tracks[currentTrackIndex];
    
    console.log('Current Track:', currentTrack);
    console.log('Attempting to play:', currentTrack.audioUrl);

    // Validate audio source
    if (!currentTrack.audioUrl) {
      console.error('No valid audio source for track');
      setIsPlaying(false);
      return;
    }

    audio.src = currentTrack.audioUrl;
    audio.volume = volume;

    if (isPlaying) {
      audio.play()
        .catch(handlePlayError);
    } else {
      audio.pause();
    }
  }, [currentTrackIndex, isPlaying, volume, tracks]);

  // Track Controls
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    let nextIndex;
    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    changeTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    changeTrack(prevIndex);
  };

  const seekTrack = (e) => {
    const audio = audioRef.current;
    audio.currentTime = parseFloat(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  // Formatting helpers
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Open Spotify Preview
  const openSpotifyPreview = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="music-player-container bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div className="text-center text-xl">
            Loading tracks... (This may take a while)
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center text-xl">No tracks found</div>
        ) : (
          <>
            {/* Track Info */}
            <div className="track-info text-center mb-6">
              <img 
                src={tracks[currentTrackIndex].coverImage} 
                alt={tracks[currentTrackIndex].title} 
                className="mx-auto w-64 h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold">{tracks[currentTrackIndex].title}</h2>
              <p className="text-gray-400">{tracks[currentTrackIndex].artist}</p>
              <p className="text-sm text-gray-500">
                {tracks.length} tracks loaded
              </p>
              {tracks[currentTrackIndex].previewUrl && (
                <button 
                  onClick={() => openSpotifyPreview(tracks[currentTrackIndex].previewUrl)}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
                >
                  Open in Spotify
                </button>
              )}
            </div>

            {/* Audio Controls */}
            <div className="audio-controls flex flex-col items-center">
              {/* Seek Bar */}
              <div className="seek-bar w-full max-w-xl mb-4">
                <input 
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={seekTrack}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="controls flex items-center space-x-6">
                <button 
                  onClick={() => setIsShuffling(!isShuffling)}
                  className={`${isShuffling ? 'text-green-500' : 'text-white'}`}
                >
                  <Shuffle />
                </button>
                <button onClick={prevTrack} disabled={trackChanging}>
                  <SkipBack />
                </button>
                <button 
                  onClick={togglePlay}
                  className="bg-green-600 p-3 rounded-full"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <button onClick={nextTrack} disabled={trackChanging}>
                  <SkipForward />
                </button>
                <button 
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`${isRepeating ? 'text-green-500' : 'text-white'}`}
                >
                  <Repeat />
                </button>
              </div>

              {/* Volume Control */}
              <div className="volume-control mt-4">
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;

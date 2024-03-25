import React, { useState, useRef, useDebugValue, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
const MusicPlayer = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [allMusic, setAllMusic] = useState([]);
  const [index, setIndex] = useState(0);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:3000/api/music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      console.log('File uploaded successfully', data);
      setFilename(data.name)
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  const changeMusic = async (forward) => {
    if(forward){
      setIndex(prevIndex => (prevIndex + 1 === allMusic.length)? 0 : prevIndex + 1)
    }else{
      setIndex(prevIndex => (prevIndex - 1 === 0)? allMusic.length -1 : prevIndex - 1)
    }
  }

  useEffect(() => {
    const getAllMusic = async () => {
      try {
        const data = await axios.get('http://localhost:3000/api/music/all');
        setAllMusic(data.data);
      } catch (err) {
        console.error('Error fetching music:', err);
      }
    };
    getAllMusic();
  }, []);

  useEffect(() => {
    setFilename(`http://localhost:3000/api/music/${allMusic[index]?.name}`);
  }, [index, allMusic]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.load();
    }
  }, [filename]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* {filename && <> */}<br/>
      <FontAwesomeIcon icon={faBackwardStep} onClick={()=>changeMusic(false)}/><br/>
      <audio ref={audioRef} controls>
        <source src={filename} type="audio/mpeg" />
      </audio>
      <FontAwesomeIcon icon={faForwardStep}  onClick={()=>changeMusic(true)}/><br/>
      {/* </>
      } */}
      <br/>
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default MusicPlayer;
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const AttendanceApp = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState('');

  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      // Send the image to the Flask server for processing
      try {
        const response = await axios.post('http://localhost:5000/process_image', {
          image: imageSrc,
        });
        setPrediction(response.data.attendance);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={captureImage}>Capture Image</button>
      {prediction && <p>Attendance: {prediction}</p>}
    </div>
  );
};

export default AttendanceApp;

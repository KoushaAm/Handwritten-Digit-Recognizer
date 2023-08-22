import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import * as onnx from 'onnxjs';
import ModelFile from './onnx_model.onnx'; // Path to your ONNX model file
import { initializeCanvas } from './drawing.js';



function App() {

  const [prediction, setPrediction] = useState(null);


  const canvasRef = useRef(null);
  const clearButtonRef = useRef(null);
  useEffect(() => {

    initializeCanvas(canvasRef, clearButtonRef);

  }, []);

  const predictionNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


  return (
    <div className="App">
      <h1>Handwriter</h1>
      
      <div className = "row">
        <div className="column" >
          <h2>You canvas</h2>
          <canvas ref={canvasRef} className="canvas" id="canvas" width="280" height="280"></canvas>
          <button ref={clearButtonRef} className="button" id="clear-button">CLEAR</button>
        </div>

        <div className="column">
          <h2>Predictions</h2>
          
          <div>
            {predictionNumbers.map((number) => (
              <div className="prediction-row" id={`prediction-${number}`} key={number}>
                <div className = 'number-bar'>
                  <div className="prediction-number">{number}</div>
                  <div className="prediction-bar-container">
                    
                    <div className="prediction-bar"></div>
                  </div>
                </div>
                
                
              </div>
            ))}
          </div>

        </div>
      </div>
      


      
    </div>
  );
}

export default App;

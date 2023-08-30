import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import * as onnx from 'onnxjs';
import ModelFile from './onnx_model.onnx'; // Path to your ONNX model file
// import { initializeCanvas } from './drawing.js';
import { initializeCanvas } from './drawMachanic.js';
// import image
import image from './images/model_architecture.png';



function App() {

  const [prediction, setPrediction] = useState(null);


  const canvasRef = useRef(null);
  const clearButtonRef = useRef(null);
  const arrayRef = useRef(null);
  
  useEffect(() => {
    initializeCanvas(canvasRef, clearButtonRef, arrayRef); 
  }, []);

  const predictionNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


  return (

    <div className="App">
      <header><h3>CNN Digit Recognizer</h3></header>
      <body>
          
          
          <div className = "row">

            <div className="column" >
            <h1>Draw a Number ✏️</h1>
              <div className="canvas-container">
                <canvas ref={canvasRef} className="canvas" id="canvas" width="280" height="280"></canvas>
                <button ref={clearButtonRef} className="clear-button" id="clear-button">CLEAR</button>
              </div>
            </div>

            <div className="column">
              <div className="prediction-container">
                <h1>Predictions</h1>
                
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
                  <h4>Probabilities</h4>
                  <h5 ref = {arrayRef}>[0,0,0,0,0,0,0,0,0,0]</h5>
                </div>
              </div>
              
              

            </div>

            
            
          </div>
          
          <div className="model-text">
              <h2>Model Architecture</h2>
          </div>

          <div className="image-container">
            
            <img src={image} alt="model architecture" className="model-image"></img>
          </div>
          
      </body>




    </div>
  );
}

export default App;

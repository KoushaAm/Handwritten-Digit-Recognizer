import * as onnx from "onnxjs";
import ModelFile from "./onnx_model.onnx"; // Path to your ONNX model file

// CanvasDrawing.js
const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;
let ctx = null;


//model 
let sess = null;
let model = null; 

// boolean conditions 
let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;


function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  for (let i = 0; i < 10; i++) {
    const element = document.getElementById(`prediction-${i}`);
    element.className = "prediction-row";
    element.children[0].children[0].style.width = "0";
  }
}

function drawLine(x0, y0, x1, y1) {
  // Draws a line from (fromX, fromY) to (toX, toY).
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.closePath();

  ctx.stroke();
  // updatePredictions();
}


async function updatePredictions() {
  // Get the predictions for the canvas data.
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

  if (sess) {
    const outputMap = await sess.run([input]);
    const outputTensor = outputMap.values().next().value;
    const predictions = outputTensor.data;
    const maxPrediction = Math.max(...predictions);

    for (let i = 0; i < predictions.length; i++) {
      const element = document.getElementById(`prediction-${i}`);
      element.children[0].children[0].style.width = `${predictions[i] * 100}%`;
      element.className =
        predictions[i] === maxPrediction
          ? "prediction-row top-prediction"
          : "prediction-row";
    }
  }
  
}

function canvasMouseDown(event) {
  isMouseDown = true;
  if (hasIntroText) {
    clearCanvas();
    hasIntroText = false;
  }
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;

  // To draw a dot on the mouse down event, we set laxtX and lastY to be
  // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
  // which draws a line from (laxtX, lastY) to (x, y) that shows up as a
  // dot because the difference between those points is so small. However,
  // if the points were the same, nothing would be drawn, which is why the
  // 0.001 offset is added.
  lastX = x + 0.001;
  lastY = y + 0.001;
  canvasMouseMove(event);
}

function canvasMouseMove(event) {
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;
  if (isMouseDown) {
    drawLine(lastX, lastY, x, y);
  }
  lastX = x;
  lastY = y;
}

function bodyMouseUp() {
  isMouseDown = false;
}

function bodyMouseOut(event) {
  // We won't be able to detect a MouseUp event if the mouse has moved
  // ouside the window, so when the mouse leaves the window, we set
  // `isMouseDown` to false automatically. This prevents lines from
  // continuing to be drawn when the mouse returns to the canvas after
  // having been released outside the window.
  if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
    isMouseDown = false;
  }
}



async function loadModel() {
  sess = new onnx.InferenceSession();
  const modelResponse = await fetch(ModelFile);
  const modelBuffer = await modelResponse.arrayBuffer();
  const modelBytes = new Uint8Array(modelBuffer);
  await sess.loadModel(modelBytes);
  
  // to check if model is loaded right
  // const inputArray = new Float32Array(280 * 280 * 4);
  // const inputTensor = new onnx.Tensor(inputArray, 'float32', [4 * 280 * 280]);

  // const outputMap = await sess.run([inputTensor])
  // const outputTensor = outputMap.values().next().value
  // console.log(outputTensor.data)
  

  return sess;
}


// Event listener setup function
function setupEventListeners(canvasRef, clearButtonRef) {
  canvasRef.current.addEventListener("mousedown", canvasMouseDown);
  canvasRef.current.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButtonRef.current.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw a number here!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
}




export function initializeCanvas(canvasRef, clearButtonRef) {

  // Initialize canvas and context
  ctx = canvasRef.current.getContext("2d");
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText("Loading...", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

  // Set the line color for the canvas.
  ctx.strokeStyle = "white";

// Add event listeners with promise of model
  loadModel().then((loadedModel) => {
    sess = loadedModel;
    setupEventListeners(canvasRef, clearButtonRef);
  })
  .catch(error => {
    console.error("Error loading model:", error);
  });


}



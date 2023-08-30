import * as onnx from "onnxjs";
import ModelFile from "./onnx_model.onnx";

const CANVAS_SIZE = 280;

// model info
var sess;

var arrayRef_ref;

var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var x = "white",
y = 5;

var w = CANVAS_SIZE;
var h = CANVAS_SIZE;



async function loadModel() {
    let newSession = new onnx.InferenceSession();
    const modelResponse = await fetch(ModelFile);
    const modelBuffer = await modelResponse.arrayBuffer();
    const modelBytes = new Uint8Array(modelBuffer);
    await newSession.loadModel(modelBytes);

    return newSession
}

function setupEventListeners(canvasRef, clearButtonRef) {
    canvasRef.current.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvasRef.current.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvasRef.current.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvasRef.current.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

    clearButtonRef.current.addEventListener("mousedown", erase);

 

    
    ctx.clearRect(0, 0, w, h);
}

export function initializeCanvas(canvasRef, clearButtonRef, arrayRef) {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    
    
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";

    arrayRef_ref = arrayRef;

    setupEventListeners(canvasRef, clearButtonRef);

    // load model 
    loadModel().then((loadedModel) => {
        sess = loadedModel;
        
    });

}


function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();

    updatePredictions();
}

async function updatePredictions() {
    // get image data
    // color channels are 0 or 255
    let imgData = ctx.getImageData(0, 0, w, h);
    let input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

    if (sess) {
        const outputMap = await sess.run([input]);
        const outputTensor = outputMap.values().next().value;
        const predictions = outputTensor.data;
        // console.log(predictions);
        // get max probability 
        const maxPrediction = Math.max(...predictions);
        const maxPredictionIndex = predictions.indexOf(maxPrediction);
        
        for (let i = 0; i < predictions.length; i++) {
            const element = document.getElementById(`prediction-${i}`);
            element.children[0].children[1].style.width = `${predictions[i] * 100}%`;
                
            const topPredictionElement = document.getElementById(`prediction-${maxPredictionIndex}`);
            // chnage bar color to blue
            topPredictionElement.children[0].children[1].style.backgroundColor = "#00f0ff";

            
            const formattedPrediction = predictions.map((prediction) => {
                return prediction.toFixed(3); // Format to 3 decimal places
            });
    
            // Update the array reference with the formatted prediction array
            const formattedPredictionString = '[' + formattedPrediction.join(', ') + ']';
            console.log(formattedPrediction);
            arrayRef_ref.current.textContent = formattedPredictionString;

            element.className =
              predictions[i] === maxPrediction
                ? "prediction-row top-prediction"
                : "prediction-row";
        }

        
    }
}

function erase() {
    // var m = confirm("Want to clear");
    ctx.clearRect(0, 0, w, h);
}



function findxy(res, e) {
    if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res === 'up' || res === "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}
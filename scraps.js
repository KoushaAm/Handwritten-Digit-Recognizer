    // const performInference = async () => {

    //   const sess = new onnx.InferenceSession()

    //   // i learned how to load the model as binary data 
    //   // which is readable by the load model function for the  session
    //   const modelResponse = await fetch(ModelFile);
    //   const modelBuffer = await modelResponse.arrayBuffer();
    //   const modelBytes = new Uint8Array(modelBuffer);

    //   await sess.loadModel(modelBytes);
      
    //   const inputArray = new Float32Array(280 * 280 * 4);
    //   const inputTensor = new onnx.Tensor(inputArray, 'float32', [4 * 280 * 280]);

    //   const outputMap = await sess.run([inputTensor])
    //   const outputTensor = outputMap.values().next().value
    //   console.log(outputTensor.data)
  
    //   setPrediction(outputTensor.data);
  
    // };

    // performInference();    
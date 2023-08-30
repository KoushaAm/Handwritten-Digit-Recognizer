# Handwritten-Digit-Transformer
Handwritten Digit Recognition using React.js and PyTorch

### Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- - [Prerequisites](#prerequisites)
- - [Installation](#installation)
- [Frontend](#frontend)
- - [Project Structure](#project-structure)
- - [Components](#components)
- - [User Interface](#user-interface)
- [Backend](#backend)
- - [Model Architecture](#model-architecture)
- - [Preprocessing](#preprocessing)
- [Deployment](#deployment)
- [License](#license)

### Introduction

Handwritten Digit Recognition is a project that demonstrates how to build a web application for recognizing handwritten digits using React.js and PyTorch. The project utilizes a Convolutional Neural Network (CNN) model architecture for accurate digit recognition. This documentation provides a comprehensive guide on setting up, developing, and deploying the application.

### Getting Started

#### Prerequisites

- Node.js
- Python
- PyTorch
- ONNX.js

#### Installation
1. clone project
2. Navigate to the project directory: `cd handwritten-digit-recognition`
3. Install frontend dependencies: `npm install`
4. Install backend dependencies: `pip install torch onnxjs`

### Frontend

#### Project Structure

Explain the structure of your React.js frontend:

- `src/`: Contains React components and application logic
- `public/`: Holds static assets like HTML and images
- `src/components/`: Contains various React components
- `src/App.js`: Main application entry point

#### Components

Detail the key components in your React frontend:

- `CanvasComponent`: Handles drawing on the canvas
- `PredictionComponent`: Displays prediction results

#### User Interface

Provide screenshots and descriptions of the user interface, including the canvas for drawing digits and the prediction display.

### Backend

#### Model Architecture

- Convolutional layers with ReLU activations
- Dropout layers for regularization
- Fully connected layers for classification

#### Preprocessing

- Data augmentation is used to increase the variety of cases and for better quality of training
  
<img width="564" alt="model_architecture" src="https://github.com/KoushaAm/Handwritten-Digit-Transformer/assets/67440795/2eaa0b15-6ab9-49a7-a2d5-79ac4d815a67">

Input Reshaping and Preprocessing:

The model takes as input a grayscale image of size 280x280 pixels with an alpha channel. Each pixel represents the intensity of the grayscale color.
The alpha channel is extracted from the image, as it represents the drawn portion of the digit.
Normalization and Rescaling:

The alpha channel values are normalized to a range between 0 and 1.
The normalized values are then rescaled to have a mean of 0.1307 and a standard deviation of 0.3081. This standardization helps the model's convergence during training.
Convolutional Layers:

The first convolutional layer (conv1) consists of 32 filters of size 3x3. It performs convolutions on the input to detect simple features like edges and corners.
The ReLU (Rectified Linear Unit) activation function is applied to the output of conv1 to introduce non-linearity.
The output is then fed into the second convolutional layer (conv2), which consists of 64 filters of the same size. This layer captures more complex features.
Max Pooling and Dropout:

After each convolutional layer, max pooling with a window size of 2x2 is applied. This reduces the spatial dimensions and focuses on the most important information.
Dropout is applied after pooling to randomly deactivate 25% of the neurons in the network. This prevents overfitting and improves generalization.
Flattening and Fully Connected Layers:

The flattened output of the second convolutional layer is fed into a fully connected layer (fc1). This layer has 9216 input nodes, representing the flattened feature maps.
ReLU activation is applied again to introduce non-linearity.
Another dropout layer is applied, this time deactivating 50% of the neurons.
Output Layer:

The output of fc1 is fed into the final fully connected layer (fc2), which has 10 output nodes, one for each digit class (0-9).
A softmax activation function is applied to the output of fc2, which converts the raw scores into probabilities. This helps in multi-class classification.
Inference and Prediction:

During inference, the model takes an input image and performs all the aforementioned operations to obtain the probabilities for each digit class.
The digit class with the highest probability is considered the model's prediction for the handwritten digit.

### Deployment

Provide instructions for deploying your application:

- Hosting platforms (e.g., Netlify, Vercel, Heroku)
- Steps to deploy frontend and backend
- Any server setup required


### License
#### MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

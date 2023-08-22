import os
import numpy as np
from PIL import Image
import torch
from inference_model import Net



PATH = "./tests/num3_clean.png"    

# load model 
pytorch_model = Net()
pytorch_model.load_state_dict(torch.load('pytorch_model.pt'))
pytorch_model.eval()

# load image
img = Image.open(PATH)
img = img.resize((280, 280))
img = np.array(img)
img = img.astype(np.float32)

print(img)
print("Image shape after resizing:", img.shape)

# convert to tensor
img_tensor = torch.from_numpy(img)

#normalize the data
MEAN = 0.1307
STD = 0.3081
img_tensor = img_tensor / 255.0
img_tensor = (img_tensor - MEAN) / STD


with torch.no_grad():
    output = pytorch_model(img_tensor.unsqueeze(0))
    print(output)
import torch 
import torch.nn as nn
import torch.nn.functional as F

MEAN = 0.1307
STD = 0.3081

class Net(nn.Module):

    # constructor
    def __init__(self):
        super(Net, self).__init__()
        # 1 channel, 32 outpul channels, 3x3 is kernal size, 1 is stride numbers
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)

        # 25% of neurons 
        # then 50% of neurons 
        self.dropout1 = nn.Dropout2d(0.25) 
        self.dropout2 = nn.Dropout2d(0.5) 

        # when input is compact enough fc layer is used: each node has its own weight
        # 12* 12 * 64 = 9216 is input size
        self.fc1 = nn.Linear(9216, 128)

        # lastly 10 output nodes
        self.fc2 = nn.Linear(128, 10)

    # forward function
    def forward(self, x): 
        # h = 280, w = 280, c = 4 (r, g, b, a)
        # parts draws have alpha of 255 and undrawin are 0
        x = x.reshape(280, 280, 4)

        # get the alpha channel
        x = torch.narrow(x, dim = 2, start = 0, length = 1)

        # shape : bachsize = 1, channel = 1, h = 280, w = 280
        x = x.reshape(1, 1, 280, 280)

        x = F.avg_pool2d(x, 10)
        x = x / 255.0

        # normalize the data
        x = (x - MEAN) / STD

        # 1st conv layer
        x = self.conv1(x)
        # relu activation function: max(0, x)
        x = F.relu(x)

        x = self.conv2(x)
        # max pooling: 2x2 window: get the max into each grid of 2x2 square
        x = F.max_pool2d(x, 2)

        # 25% of neurons are dropped
        x = self.dropout1(x)

        # flatten the data into linear
        x = torch.flatten(x, 1)

        # fully connected layer 9216 is input size
        x = self.fc1(x)

        x = F.relu(x)

        # 50% of neurons are dropped
        x = self.dropout2(x)

        # match to 10 output nodes
        x = self.fc2(x)

        # softmax activation used for multi-class classification
        output = F.softmax(x, dim = 1)

        return output

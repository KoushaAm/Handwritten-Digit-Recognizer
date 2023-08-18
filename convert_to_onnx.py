import torch 
from inference_model import Net


def main(): 
    # initialize the model 
    pytorch_model = Net()
    pytorch_model.load_state_dict(torch.load('pytorch_model.pt'))
    pytorch_model.eval()
    # a dummy tensor that has zeros (dummy values) with the conventional shape of the input
    dummy_input = torch.zeros(280 * 280 * 4)
    torch.onnx.export(pytorch_model, dummy_input, 'onnx_model.onnx', verbose=True)



if __name__ == "__main__":
    main()
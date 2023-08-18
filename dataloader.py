import numpy as np
import torch 
import torchvision
import matplotlib.pyplot as plt


def main(): 
    train_data = torch.utils.data.DataLoader(
        torchvision.datasets.MNIST(
            './data', 
            train=True, 
            download=True, 
            transform=torchvision.transforms.Compose([
                
                # room for data augmentation
                torchvision.transforms.RandomAffine(
                    degrees=30, 
                    translate=(0.5, 0.5), 
                    scale=(0.25, 1),
                    shear=(-30, 30, -30, 30)
                ),

                torchvision.transforms.ToTensor(),
            ])
        ), 
        batch_size=800)
    
    inputs_batch, labels_batch = next(iter(train_data))
    print(inputs_batch.shape)
    print(labels_batch.shape)

    plot = torchvision.utils.make_grid(inputs_batch, nrow=40, padding=1)
    torchvision.utils.save_image(plot, 'data_plot.png')


if __name__ == "__main__":
    main()


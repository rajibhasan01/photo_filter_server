from cgitb import grey
import cv2 as cv;
import os;
import sys;


directory_path = os.getcwd();
pathName = directory_path.replace("python", "uploads");
img = sys.argv[1];
kernel_size = int(sys.argv[2]);
sigma_value = int(sys.argv[3]);

image = cv.imread(f'uploads/image_folder/in_images/{img}');
grey_img = cv.cvtColor(image, cv.COLOR_BGR2GRAY);
invert = cv.bitwise_not(grey_img);
blur = cv.GaussianBlur(invert, (kernel_size,kernel_size), sigma_value);
invertedblur = cv.bitwise_not(blur);
sketch = cv.divide(grey_img, invertedblur, scale=256.0);

cv.imwrite(f'uploads/image_folder/out_images/{img}', sketch);
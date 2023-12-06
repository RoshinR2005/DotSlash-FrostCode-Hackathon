import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load the Teachable Machine model
def load_tm_model(model_path):
    return load_model(model_path)

def process_image_with_opencv(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.3, minNeighbors=5)
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2) 
    return image

def predict_tm_model(model, image):
    resized_image = cv2.resize(image, (224, 224))
    normalized_image = resized_image / 255.0
    input_image = np.expand_dims(normalized_image, axis=0)
    predictions = model.predict(input_image)
    predicted_label = predictions.argmax(axis=1)[0]

    return predicted_label

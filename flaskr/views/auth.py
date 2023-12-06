import os, piexif
from flask import Flask, Blueprint
from .modules.extractGPS import extract_location_from_image

router = Blueprint('auth', __name__, '/auth')

@router.route('/')
def home():
    img_loc = os.path.join(os.getcwd(), 'flaskr/uploads/img.jpg')
    loc = extract_location_from_image(img_loc)
    return f"{loc[0]}  {loc[1]}"

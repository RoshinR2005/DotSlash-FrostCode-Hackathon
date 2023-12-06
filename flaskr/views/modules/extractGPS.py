import piexif
def extract_location_from_image(image_path):
    try:
        exif_data = piexif.load(image_path)
        if 'GPS' in exif_data:
            gps_info = exif_data['GPS']
            if piexif.GPSIFD.GPSLatitude in gps_info and piexif.GPSIFD.GPSLongitude in gps_info:
                latitude = gps_info[piexif.GPSIFD.GPSLatitude]
                longitude = gps_info[piexif.GPSIFD.GPSLongitude]
                
                # Convert GPS coordinates to decimal degrees
                def convert_to_degrees(value):
                    d, m, s = value
                    return d[0] / d[1] + m[0] / (60 * m[1]) + s[0] / (3600 * s[1])

                latitude = convert_to_degrees(latitude)
                longitude = convert_to_degrees(longitude)
                
                return latitude, longitude
    except Exception as e:
        print(f"Error: {e}")
    return "Failed"

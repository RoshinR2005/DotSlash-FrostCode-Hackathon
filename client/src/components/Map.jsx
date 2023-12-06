import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation, setSelectedLocation } from "../store/userSlice";
// test data
const places = [
    {
        name: "College of Engineering Trivandrum",
        coordinates: {
            lat: 8.507639,
            lng: 76.96921,
        },
    },
    {
        name: "University of Kerala Senate House",
        coordinates: {
            lat: 8.506347,
            lng: 76.965156,
        },
    },
    {
        name: "Sree Chitra Thirunal Balarama Varma Government Ayurveda College",
        coordinates: {
            lat: 8.508422,
            lng: 76.968303,
        },
    },
    {
        name: "Kerala Museum",
        coordinates: {
            lat: 8.506132,
            lng: 76.962803,
        },
    },
    {
        name: "Kanakakunnu Palace",
        coordinates: {
            lat: 8.509295,
            lng: 76.967276,
        },
    },
];

const UserMarker = () => {
    const position = useSelector((state) => state.user.currentLocation);
    const dispatch = useDispatch();
    const map = useMap();
    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            const { lat, lng } = e.latlng;
            dispatch(setCurrentLocation({ lat, lng }));
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

const Map = () => {
    const dispatch = useDispatch();

    const markerClick = ({ latlng }) => {
        const { lat, lng } = latlng;
        dispatch(setSelectedLocation(lat, lng));
    };
    return (
        <MapContainer
            center={[8.546116312486738, 76.90638591582582]}
            zoom={18}
            dragging={true}
            className="w-96 h-96 m-1"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxNativeZoom={19}
                maxZoom={50}
            />
            <UserMarker />
            {places.map((place, index) => (
                <Marker
                    key={index}
                    position={[place.coordinates.lat, place.coordinates.lng]}
                    eventHandlers={{ click: (e) => markerClick(e) }}
                >
                    <Popup>{place.name}</Popup>
                </Marker>
            ))}
            <FullscreenControl position="topright" forceSeparateButton={true} />
        </MapContainer>
    );
};

export default Map;

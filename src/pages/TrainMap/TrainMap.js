import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import trainIconImg from "./trainicon.svg";

const mapContainerStyle = {
  width: "100vw",
  height: "400px",
};

// custom train icon
const trainIcon = L.icon({
  iconUrl: trainIconImg,
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon (half of width and height for centering)
  popupAnchor: [0, -40], // Position of the popup relative to the icon
});

const TrainMap = () => {
  const [trainId, setTrainId] = useState("");
  const [location, setLocation] = useState(null);

  const handleInputChange = (e) => {
    setTrainId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trainId) return;

    try {
      const response = await axios.get(`http://localhost:3000/api/trains/location/${trainId}`);
      setLocation(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!location) return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={trainId} 
          onChange={handleInputChange} 
          placeholder="Enter train ID" 
        />
        <button type="submit">Submit</button>
      </form>
      <div>No location data</div>
    </div>
  );

  const stationCoords = [location.coordinates.latitude, location.coordinates.longitude];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={trainId} 
          onChange={handleInputChange} 
          placeholder="Enter train ID" 
        />
        <button type="submit">Submit</button>
      </form>
      <MapContainer center={stationCoords} zoom={10} style={mapContainerStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={stationCoords} icon={trainIcon}>
          <Popup>{`Train ${trainId} is at ${location.trainId}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TrainMap;
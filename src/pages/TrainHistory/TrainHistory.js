import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import trainIconImg from "./trainicon.svg";
import startIconImg from "./trainstart.svg";
import endIconImg from "./trainend.svg";

const mapContainerStyle = {
  width: "100vw",
  height: "400px",
};

const center = [7.8731, 80.7718]; // Sri Lanka center coordinates

// Create custom icons
const trainIcon = L.icon({
  iconUrl: trainIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const startIcon = L.icon({
  iconUrl: startIconImg,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const endIcon = L.icon({
  iconUrl: endIconImg,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const TrainHistory = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        // Fetch history data for trains 1 through 10
        // TODO: Do this using db table
        const trainRequests = Array.from({ length: 10 }, (_, index) =>
          axios.get(`http://localhost:3000/api/trains/location/${index + 1}/history`)
        );
        const responses = await Promise.all(trainRequests);
        setHistories(responses.map(response => response.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistories();
  }, []);

  return (
    <div>
      <h3>Train History Map</h3>
      <MapContainer center={center} zoom={7} style={mapContainerStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {histories.map((history, trainIndex) => {
          // Update positions mapping to use coordinates directly
          const positions = history.map((location) => [
            location.coordinates.latitude,
            location.coordinates.longitude,
          ]);

          return (
            <React.Fragment key={trainIndex}>
              {positions.map((position, index) => {
                if (!position) return null;

                // Determine which icon to use for each marker
                let icon = trainIcon;
                if (index === 0) icon = startIcon; // Starting location
                if (index === positions.length - 1) icon = endIcon; // Ending location

                return (
                  <Marker key={index} position={position} icon={icon}>
                    <Popup>
                      {`Train ${trainIndex + 1}: ${history[index]._id} - ${new Date(history[index].timestamp).toLocaleString()}`}
                    </Popup>
                  </Marker>
                );
              })}

              {/* Draw a polyline connecting the historical positions */}
              {positions.length > 1 && <Polyline positions={positions} color="blue" />}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TrainHistory;
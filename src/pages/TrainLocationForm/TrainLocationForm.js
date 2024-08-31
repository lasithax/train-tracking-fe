import React, { useState } from "react";
import axios from "axios";

const TrainLocationForm = () => {
  const [trainId, setTrainId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/trains/location`, {
        trainId,
        latitude,
        longitude,
      });
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Train ID:
        <input
          type="text"
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude:
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Location</button>
    </form>
  );
};

export default TrainLocationForm;

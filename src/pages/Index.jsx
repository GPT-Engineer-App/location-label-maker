import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import LocationForm from "../components/LocationForm";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Index = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewLocation(e.latlng);
      },
    });
    return null;
  };

  const handleLocationSubmit = (name) => {
    setLocations([...locations, { ...newLocation, name }]);
    setNewLocation(null);
  };

  const handleCancel = () => {
    setNewLocation(null);
  };

  return (
    <Box height="100vh" width="100vw">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} draggable={true}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {newLocation && (
        <LocationForm onSubmit={handleLocationSubmit} onCancel={handleCancel} />
      )}
    </Box>
  );
};

export default Index;
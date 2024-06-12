import React, { useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";

const LocationForm = ({ onSubmit, onCancel }) => {
  const [locationName, setLocationName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(locationName);
  };

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      zIndex={1000}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LocationForm;
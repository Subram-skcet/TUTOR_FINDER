import React, { useEffect, useState } from "react";
import './AMapSample.css'
// import TuitionMap from "../../StudentSide";

const MapComponent = ({setLatLng,onClose}) => {
  const [map, setMap] = useState(null); // State to store the map instance
  const [markers, setMarkers] = useState([]); // State to store all markers
  const [markerLocation, setMarkerLocation] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        if (window.google) {
          const { Map } = await window.google.maps.importLibrary("maps");
          const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

          // Initialize the map
          const mapInstance = new Map(document.getElementById("map"), {
            center: { lat: 9.9261153, lng: 78.1140983 },
            zoom: 9,
            mapId: "YOUR_MAP_ID_HERE", // Replace with a valid Map ID
          });

          setMap(mapInstance); // Set the map instance in state

          // Add a click event listener to the map
          mapInstance.addListener("click", (e) => {
            const clickedPosition = e.latLng;

            // Create a new AdvancedMarkerElement at the clicked position
            const newMarker = new AdvancedMarkerElement({
              position: clickedPosition,
              map: mapInstance,
              title: "Clicked Location",
            });

            // Add the new marker to the state (to keep track of all markers)
            setMarkers((prevMarkers) => {
              // Remove the previous marker if it exists
              prevMarkers.forEach((marker) => (marker.map = null));
              return [newMarker]; // Keep only the new marker
            });

            setMarkerLocation({
              lat: clickedPosition.lat(),
              lng: clickedPosition.lng(),
            });
          });
        } else {
          console.error("Google Maps API is not loaded yet.");
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };

    initMap();
  }, []);

  useEffect(()=>{
    if(markerLocation){
      console.log(markerLocation.lat, markerLocation.lng);
    }
    
  },[markerLocation])
  
  const handleAddClick = () =>{
    if(!markerLocation){
      alert("Choose any location to add")
      return
    }
    setLatLng(markerLocation.lat,markerLocation.lng)
    onClose()
  }

  return (

    <>

    <div className="map-wrapper">
       <div id="map"></div>
       <button onClick={handleAddClick}>
        Add
       </button>

    </div>
    
    {/* <TuitionMap lat={20.5937} lng={78.9629} />; */}
    </>


  );
};

export default MapComponent;

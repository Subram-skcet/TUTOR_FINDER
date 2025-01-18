import React, { useEffect, useState } from "react";
import './AMapSample.css'
import { toast } from "react-toastify";
import axios from "axios";
import { useDataLayerValue } from "../../StateProviders/StateProvider";


const MapComponent = ({setLatLng,onClose}) => {
   // eslint-disable-next-line
  const [markers, setMarkers] = useState([]); // State to store all markers
  const [markerLocation, setMarkerLocation] = useState(null);
  const [{asTeacher},] = useDataLayerValue()

  
  
  useEffect(() => {

    const getLatLng = async () => {
      try {
        const resp_1 = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${asTeacher.district},${asTeacher.state},India&format=json`
        );
    
        // Check if the response contains data and has at least one result
        if (resp_1.data.length !== 0) {
          return {
            lat: Number(resp_1.data[0].lat),
            lng: Number(resp_1.data[0].lon),
          };
        }
    
        const resp_2 = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${asTeacher.state},India&format=json`
        );
    
        if (resp_2.data.length !== 0) {
          return {
            lat: Number(resp_2.data[0].lat),
            lng: Number(resp_2.data[0].lon),
          };
        }
    
        // Default coordinates
        return { lat: 22.3511148, lng: 78.6677428 };
      } catch (error) {
        console.error("Error fetching data:", error);
        return { lat: 22.3511148, lng: 78.6677428 }; // Return default in case of error
      }
    };

    const initMap = async () => {
      try {
        if (window.google) {
          const { Map } = await window.google.maps.importLibrary("maps");
          const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

          const center = await getLatLng();

          // Initialize the map
          const mapInstance = new Map(document.getElementById("map"), {
            center, // Use the awaited center coordinates
            zoom: 9.5,
            mapId: "MAP_ID_HERE", // Replace with a valid Map ID
          });


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
  }, [asTeacher.district,asTeacher.state]);

  
  const handleAddClick = () =>{
    if(!markerLocation){
      toast.info("Choose any location to add")
      return
    }
    setLatLng(markerLocation.lat,markerLocation.lng)
    onClose()
  }

  return (

    <>

    <div className="map-wrapper">
       <div id="map"></div>
       <button style={{padding:'5px 10px',borderRadius:'5px',fontSize:'16px',backgroundColor:'green',color:'white',border:'none', boxShadow:'0px 0px 3px 0.5px black'}} className="lato-bold" onClick={handleAddClick}>
        Add
       </button>

    </div>
    </>


  );
};

export default MapComponent;

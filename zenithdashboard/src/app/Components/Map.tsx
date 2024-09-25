"use client";

import React, { useEffect, useState } from 'react';
import { useGetPerformance } from '../hooks/useGetPerfomaces';

const Map = () => {
  const { performanceData, loading, error } = useGetPerformance(); // Fetch performance data using the custom hook
  const [searchQuery, setSearchQuery] = useState(''); // State to handle the search query
  const [mapInstance, setMapInstance] = useState(null); // State to store the Google Maps instance

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBBYsZVdFOBv3is6gNS3SbHr_xWY4pkpV8`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.google && window.google.maps) {
            initMap();
          }
        };
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map element not found');
        return;
      }

      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 1.2921, lng: 36.8219 }, 
        zoom: 8,
      });

      setMapInstance(map); 

      
      addMarkers(map, performanceData);
    };

    loadGoogleMapsScript();
  }, [performanceData]);

  const addMarkers = (map, data) => {
    if (data && data.length > 0) {
      data.forEach((item) => {
        if (item.latitude !== undefined && item.longitude !== undefined) {
          const iconUrl =
            item.status === 'Active'
              ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

          new window.google.maps.Marker({
            position: { lat: item.latitude, lng: item.longitude },
            map: map,
            title: `Sensor: ${item.system_performance} (Status: ${item.status})`,
            icon: {
              url: iconUrl,
            },
          });
        }
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    if (!mapInstance) return;

    mapInstance.clearOverlays = function () {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    };

    mapInstance.clearOverlays();
    const filteredData = performanceData.filter((item) =>
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    addMarkers(mapInstance, filteredData);
  };

  if (loading) {
    return <div>Loading map data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by address or status..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown} 
          style={{
            padding: '10px',
            width: '50%',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      
      <div id="map" style={{ height: '430px', width: '80%', marginLeft: '160px', marginTop: '20px' }}></div>
    </div>
  );
};

export default Map;

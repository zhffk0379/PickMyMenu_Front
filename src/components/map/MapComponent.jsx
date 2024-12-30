import React, { useEffect, useRef } from "react";

const MapComponent = ({ center = { lat: 37.5665, lng: 126.9780 }, zoom = 10, places = [] }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.naver && mapElement.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom,
      };
      new window.naver.maps.Map(mapElement.current, mapOptions);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (mapRef.current && places.length > 0) {
      places.forEach((place) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.y, place.x),
          map: mapRef.current
        })

        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:10px;">${place.title}</div>`,
        });

        window.naver.maps.Event.addlistner(marker, "click", () => {
          infoWindow.open(mapRef.current, marker);
        });
      });
    }
  }, [places]);

  return (
    <div
      ref={mapElement}
      style={{ width: "100%", height: "500px", marginTop: "20px" }}
    ></div>
  );
};

export default MapComponent;

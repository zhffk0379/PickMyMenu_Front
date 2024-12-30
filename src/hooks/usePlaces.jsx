import { useState, useEffect } from 'react';
import { placeSearchService } from '../services/map/PlaceSearchService';

const usePlaces = (location) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlaces = async () => {
      if (!location) return;

      try {
        const data = await placeSearchService("감자탕", location.latitude, location.longitude);
        setPlaces(data.data.documents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [location]);

  return { places, loading, error };
};

export default usePlaces;

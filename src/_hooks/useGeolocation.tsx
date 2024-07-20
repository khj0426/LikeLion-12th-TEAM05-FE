import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>({
    latitude: 37.566826,
    longitude: 126.9786567,
  });

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      return;
    }
    geolocation.getCurrentPosition(handleSuccess);
  }, []);

  return { location };
};

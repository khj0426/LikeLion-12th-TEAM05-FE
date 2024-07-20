import NoData from '../../../public/noData.svg?react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Input } from '@/_components/input';
import { useGeolocation } from '@/_hooks';
import { createMap } from '@/_utils';
import { Button } from '@/_components/button';

declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationSearchProps {
  onSelectLocation: () => void;
  lat?: number;
  lng?: number;
}

interface PlaceData {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export const LocationSearch = ({
  onSelectLocation,
  lat = 37.566826,
  lng = 126.9786567,
}: LocationSearchProps) => {
  const { location } = useGeolocation(); // location 추가
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [query, setQuery] = useState('');
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const locationMapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (locationMapRef.current) {
      const newKakaoMap = createMap({
        pos: {
          coords: {
            latitude: location?.latitude ?? lat,
            longitude: location?.longitude ?? lng,
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
        },
        container: locationMapRef.current,
      });
      setMap(newKakaoMap);
    }
  }, [locationMapRef, lat, lng, location]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(query, (data: PlaceData[]) => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      setPlaces(data);

      const newMarkers: SetStateAction<any[]> = [];
      const bounds = new window.kakao.maps.LatLngBounds();

      data.forEach((eachData, index) => {
        const position = new window.kakao.maps.LatLng(eachData.y, eachData.x);
        const marker = addMarker(position, eachData.place_name, index);
        newMarkers.push(marker);
        bounds.extend(position);
      });

      setMarkers(newMarkers);
      map.setBounds(bounds);
    });
  }, [query, map]);

  const addMarker = (position: any, title: string, index: number) => {
    const marker = new window.kakao.maps.Marker({
      position,
      image: new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        new window.kakao.maps.Size(36, 36),
        {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10),
          offset: new window.kakao.maps.Point(13, 37),
        }
      ),
    });

    marker.setMap(map);

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${title}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });

    return marker;
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <div className="flex justify-center gap-[25px]">
        <div
          ref={locationMapRef}
          style={{
            marginLeft: '25px',
            width: '70%',
            height: '500px',
          }}
        />

        <div
          className="bg-WHITE min-h-[200px]
          max-h-[350px] overflow-scroll min-w-[320px] text-LIGHT_STATE"
          style={{ marginBottom: '5px' }}
        >
          <div>
            <p className="font-bold  flex justify-center text-2xl bg-[#EFEFFD] dark:bg-ONYX text-[#4B4DED] dark:text-WHITE">
              산책로 추가/제거
            </p>
            {Array.isArray(places) && places.length > 0 ? (
              places.map((eachPlace) => (
                <div
                  key={eachPlace.id}
                  style={{ marginBottom: '5px' }}
                  className="text-LIGHT_SLATE"
                >
                  <div className="flex align-center justify-between">
                    <div className="max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                      <strong>{eachPlace.place_name}</strong>
                      <p>{eachPlace.address_name}</p>
                    </div>

                    <Button variant={'register'} size="xs">
                      선택
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <NoData
                style={{
                  marginTop: '25px',
                }}
                width={250}
                height={270}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

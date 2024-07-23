import NoData from '../../../public/noData.svg?react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useGeolocation } from '@/_hooks';
import { createMap } from '@/_utils';
import { Button } from '@/_components/button';
import { Input } from '@/_components/input';
import { createSwalInput } from '@/_utils';
import { Pagination } from 'flowbite-react';

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

interface Pagination {
  current: number;
  first: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (_nextPage: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
  totalCount: number;
}

interface Location {
  name: string;
  address: string;
  description: string;
}

export const LocationSearch = ({
  onSelectLocation,
  lat = 37.566826,
  lng = 126.9786567,
}: LocationSearchProps) => {
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const { location } = useGeolocation(); // location 추가
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [query, setQuery] = useState('');
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const locationMapRef = useRef<HTMLDivElement | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

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
    ps.keywordSearch(query, (data: PlaceData[], _: any, pagination: any) => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      setPlaces(data);
      setPagination(pagination);

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
      content: `<div style="padding:5px;color:'black';">${title}</div>`,
      removable: true,
    });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });

    return marker;
  };

  const handleSelectLocation = (location: PlaceData) => {
    setMarkers([]);
    const position = new window.kakao.maps.LatLng(location.y, location.x);
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    const marker = new window.kakao.maps.Marker({
      position,
    });

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="
          display:flex;
          flex-direction:column;
          color: rgba(0, 0, 0, 0.7);
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
          text-align: center;">
          ${location.place_name}
          <p>${location.category_name}</p>
        </div>
      `,
      position,
      removable: true,
    });

    infoWindow.open(map, marker);
    map.setLevel(1);
    marker.setMap(map);
    map.setCenter(position);
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Input
        placeholder="장소는 최대 3개까지 선택 가능합니다.구체적인 장소를 입력해주세요: 예)일산호수공원"
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
            <p className="font-bold  flex justify-center text-2xl bg-[#EFEFFD] dark:bg-ONYX text-[#4B4DED] dark:text-WHITE p-2">
              산책로 추가/제거
            </p>
            {Array.isArray(places) && places.length > 0 ? (
              places.map((eachPlace, index) => (
                <div
                  key={eachPlace.id}
                  style={{ marginBottom: '5px' }}
                  className="text-LIGHT_SLATE"
                >
                  <div className="flex align-center justify-between">
                    <div className="max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                      <strong>{`[${index + 1}] ${
                        eachPlace.place_name
                      }`}</strong>
                      <p>{eachPlace.address_name}</p>
                    </div>

                    <Button
                      variant={'register'}
                      size="xs"
                      onClick={() => {
                        handleSelectLocation(eachPlace);
                        createSwalInput(
                          '장소 설명',
                          '',
                          '장소에 대해 설명을 적어주세요'
                        ).then((val) => {
                          setSelectedLocations([
                            ...selectedLocations,
                            {
                              name: eachPlace.place_name,
                              description: val,
                              address: eachPlace.road_address_name,
                            },
                          ]);
                        });
                      }}
                    >
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

          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              layout="navigation"
              currentPage={pagination?.current ?? 1}
              color="#4B4DED"
              totalPages={45}
              onPageChange={(page) => pagination?.gotoPage(page)}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

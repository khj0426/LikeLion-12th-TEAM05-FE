import NoData from '../../../public/noData.svg?react'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { useGeolocation } from '@/_hooks'
import { createMap, createSwalInput } from '@/_utils'
import { Button } from '@/_components/button'
import { Input } from '@/_components/input'
import { useNavigate } from '@tanstack/react-router'
import { Pagination } from 'flowbite-react'
import { usePostCurationLocation } from '@/_hooks/mutation'
import Swal from 'sweetalert2'

interface Location {
  name: string
  address: string
  description: string
  locationImage?: string | Uint8Array | File
}

declare global {
  interface Window {
    kakao: any
  }
}

interface LocationSearchProps {
  onSelectLocation: (locations: Location[]) => void
  lat?: number
  lng?: number
}

interface PlaceData {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: number
  y: number
}

interface Pagination {
  current: number
  first: number
  gotoFirst: () => void
  gotoLast: () => void
  gotoPage: (_nextPage: number) => void
  hasNextPage: boolean
  hasPrevPage: boolean
  perPage: number
  totalCount: number
}

export const LocationSearch = ({
  lat = 37.566826,
  lng = 126.9786567,
}: LocationSearchProps) => {
  const navigate = useNavigate()
  const { mutate } = usePostCurationLocation()
  const curationId = Number(new URLSearchParams(window.location.href).get('id'))
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([])
  const { location } = useGeolocation() // location 추가
  const [places, setPlaces] = useState<PlaceData[]>([])
  const [query, setQuery] = useState('')
  const [map, setMap] = useState<any>()
  const [markers, setMarkers] = useState<any[]>([])
  const locationMapRef = useRef<HTMLDivElement | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  console.log(selectedLocations)
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
      })
      setMap(newKakaoMap)
    }
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }

    setMarkers([])
    const ps = new window.kakao.maps.services.Places()
    ps.keywordSearch(query, (data: PlaceData[], _: any, pagination: any) => {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
      setPlaces(data)
      setPagination(pagination)

      const newMarkers: SetStateAction<any[]> = []
      const bounds = new window.kakao.maps.LatLngBounds()

      data.forEach((eachData, index) => {
        const position = new window.kakao.maps.LatLng(eachData.y, eachData.x)
        const marker = addMarker(position, eachData.place_name, index)
        newMarkers.push(marker)
        bounds.extend(position)
      })

      setMarkers(newMarkers)
      map.setBounds(bounds)
    })
  }, [query])

  const addMarker = (position: any, _title: string, index: number) => {
    const marker = new window.kakao.maps.Marker({
      position,
      image: new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        new window.kakao.maps.Size(36, 36),
        {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10),
          offset: new window.kakao.maps.Point(13, 37),
        },
      ),
    })

    marker.setMap(map)

    return marker
  }

  const handleSelectLocation = (location: PlaceData) => {
    setMarkers([])
    const position = new window.kakao.maps.LatLng(location.y, location.x)
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
    })

    markers.forEach((marker) => {
      marker.setMap(null)
    })
    const marker = new window.kakao.maps.Marker({
      position,
    })

    window.kakao.maps.event.addListener(marker, 'click', function () {
      Swal.fire({
        title: '장소를 제거하시겠습니까?',
        icon: 'question',
      }).then(() => {
        marker.setMap(null)
        infoWindow.close()
        setSelectedLocations(
          selectedLocations.filter(
            (selectedLocation) => selectedLocation.name !== location.place_name,
          ),
        )
      })
    })

    infoWindow.open(map, marker)
    map.setLevel(1)
    marker.setMap(map)
    map.setCenter(position)
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Input
        placeholder="구체적인 장소를 입력해주세요: 예)일산호수공원"
        onChange={(e) => {
          setQuery(e.target.value)
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
          <div className="">
            <p className="font-bold  flex justify-center text-2xl bg-[#EFEFFD] dark:bg-ONYX text-[#4B4DED] dark:text-WHITE p-2">
              산책로 추가/제거
            </p>
            {Array.isArray(places) && places.length > 0 ? (
              places.map((eachPlace, index) => (
                <div
                  key={eachPlace.id}
                  style={{ marginBottom: '5px' }}
                  className="text-LIGHT_SLATE border-b border-[#8C8CA1] line-clamp-2 w-300px"
                >
                  <div className="flex align-center justify-between">
                    <div className="overflow-hidden  line-clamp-2 w-[200px]">
                      <strong>{`[${index + 1}] ${
                        eachPlace.place_name
                      }`}</strong>
                      <p>{eachPlace.address_name}</p>
                    </div>

                    <Button
                      variant={'register'}
                      size="xs"
                      onClick={() => {
                        handleSelectLocation(eachPlace)
                        createSwalInput(
                          '장소 설명',
                          '',
                          '장소에 대해 설명을 적어주세요',
                        ).then((val) => {
                          console.log(val)
                          setSelectedLocations([
                            ...selectedLocations,
                            {
                              name: eachPlace.place_name,
                              description: val?.value ?? '',
                              address: eachPlace.road_address_name,
                              locationImage: val?.image,
                            },
                          ])
                        })
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
        <div
          className="bg-WHITE min-h-[200px] 
          max-h-[350px] overflow-scroll min-w-[300px] text-LIGHT_STATE"
          style={{ marginBottom: '5px' }}
        >
          <div className="">
            <p className="font-bold  flex justify-center text-2xl bg-[#EFEFFD] dark:bg-ONYX text-[#4B4DED] dark:text-WHITE p-2">
              내가 고른 산책로
            </p>
            {selectedLocations.map((location, index) => (
              <div
                key={location.name}
                style={{ marginBottom: '5px' }}
                className="text-LIGHT_SLATE border-b border-[#8C8CA1] line-clamp-2 w-300px"
              >
                <div className="flex align-center justify-between ">
                  <div className="overflow-hidden  line-clamp-2 w-[200px]">
                    <strong>{`[${index + 1}] ${location.name}`}</strong>
                    <p>{location.address}</p>
                  </div>

                  <Button
                    variant={'register'}
                    onClick={() =>
                      setSelectedLocations(
                        selectedLocations.filter(
                          (l) => location.name !== l.name,
                        ),
                      )
                    }
                  >
                    제거
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          if (selectedLocations.length < 1) {
            Swal.fire({
              icon: 'error',
              title: '장소를 1개 이상 선택해주세요',
            })
            return
          }

          const parseSelectedLocations = selectedLocations
            .filter((location) => location.name)
            .map((location) => location.name)
            .join(', ')

          Swal.fire({
            title: '선택된 장소',
            text: parseSelectedLocations,
            showCancelButton: true,
            confirmButtonText: '큐레이션 생성하기',
            cancelButtonText: '취소하기',
          }).then((res) => {
            if (res.isConfirmed) {
              selectedLocations.forEach(
                ({ name, description, locationImage, address }) => {
                  mutate(
                    {
                      name,
                      description,
                      address,
                      locationImage: locationImage as string,
                      curationId,
                    },
                    {
                      onSuccess: () => {
                        Swal.fire('큐레이션이 생성되었어요!')
                        navigate({
                          to: '/',
                          resetScroll: true,
                        })
                      },
                    },
                  )
                },
              )
            }
          })
        }}
        size="md"
        shape="circular"
        variant={'primary'}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      >
        +
      </Button>
    </div>
  )
}

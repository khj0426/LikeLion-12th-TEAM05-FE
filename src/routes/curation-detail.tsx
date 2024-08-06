import { useEffect, useRef, useState, useContext } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  useCurationDetailInfo,
  getCurationDetail,
  useGetComments,
} from '@/_hooks/query'
import { createMap } from '@/_utils'
import { UserContext } from '@/_context/userInfoContext'
import { useCreateComment } from '@/_hooks/mutation'
import { Button, Input } from '@/_components'
import { Modal } from 'flowbite-react'
import Swal from 'sweetalert2'

//TODO - 장소 LatLng넘길수 있게 수정

export const Route = createFileRoute('/curation-detail')({
  loader: async () => {
    const id = Number(window.location.href.split('id=')[1])
    const getCurationDetailRes = await getCurationDetail({
      curationId: id + '',
    })

    return { initalData: getCurationDetailRes, cutaionId: id }
  },
  component: () => {
    const locationMapRef = useRef<HTMLDivElement | null>(null)
    const data = Route.useLoaderData()
    const { data: curationInfo } = useCurationDetailInfo({
      curationId: data.cutaionId + '',
      initCurationInfo: data.initalData,
    })
    const [selectedLocation, setSelectedLocation] = useState<{
      locationName: string
      locationAddress: string
      latitude: number
      longitude: number
    }>({
      locationName: '',
      locationAddress: '',
      latitude: 0,
      longitude: 0,
    })
    const { name } = useContext(UserContext)
    const [_map, setMap] = useState<any>()
    const [comment, setComment] = useState('')
    const { mutate: createComment } = useCreateComment()
    const { data: comments, refetch: refetchComments } = useGetComments({
      curationId: curationInfo?.id + '',
    })

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
      if (!_map || !selectedLocation.latitude || !selectedLocation.longitude)
        return

      const markerPosition = new window.kakao.maps.LatLng(
        selectedLocation.longitude,
        selectedLocation.latitude,
      )

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: new window.kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
          new window.kakao.maps.Size(36, 36),
          {
            spriteSize: new window.kakao.maps.Size(36, 691),
            offset: new window.kakao.maps.Point(13, 37),
          },
        ),
      })
      marker.setMap(_map)
      _map.panTo(markerPosition)
      _map.setLevel(3)
      return () => {
        marker.setMap(null) // 마커를 지우는 것이 좋습니다.
      }
    }, [selectedLocation, _map, locationMapRef.current]) // 의존성 변경

    useEffect(() => {
      const newKakaoMap = createMap({
        pos: {
          coords: {
            latitude: 37.5642135,
            longitude: 127.0016985,
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
        },
        level: 12,
        container: locationMapRef.current as HTMLDivElement,
      })

      if (locationMapRef.current) {
        setMap(() => newKakaoMap)
      }

      const bounds = new window.kakao.maps.LatLngBounds()
      curationInfo?.locations?.forEach((location) => {
        const markerPosition = new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        )

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(_map)
        bounds.extend(markerPosition)
      })
    }, [data.cutaionId])

    return (
      <section className="m-5 p-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{data.initalData?.name}</h2>
        <h4 className="text-lg mb-4">{data.initalData?.content}</h4>
        <p className="mb-4">
          {curationInfo?.locations?.length}개의 장소를 찾았어요!😍
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-around">
          <div
            ref={locationMapRef}
            className="w-full md:w-[500px] h-[300px] border border-gray-400 rounded-lg mb-4"
          />
          <div className="flex flex-col gap-4 max-h-[600px]">
            {curationInfo?.locations?.map((location, index) => (
              <div
                key={index}
                className="p-3 cursor-pointer"
                onClick={() => {
                  setOpenModal(!openModal)
                  setSelectedLocation({
                    locationAddress: location.address ?? '',
                    locationName: location.name ?? '',
                    latitude: location.latitude ?? 0,
                    longitude: location.longitude ?? 0,
                  })
                }}
              >
                {location.locationImage && (
                  <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Body className="bg-white w-auto h-auto">
                      <div>
                        <img
                          onClick={() => setOpenModal(false)}
                          src={location.locationImage}
                          alt="선택한 장소"
                          className="w-full h-auto rounded-lg mb-2"
                        />
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
                <strong>{`[${index + 1}] ${location.name}`}</strong>
                {location.address && <p>위치🍏: {location.address}</p>}
                {location.description && <p>설명 🍏: {location.description}</p>}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-scroll">
            {name && (
              <div className="sticky top-0 z-10 bg-white rounded-lg p-4 mb-2 shadow">
                <Input
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 입력해주세요"
                />
                <Button
                  size="xs"
                  variant={'primary'}
                  onClick={() => {
                    createComment(
                      {
                        comment: comment,
                        curationId: curationInfo?.id + '',
                      },
                      {
                        onSuccess: () => {
                          Swal.fire('댓글을 작성했어요!')
                          refetchComments()
                        },
                      },
                    )
                  }}
                >
                  저장
                </Button>
              </div>
            )}
            <div className="flex-grow" />
            {comments?.map(({ comment }, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex justify-between mb-2 line-clamp-2 w-[320px]">
                  <span className="text-gray-500 text-sm">{comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  },
})

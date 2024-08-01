import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useCurationDetailInfo, getCurationDetail } from '@/_hooks/query'
import { createMap } from '@/_utils'

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
    const [_map, setMap] = useState<any>()

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
        container: locationMapRef.current as HTMLDivElement,
      })

      if (locationMapRef.current) {
        setMap(newKakaoMap)
      }

      const bounds = new window.kakao.maps.LatLngBounds()
      data.initalData?.locations?.forEach((location) => {
        const marker = new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        )
        marker.setMap(newKakaoMap)
        bounds.extend(
          new window.kakao.maps.LatLng(location.latitude, location.longitude),
        )
      })
    }, [])

    return (
      <section className="m-5 p-4 ">
        <h2 className="text-2xl font-bold mb-2">{data.initalData?.name}</h2>
        <h4 className="text-lg mb-4">{data.initalData?.content}</h4>
        <p>{curationInfo?.locations?.length}개의 장소를 찾았어요!😍</p>
        <div
          ref={locationMapRef}
          className="w-[300px] h-[300px] border border-gray-400 rounded-lg"
        />
      </section>
    )
  },
})

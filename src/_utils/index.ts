import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { ChangeEvent } from 'react'
import Swal from 'sweetalert2'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

type CreateMapProps = {
  pos: Pick<GeolocationPosition, 'coords'>
  container: HTMLElement
}

export function createMap({ pos, container }: CreateMapProps) {
  const $latitude = pos?.coords?.latitude
  const $longitude = pos?.coords?.longitude

  const $mapOptions = {
    center: new window.kakao.maps.LatLng($latitude, $longitude),
    draggable: true,
    scrollwheel: true,
    keyboardShortcuts: true,
  }

  return new window.kakao.maps.Map(container, $mapOptions)
}

export function createSwalInput(
  title: string,
  inputLabel: string,
  inputPlaceholder: string,
) {
  return Swal.fire({
    title: title,
    input: 'text',
    inputLabel: inputLabel,
    inputPlaceholder: inputPlaceholder,
    showCancelButton: true,
    confirmButtonText: '제출',
    cancelButtonText: '취소',
    html: `<input type = "file" id ="image" accept = "image/png ,image/jpeg" /><img id = "thumbnail" src = "" width = {150} height = {150}
    style = {{object-fit:cover}}
    />`,
  }).then((result) => {
    const reader = new FileReader()
    const imageData = document.getElementById('image') as HTMLInputElement
    const imageEL = document.getElementById('thumbnail') as HTMLImageElement
    const file = imageData?.files && imageData?.files[0]

    console.log(file, imageData, reader)
    reader.onload = (e) => {
      console.log(e)
      imageEL.src = e.target?.result as string
    }
    if (file) {
      reader.readAsDataURL(file)
    }

    if (result.isConfirmed) {
      return { value: result.value, image: reader.result as string }
    }
    return null // 취소된 경우 null 반환
  })
}

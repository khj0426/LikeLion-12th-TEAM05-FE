import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import Swal from 'sweetalert2'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

type CreateMapProps = {
  pos: Pick<GeolocationPosition, 'coords'>
  container: HTMLElement
  level?: number
}

export function createMap({ pos, container, level }: CreateMapProps) {
  const $latitude = pos?.coords?.latitude
  const $longitude = pos?.coords?.longitude

  const $mapOptions = {
    center: new window.kakao.maps.LatLng($latitude, $longitude),
    draggable: true,
    scrollwheel: true,
    keyboardShortcuts: true,
    level,
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
    html: `
      <input type="file" id="image" accept="image/png, image/jpeg" />
      <img id="thumbnail" src="" width="150" height="150" style="object-fit:cover; display:none;" />
    `,
  }).then((result) => {
    const imageData = document.getElementById('image') as HTMLInputElement
    const imageEL = document.getElementById('thumbnail') as HTMLImageElement
    const file = imageData?.files && imageData.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imageEL.src = e.target?.result as string
        imageEL.style.display = 'block' // 미리보기 이미지 표시
      }
      reader.readAsDataURL(file)
    }

    if (result.isConfirmed) {
      return new Promise<{ value: string; image?: File }>((resolve) => {
        if (file) {
          const reader = new FileReader()
          reader.onload = async () => {
            resolve({
              value: result.value as string,
              image: file,
            })
          }
          reader.readAsDataURL(file)
        } else {
          resolve({ value: result.value as string })
        }
      })
    }

    return null
  })
}

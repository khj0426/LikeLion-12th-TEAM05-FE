import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

type CreateMapProps = {
  pos: Pick<GeolocationPosition, 'coords'>;
  container: HTMLElement;
};

export function createMap({ pos, container }: CreateMapProps) {
  const $latitude = pos?.coords?.latitude;
  const $longitude = pos?.coords?.longitude;

  const $mapOptions = {
    center: new window.kakao.maps.LatLng($latitude, $longitude),
    draggable: true,
    scrollwheel: true,
    keyboardShortcuts: true,
  };

  return new window.kakao.maps.Map(container, $mapOptions);
}

export function createSwalInput(
  title: string,
  inputLabel: string,
  inputPlaceholder: string
) {
  return Swal.fire({
    title: title,
    input: 'text',
    inputLabel: inputLabel,
    inputPlaceholder: inputPlaceholder,
    showCancelButton: true,
    confirmButtonText: '제출',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      return result.value; // 입력된 값을 반환
    }
    return null; // 취소된 경우 null 반환
  });
}

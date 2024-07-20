
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
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
    level: 3,
    draggable: true,
    scrollwheel: true,
    keyboardShortcuts: true,
  };

  return new window.kakao.maps.Map(container, $mapOptions);
}

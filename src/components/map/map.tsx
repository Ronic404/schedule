import React, { ReactElement, FC } from 'react';
import {
  YMaps, Map, FullscreenControl, TypeSelector, ZoomControl, Placemark,
} from 'react-yandex-maps';
import styles from './map.module.css';

interface IProps {
  latitude: number
  longitude: number
}

const MapRonic: FC<IProps> = ({ latitude, longitude }: IProps): ReactElement => {
  const coordinates = [latitude, longitude];
  const textBaloon = 'А может лучше дома посидеть? ;)';
  console.log(coordinates);
  return (
    <>
      <YMaps>
        <Map
          className={styles.map}
          defaultState={{
            center: coordinates,
            zoom: 9,
          }}
        >
          <FullscreenControl />
          <TypeSelector options={{ float: 'right' }} />
          <ZoomControl options={{ float: 'right' }} />
          <Placemark
            modules={['geoObject.addon.balloon']}
            geometry={coordinates}
            properties={{
              iconContent: 'Тебе сюда!',
              balloonContentBody: textBaloon,
            }}
            options={{
              preset: 'islands#blueStretchyIcon',
            }}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default MapRonic;

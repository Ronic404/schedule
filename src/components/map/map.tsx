import React, { ReactElement, FC } from 'react';
import {
  YMaps, Map, FullscreenControl, TypeSelector, ZoomControl, Placemark,
} from 'react-yandex-maps';
import styles from './map.module.css';

const MapRonic: FC = (): ReactElement => {
  const place = [55.75, 37.57];
  const textBaloon = 'А может лучше дома посидеть? ;)';
  return (
    <>
      <YMaps>
        <Map
          className={styles.map}
          defaultState={{
            center: place,
            zoom: 9,
          }}
        >
          <FullscreenControl />
          <TypeSelector options={{ float: 'right' }} />
          <ZoomControl options={{ float: 'right' }} />
          <Placemark
            modules={['geoObject.addon.balloon']}
            geometry={[55.684758, 37.738521]}
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

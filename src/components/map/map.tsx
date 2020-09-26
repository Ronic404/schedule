import React, { ReactElement, FC, useState } from 'react';
import {
  YMaps, Map, FullscreenControl, TypeSelector, ZoomControl, Placemark,
} from 'react-yandex-maps';
import { Spin } from 'antd';
import styles from './map.module.css';

interface IProps {
  latitude: number
  longitude: number
}

const MapRonic: FC<IProps> = ({ latitude, longitude }: IProps): ReactElement => {
  const coordinates = [latitude, longitude];
  const textBaloon = 'А может лучше дома посидеть? ;)';
  const [showLoad, setShowLoad] = useState<boolean>(true);

  if (showLoad) {
    setTimeout(() => setShowLoad(false), 2000);
    return <Spin className={styles.spin} tip="Loading..." />;
  }

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

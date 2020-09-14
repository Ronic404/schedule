import React, { FC, ReactElement } from 'react';
import styles from './organizer-cell.module.css';

interface OrganizerCellProps {
    name: string
}

const OrganizerCell: FC<OrganizerCellProps> = (props: OrganizerCellProps): ReactElement => {
  const { name } = props;
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`https://github.com/${name}.png?size=38`} alt="" />
      <a href={`https://github.com/${name}`}>{name}</a>
    </div>
  );
};

export default OrganizerCell;

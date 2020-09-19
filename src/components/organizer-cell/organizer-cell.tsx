import React, { FC, ReactElement } from 'react';
import styles from './organizer-cell.module.css';

interface OrganizerCellProps {
    name: string
}

const OrganizerCell: FC<OrganizerCellProps> = (props: OrganizerCellProps): ReactElement => {
  const { name } = props;
  return (
    <div className={styles.container}>
      <img className={styles.img} width="38" height="38" src={`https://github.com/${name}.png?size=38`} alt={name} />
      <a href={`https://github.com/${name}`} target="_blank" rel="noopener noreferrer">{name}</a>
    </div>
  );
};

export default OrganizerCell;

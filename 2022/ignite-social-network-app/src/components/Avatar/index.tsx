import { ImgHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IAvatar extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean | undefined;
}

function Avatar({
  hasBorder = true,
  ...props
}: IAvatar) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}

export default Avatar;

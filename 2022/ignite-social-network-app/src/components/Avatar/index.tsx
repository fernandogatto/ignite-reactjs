import styles from './styles.module.css';

interface IAvatar {
  hasBorder?: boolean | undefined;
  source: string;
}

function Avatar({
  hasBorder = true,
  source,
}: IAvatar) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={source}
    />
  );
}

export default Avatar;

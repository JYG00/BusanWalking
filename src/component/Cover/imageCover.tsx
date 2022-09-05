import useImage from '../../hooks/useImage';

interface imageProps {
  src: string;
  alt: string;
}

export const ImageCover = (props: imageProps) => {
  const { loaded } = useImage(props.src);
  return <img className={loaded ? 'beforeLoad' : 'completeLoad'} src={props.src} alt={props.alt} />;
};

import Image from 'next/image';
import classes from './Avatar.module.css';

const Avatar = ({ className, style, image, alt, width }) => {
	return (
		<div className={`${classes.avatar} ${className}`} style={style}>
			<Image src={image} alt={alt} style={{ width: width, height: width }} />
		</div>
	);
};

export default Avatar;

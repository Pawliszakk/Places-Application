import { useRef, useState, useEffect } from 'react';
import classes from './ImageUpload.module.css';

const ImageUpload = ({ id, center, onInput }) => {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [isValid, setIsValid] = useState(false);
	const filePickerRef = useRef();

	const pickedHandler = (e) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0];

			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;

			onInput(id, pickedFile, fileIsValid);
		} else {
			setIsValid(false);
		}
	};

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreview(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div>
			<input
				type="file"
				id={id}
				style={{ display: 'none' }}
				accept=".jpg,.png,.jpeg"
				ref={filePickerRef}
				onChange={pickedHandler}
			/>
			<div className={`${classes.imageUpload} ${center && classes.center}`}>
				<div className={classes.preview}>
					{preview ? (
						<img src={preview} alt="preview" />
					) : (
						<p>Please pick an image</p>
					)}
				</div>
				<button type="button" onClick={pickImageHandler}>
					Pick Image
				</button>
			</div>
		</div>
	);
};

export default ImageUpload;

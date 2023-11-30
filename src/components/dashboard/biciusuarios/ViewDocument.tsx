import { useEffect, useState, FC } from 'react';

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography
} from '@mui/material';
import axios from 'axios';

//"PROFILE/DOCUMENT/CONTRACT/ANTECEDENT/EPS"

interface Props {
	title: string;
	typeImage: string;
	idUser: string;
	keyNameImage: string;
	urlImage: string;
}

export const ViewDocument: FC<Props> = ({
	title = '',
	typeImage = '',
	idUser = '',
	keyNameImage = '',
	urlImage = ''
}) => {
	const [lcrImageView, setRefreshImageView] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [llgDisabledButton, setDisabledButton] = useState(true);
	const [lcNameImputImage, setNameInputImage] = useState('');
	const [previewVisible, setPreviewVisible] = useState(false);

	useEffect(() => {
		setRefreshImageView(urlImage);
		// Poner nombre unico del elemento en el DOM
		// Para evitar comportamientos extraños cuando se usa el componente varias veces en un formulario
		setNameInputImage('fileInput' + typeImage.toLowerCase());
	}, [urlImage]);

	const handleFileChange = event => {
		const file = event.target.files[0];

		if (
			file &&
			(file.type === 'image/jpeg' ||
				file.type === 'image/png' ||
				file.type === 'image/jpg')
		) {
			setSelectedFile(file);
			setDisabledButton(false);
			setRefreshImageView(URL.createObjectURL(file));
		} else {
			alert('Por favor, selecciona una imagen en formato ');
		}
	};

	const fcrConcatName = fileType => {
		return (
			keyNameImage +
			'_' +
			typeImage +
			'.' +
			fileType.split('/')[1]
		).toLowerCase();
	};

	const openFileDialog = () => {
		const fileInput = document.getElementById(lcNameImputImage);
		fileInput.click();
	};

	const handleUpload = async () => {
		if (selectedFile) {
			setDisabledButton(true);
			const nameFile = fcrConcatName(selectedFile.type);
			const fileInput = document.getElementById(lcNameImputImage);
			fileInput.value = '';
			const formData = new FormData();
			formData.append('image', selectedFile, nameFile);
			formData.append('nombreImagen', nameFile);
			formData.append('apikey', process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY);
			setSelectedFile(null);

			try {
				// '/api/upload'
				// 'http://localhost/api/upload'
				// NEXT_PUBLIC_ENVIRONMENT_HOST
				const response = await fetch(
					process.env.NEXT_PUBLIC_ENVIRONMENT_HOST + 'upload.php',
					{
						method: 'POST',
						body: formData
					}
				);
				if (response.ok) {
					await edtRegister(nameFile);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const edtRegister = async tcrUrlImage => {
		try {
			const lcrUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_HOST;
			const lcrApiKey = process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY;
			const url = `${lcrUrl}form_recmaesusuarima_updateimage.php`;

			const dataToSend = {
				RspValue: 'OK',
				RspMessage: 'Actualizar Imagen',
				RspAppKey: lcrApiKey,
				RspIdUser: idUser,
				RspTypeImage: typeImage,
				RspUrlImage: tcrUrlImage
			};

			const response = await axios.post(url, dataToSend);

			if (response.status === 200) {
				// Verificar si la respuesta es exitosa (código de estado HTTP 200)
				return 'Registro fué modificado.';
			} else {
				return 'Ocurrio algún error al intentar modificar el registro';
			}
		} catch (error) {
			console.error('Error al cargar datos usuarios:', error);
			return 'Error al cargar datos usuarios.';
		}
	};

	const openPreview = () => {
		setPreviewVisible(true);
	};

	const closePreview = () => {
		setPreviewVisible(false);
	};

	return (
		<Card sx={{ paddingTop: '16px' }}>
			<Typography
				gutterBottom
				variant='h6'
				style={{ marginLeft: '60px', marginTop: '40px' }}
			>
				{title}
			</Typography>
			<CardContent sx={{ paddingTop: '16px' }}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<img
						alt='Imagen'
						src={lcrImageView}
						style={{ height: '50%', width: '80%' }}
					/>
					<button onClick={openPreview}>Ver imagen</button>
					{previewVisible && (
						<div>
							<img
								src={lcrImageView}
								alt='Vista Preliminar'
								style={{ maxWidth: '100%', maxHeight: '100%' }}
							/>
							<button onClick={closePreview}>Cerrar</button>
						</div>
					)}
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<input
					type='file'
					id={lcNameImputImage}
					accept='.jpg, .jpeg, .png'
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					onClick={openFileDialog}
				>
					Buscar...
				</Button>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					disabled={llgDisabledButton}
					onClick={handleUpload}
				>
					Subir Imagen
				</Button>
			</CardActions>
		</Card>
	);
};

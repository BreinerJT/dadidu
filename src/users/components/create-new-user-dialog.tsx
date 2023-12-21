import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Unstable_Grid2 as Grid,
	TextField,
	Box
} from '@mui/material';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import { useUserMutation } from '@/users/hooks/useUserMutation';
import { formUsuarioConfig } from '@/users/config/formUsuario';
import { CreateUser, createUserValidation } from '@/users/validations/user';

interface Props {
	id: string;
	keepMounted: boolean;
	open: boolean;
	onClose: () => void;
}

export const CreateNewUserDialog = (props: Props) => {
	const { onClose, open, ...other } = props;
	const { createMutation } = useUserMutation();
	const formik = useFormik<CreateUser>({
		// Valores comentados aun no estan implementados en el formulario
		// Mientras tanto se agregan directamente en la peticion POST
		// Se pueden borrar en la peticion hasta que sean agregados los textfield en el formulario
		initialValues: {
			recNiknamReus: '',
			recNroideReus: '',
			recNombreReus: '',
			recApelidReus: '',
			recFecnacReus: '',
			recSexusuReus: '',
			// recImgvisReus:
			// 	'pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6',
			recDirresReus: '',
			recTelefoReus: '',
			apjCorreoApgm: ''
			// sisCodpaiSipa: '205',
			// sisIdedptSidp: '205020',
			// sisCodproSipr: '205020001000',
			// recCodposReus: '205020001000',
			// recGeolatReus: 0.0,
			// recGeolonReus: 0.0
		},
		validationSchema: createUserValidation,
		onSubmit: values => {
			createMutation.mutate(values, {
				onSuccess: () => {
					toast.success('El usuario ha sido creado exitosamente.');
				},
				onError: () => {
					toast.error('Hubo un error creando el usuario. Intentelo de nuevo.');
				},
				onSettled: () => {
					onClose();
				}
			});
		}
	});

	const handleCancel = () => {
		onClose();
	};

	return (
		<>
			<Dialog
				sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
				maxWidth='sm'
				// TransitionProps={{ onEntering: handleEntering }}
				open={open}
				{...other}
			>
				<DialogTitle>Crear nuevo usuario</DialogTitle>
				<DialogContent dividers>
					<Grid xs={12} md={6} lg={8}>
						<form noValidate onSubmit={formik.handleSubmit}>
							<Box sx={{ m: -1.5 }}>
								<Grid container spacing={3}>
									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recNroideReus &&
													formik.errors.recNroideReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recNroideReus &&
												formik.errors.recNroideReus
											}
											label='Numero de Identificación'
											name='recNroideReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recNroideReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recNiknamReus &&
													formik.errors.recNiknamReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recNiknamReus &&
												formik.errors.recNiknamReus
											}
											label='Nickname'
											name='recNiknamReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recNiknamReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recNombreReus &&
													formik.errors.recNombreReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recNombreReus &&
												formik.errors.recNombreReus
											}
											label='Nombres'
											name='recNombreReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recNombreReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recApelidReus &&
													formik.errors.recApelidReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recApelidReus &&
												formik.errors.recApelidReus
											}
											label='Apellidos'
											name='recApelidReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recApelidReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											type='date'
											error={
												!!(
													formik.touched.recFecnacReus &&
													formik.errors.recFecnacReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recFecnacReus &&
												formik.errors.recFecnacReus
											}
											label='Fecha de nacimiento'
											name='recFecnacReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recFecnacReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recSexusuReus &&
													formik.errors.recSexusuReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recSexusuReus &&
												formik.errors.recSexusuReus
											}
											label='Sexo'
											name='recSexusuReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recSexusuReus}
											required
											select
											SelectProps={{ native: true }}
										>
											{formUsuarioConfig.tipoGenero.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</TextField>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											error={
												!!(
													formik.touched.recDirresReus &&
													formik.errors.recDirresReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recDirresReus &&
												formik.errors.recDirresReus
											}
											label='Direccion'
											name='recDirresReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recDirresReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											type='number'
											error={
												!!(
													formik.touched.recTelefoReus &&
													formik.errors.recTelefoReus
												)
											}
											fullWidth
											helperText={
												formik.touched.recTelefoReus &&
												formik.errors.recTelefoReus
											}
											label='Telefono'
											name='recTelefoReus'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.recTelefoReus}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<TextField
											type='email'
											error={
												!!(
													formik.touched.apjCorreoApgm &&
													formik.errors.apjCorreoApgm
												)
											}
											fullWidth
											helperText={
												formik.touched.apjCorreoApgm &&
												formik.errors.apjCorreoApgm
											}
											label='Correo Electronico'
											name='apjCorreoApgm'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.apjCorreoApgm}
										/>
									</Grid>
								</Grid>
							</Box>
						</form>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color='error' onClick={handleCancel}>
						Cancelar
					</Button>
					<Button onClick={formik.submitForm}>Crear</Button>
				</DialogActions>
			</Dialog>
			<Toaster position='bottom-right' gutter={8} />
		</>
	);
};

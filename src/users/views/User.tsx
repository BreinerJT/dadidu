import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Unstable_Grid2 as Grid,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { ViewDocument } from '@/users/components/ViewDocument';
import { formUsuarioConfig } from '@/users/config/formUsuario';
import { User } from '@/users/types/user';
import { editUserValidation } from '@/users/validations/user';
import { useUserMutation } from '@/users/hooks/useUserMutation';
import { Layout } from '@/shared/layout/index';

export const UserView = ({ user }: { user: User }) => {
	const { editMutation } = useUserMutation();

	const formik = useFormik({
		initialValues: {
			recNiknamReus: user.recNiknamReus,
			recNroideReus: user.recNroideReus,
			recNombreReus: user.recNombreReus,
			recApelidReus: user.recApelidReus,
			recFecnacReus: user.recFecnacReus,
			recSexusuReus: user.recSexusuReus,
			// recImgvisReus:
			// 	'pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6',
			recDirresReus: user.recDirresReus,
			recTelefoReus: user.recTelefoReus,
			apjCorreoApgm: user.apjCorreoApgm
			// sisCodpaiSipa: '205',
			// sisIdedptSidp: '205020',
			// sisCodproSipr: '205020001000',
			// recCodposReus: '205020001000',
			// recGeolatReus: 0.0,
			// recGeolonReus: 0.0
		},
		validationSchema: editUserValidation,
		onSubmit: values => {
			editMutation.mutate(
				{ body: values, id: user.recIdeunikeyReus },
				{
					onSuccess: () => {
						toast.success('El usuario ha sido modificado exitosamente.');
					},
					onError: () => {
						toast.error(
							'Hubo un error al modificar el usuario. Intentelo más tarde.'
						);
					}
				}
			);
		}
	});

	return (
		<Layout title='Biciusuario | ActiBike'>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<div>
							<Typography variant='h4'>Perfil Biciusuario</Typography>
						</div>
						<div>
							<Grid container spacing={3}>
								<Grid xs={12} md={6} lg={4}>
									<ViewDocument
										title='Imagen del Perfil'
										typeImage='PROFILE'
										idUser={user.recNroideReus}
										keyNameImage={''}
										urlImage={user.recImgvisReus}
									/>
								</Grid>
								<Grid xs={12} md={6} lg={8}>
									<form noValidate onSubmit={formik.handleSubmit}>
										<Card>
											<CardHeader
												subheader='Informacion personal del biciusuario'
												title='Perfil'
											/>
											<CardContent sx={{ pt: 0 }}>
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
																	<option
																		key={option.value}
																		value={option.value}
																	>
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
											</CardContent>
											<Divider />
											<CardActions sx={{ justifyContent: 'flex-end' }}>
												<Button type='submit' variant='contained'>
													Guardar
												</Button>
											</CardActions>
										</Card>
									</form>
								</Grid>
								{/* <Grid xs={12} md={6} lg={4}>
									<ViewDocument
										title='Cedula'
										typeImage='DOCUMENT'
										idUser={regData.rec_nroreg_reus}
										keyNameImage={keyNameImage}
										urlImage={regData.rec_imgdoc_reus}
									/>
								</Grid>

								<Grid xs={12} md={6} lg={4}>
									<ViewDocument
										title='Contrato'
										typeImage='CONTRACT'
										idUser={regData.rec_nroreg_reus}
										keyNameImage={keyNameImage}
										urlImage={regData.rec_imgcon_reus}
									/>
								</Grid>

								<Grid xs={12} md={6} lg={4}>
									<ViewDocument
										title='Antecedentes'
										typeImage='ANTECEDENT'
										idUser={regData.rec_nroreg_reus}
										keyNameImage={keyNameImage}
										urlImage={regData.rec_imgjud_reus}
									/>
								</Grid>

								<Grid xs={12} md={6} lg={4}>
									<ViewDocument
										title='Seguridad Social'
										typeImage='EPS'
										idUser={regData.rec_nroreg_reus}
										keyNameImage={keyNameImage}
										urlImage={regData.rec_imgeps_reus}
									/>
								</Grid> */}
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</Layout>
	);
};

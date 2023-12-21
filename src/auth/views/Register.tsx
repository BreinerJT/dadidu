import { useEffect, useState } from 'react';

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	Unstable_Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';

import { Layout } from '@/components/auth/Layout';
import { registerValidations } from '@/auth/validations/register';
import { registerConfig } from '@/config/register';

export const Register = () => {
	const [tmpContries, setTmpData] = useState([]);
	const [tmpOcupaciones, setTmpOcupaciones] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	const addRegister = async regData => {
		try {
			const lcrUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_HOST;
			const lcrApiKey = process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY;
			const lcrName =
				regData.rec_nroide_reus +
				' ' +
				regData.rec_priape_reus +
				' ' +
				regData.rec_segape_reus +
				' ' +
				regData.rec_prinom_reus +
				' ' +
				regData.rec_segnom_usua;

			const url = `${lcrUrl}form_recmaesusuarima_addedt.php`;
			const dataToSend = {
				RspValue: 'OK',
				RspMessage: 'Crear registro',
				RspAppKey: lcrApiKey,
				R1ParentKey: 'REG-USERS-ID',
				Records: [
					{
						rec_nroreg_reus: 'NA',
						sis_tipide_tide: regData.sis_tipide_tide,
						rec_nroide_reus: regData.rec_nroide_reus,
						rec_priape_reus: regData.rec_priape_reus.toUpperCase(),
						rec_segape_reus: regData.rec_segape_reus.toUpperCase(),
						rec_prinom_reus: regData.rec_prinom_reus.toUpperCase(),
						rec_segnom_usua: regData.rec_segnom_usua.toUpperCase(),
						rec_fecnac_reus: regData.rec_fecnac_reus,
						rec_sexusu_reus: regData.rec_sexusu_reus,
						rec_dirres_reus: regData.rec_dirres_reus,
						rec_telefo_reus: regData.rec_telefo_reus,
						rec_correo_reus: regData.rec_correo_reus.toLowerCase(),
						rec_nomusu_reus: lcrName,
						rec_imgvis_reus: '/assets/avatars/avatar-bici-usuario.png',
						rec_imgdoc_reus: '/assets/avatars/documento-identidad.jpg',
						rec_imgcon_reus: '/assets/avatars/imagen-contrato.png',
						rec_imgjud_reus: '/assets/avatars/imagen-antecedentes.png',
						rec_imgeps_reus: '/assets/avatars/imagen-eps.png',
						rec_traspcodigo_reta: regData.rec_traspcodigo_reta,
						rec_ocupcodigo_reoc: regData.rec_ocupcodigo_reoc,
						sis_codpai_sipa: regData.sis_codpai_sipa,
						sis_idedpt_sidp: '205020',
						sis_codpro_sipr: '205020001000',
						sis_codigobarrio_sipb: 'NA',
						rec_codpos_reus: '200001',
						rec_geolat_reus: 10.5,
						rec_geolon_reus: -73.3,
						rec_logincodigo_reus: regData.rec_nroide_reus,
						rec_loginclave_reus: regData.rec_nroide_reus,
						rec_loginfecven_reus: '2023-10-01',
						rec_loginpinkey_reus: 'NA',
						rec_loginpinfec_reus: '2020-01-01',
						rec_estreg_reus: '1',
						sis_estado_imaen: 'A'
					}
				]
			};
			const response = await axios.post(url, dataToSend);

			if (response.status === 200) {
				// Verificar si la respuesta es exitosa (código de estado HTTP 200)
				return 'Registro fué Creado con exito.';
			} else {
				return 'Ocurrio algún error al intentar crear el registro';
			}
		} catch (error) {
			console.error('Error al crear datos del usuarios:', error);
			return 'Error al crear datos del usuarios.';
		}
	};

	//---------------------------------------------------------------
	// flgValidaIdUsers : Funcion Estandar para validar si el usuario
	// existe registrado
	//---------------------------------------------------------------

	//---------------------------------------------------------------
	// fobtmpCargarPaises() : funcion para traer los paises
	//---------------------------------------------------------------
	const fobtmpCargarPaises = async () => {
		try {
			const lcrUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_HOST;
			const lcrApiKey = process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY;
			const tmp: string[] = [];
			const url =
				lcrUrl +
				'form_sispaisamaestro_query.php?auniquekey=' +
				lcrApiKey +
				'&typequery=SEARCH&keyquery=NA';
			const response = await axios.get(url);

			if (response.status === 200) {
				response.data.Records.forEach(record => {
					let reg = {};
					reg.id = record.sis_codpai_sipa;
					reg.label = record.sis_nombre_sipa;
					tmp.push(reg);
				});
			}
			return tmp;
		} catch (error) {
			console.error('Error al crear datos del usuarios:', error);
			return 'Error al crear datos del usuarios.';
		}
	};

	//---------------------------------------------------------------
	// fobtmpCargarOcupaciones() : funcion para traer las ocupaciones
	//---------------------------------------------------------------
	const fobtmpCargarOcupaciones = async () => {
		try {
			const lcrUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_HOST;
			const lcrApiKey = process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY;
			const tmp: string[] = [];
			const url =
				lcrUrl +
				'form_recmaesocupacion_query.php?auniquekey=' +
				lcrApiKey +
				'&typequery=SEARCH&keyquery=SAL';
			const response = await axios.get(url);

			if (response.status === 200) {
				response.data.Records.forEach(record => {
					let reg = {};
					reg.id = record.rec_ocupcodigo_reoc;
					reg.label = record.rec_ocupnombre_reoc;
					tmp.push(reg);
				});
			}
			return tmp;
		} catch (error) {
			console.error('Error al cargar las ocupaciones:', error);
			return 'Error al cargar las ocupaciones.';
		}
	};

	useEffect(() => {
		if (tmpContries.length === 0) {
			fobtmpCargarPaises().then(data => {
				setTmpData(data);
				// Una vez que regData se carga con éxito, establece los valores iniciales de formik
			});
		}
		if (tmpOcupaciones.length === 0) {
			fobtmpCargarOcupaciones().then(data => {
				setTmpOcupaciones(data);
				// Una vez que regData se carga con éxito, establece los valores iniciales de formik
			});
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			sis_tipide_tide: 'CC',
			rec_nroide_reus: '',
			rec_prinom_reus: '',
			rec_segnom_usua: '',
			rec_priape_reus: '',
			rec_segape_reus: '',
			rec_fecnac_reus: '',
			rec_sexusu_reus: 'M',
			rec_dirres_reus: '',
			rec_telefo_reus: '',
			rec_correo_reus: '',
			rec_traspcodigo_reta: '01',
			rec_ocupcodigo_reoc: '',
			sis_codpai_sipa: '170',
			submit: null
		},
		validationSchema: registerValidations,
		onSubmit: async (values, helpers) => {
			try {
				await addRegister(values);
				formik.resetForm();
				setOpenModal(true);
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		}
	});

	return (
		<Layout title='Registro | ActiBike'>
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
							<Typography variant='h4'>Registro Biciusuario</Typography>
						</div>
						<div>
							<Grid container spacing={3}>
								<Grid xs={12} md={6} lg={8}>
									<form noValidate onSubmit={formik.handleSubmit}>
										<Card>
											<CardContent sx={{ pt: 0 }}>
												<Box sx={{ m: -1.5 }}>
													<Grid container spacing={3}>
														<Grid xs={12} md={6}>
															<TextField
																fullWidth
																label='Tipo de Identificación'
																name='sis_tipide_tide'
																onChange={formik.handleChange}
																required
																select
																SelectProps={{ native: true }}
																value={formik.values.sis_tipide_tide}
															>
																{registerConfig.tipoIdentificacion.map(
																	option => (
																		<option
																			key={option.value}
																			value={option.value}
																		>
																			{option.label}
																		</option>
																	)
																)}
															</TextField>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_nroide_reus &&
																		formik.errors.rec_nroide_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_nroide_reus &&
																	formik.errors.rec_nroide_reus
																}
																label='Numero de Identificación'
																name='rec_nroide_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_nroide_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_prinom_reus &&
																		formik.errors.rec_prinom_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_prinom_reus &&
																	formik.errors.rec_prinom_reus
																}
																label='Primer Nombre'
																name='rec_prinom_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_prinom_reus}
															/>
														</Grid>

														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_segnom_usua &&
																		formik.errors.rec_segnom_usua
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_segnom_usua &&
																	formik.errors.rec_segnom_usua
																}
																label='Segundo Nombre'
																name='rec_segnom_usua'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_segnom_usua}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_priape_reus &&
																		formik.errors.rec_priape_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_priape_reus &&
																	formik.errors.rec_priape_reus
																}
																label='Primer apellido'
																name='rec_priape_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_priape_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_segape_reus &&
																		formik.errors.rec_segape_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_segape_reus &&
																	formik.errors.rec_segape_reus
																}
																label='Segundo apellido'
																name='rec_segape_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_segape_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																type='date'
																max={'2007-01-01'}
																error={
																	!!(
																		formik.touched.rec_fecnac_reus &&
																		formik.errors.rec_fecnac_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_fecnac_reus &&
																	formik.errors.rec_fecnac_reus
																}
																label='Fecha de nacimiento'
																name='rec_fecnac_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_fecnac_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_sexusu_reus &&
																		formik.errors.rec_sexusu_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_sexusu_reus &&
																	formik.errors.rec_sexusu_reus
																}
																label='Sexo'
																name='rec_sexusu_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_sexusu_reus}
																required
																select
																SelectProps={{ native: true }}
															>
																{registerConfig.tipoGenero.map(option => (
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
																		formik.touched.rec_dirres_reus &&
																		formik.errors.rec_dirres_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_dirres_reus &&
																	formik.errors.rec_dirres_reus
																}
																label='Direccion'
																name='rec_dirres_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_dirres_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																type='number'
																error={
																	!!(
																		formik.touched.rec_telefo_reus &&
																		formik.errors.rec_telefo_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_telefo_reus &&
																	formik.errors.rec_telefo_reus
																}
																label='Telefono'
																name='rec_telefo_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_telefo_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_correo_reus &&
																		formik.errors.rec_correo_reus
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_correo_reus &&
																	formik.errors.rec_correo_reus
																}
																label='Correo Electronico'
																name='rec_correo_reus'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_correo_reus}
															/>
														</Grid>
														<Grid xs={12} md={6}>
															<FormControl fullWidth>
																<InputLabel id='demo-simple-select-label'>
																	Ocupacion
																</InputLabel>
																<Select
																	error={
																		!!(
																			formik.touched.rec_ocupcodigo_reoc &&
																			formik.errors.rec_ocupcodigo_reoc
																		)
																	}
																	fullWidth
																	labelId='demo-simple-select-label'
																	id='demo-simple-select'
																	value={formik.values.rec_ocupcodigo_reoc}
																	name='rec_ocupcodigo_reoc'
																	onChange={formik.handleChange}
																	label='Ocupacion'
																>
																	{registerConfig.tipodeocupaciones.map(
																		option => (
																			<MenuItem
																				key={option.value}
																				value={option.value}
																			>
																				{option.label}
																			</MenuItem>
																		)
																	)}
																</Select>
															</FormControl>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																error={
																	!!(
																		formik.touched.rec_traspcodigo_reta &&
																		formik.errors.rec_traspcodigo_reta
																	)
																}
																fullWidth
																helperText={
																	formik.touched.rec_traspcodigo_reta &&
																	formik.errors.rec_traspcodigo_reta
																}
																label='Transporte habitual'
																name='rec_traspcodigo_reta'
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																value={formik.values.rec_traspcodigo_reta}
																required
																select
																SelectProps={{ native: true }}
															>
																{registerConfig.transporteHabitual.map(
																	option => (
																		<option
																			key={option.value}
																			value={option.value}
																		>
																			{option.label}
																		</option>
																	)
																)}
															</TextField>
														</Grid>
														<Grid xs={12} md={6}>
															<TextField
																fullWidth
																label='Pais'
																name='sis_codpai_sipa'
																onChange={formik.handleChange}
																required
																select
																SelectProps={{ native: true }}
																value={formik.values.sis_codpai_sipa}
															>
																{[].map(option => (
																	// {tmpContries.map(option => (
																	<option key={option.id} value={option.id}>
																		{option.label}
																	</option>
																))}
															</TextField>
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
							</Grid>
							<Dialog open={openModal} onClose={() => setOpenModal(false)}>
								<DialogTitle>
									Registro fue realizado correctamente..
								</DialogTitle>
								<DialogContent
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<img
										src='/assets/mascota-pagina.jpg'
										style={{ width: '200px', height: 'auto' }}
										alt='Imagen'
									/>
									<DialogContent>
										<p style={{ fontSize: '16px', fontWeight: 600 }}>
											Ya estas registrado!!
										</p>
										<p>
											Acércate ahora a una biciestación y lleva tu documento de
											identidad para finalizar tu proceso de inscripción.
										</p>
									</DialogContent>
								</DialogContent>
								<DialogActions>
									<Button onClick={() => setOpenModal(false)} color='primary'>
										Cerrar
									</Button>
								</DialogActions>
							</Dialog>
						</div>
					</Stack>
				</Container>
			</Box>
		</Layout>
	);
};

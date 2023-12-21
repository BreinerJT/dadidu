import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { loginFormValidations } from '@/auth/validations/login';

export const Login = () => {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			rec_logincodigo_reus: '',
			rec_loginclave_reus: '',
			submit: null
		},
		validationSchema: loginFormValidations,
		onSubmit: async (
			{ rec_logincodigo_reus, rec_loginclave_reus },
			helpers
		) => {
			try {
				//router.push('/auth/register');
				// await auth.signIn(rec_logincodigo_reus, rec_loginclave_reus);
				router.push('/');
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		}
	});

	return (
		<AuthLayout title='Login | Valleduparvaenbici'>
			<Box
				sx={{
					backgroundColor: 'background.paper',
					flex: '1 1 auto',
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Box
					sx={{
						maxWidth: 550,
						px: 3,
						py: '100px',
						width: '100%'
					}}
				>
					<div>
						<Stack spacing={1} sx={{ mb: 3 }}>
							<Typography variant='h4'>Acceso ActiBike</Typography>
							<Typography color='text.secondary' variant='body2'>
								Acceso Exclusivo Operador ActiBike
							</Typography>
						</Stack>
						{/* Inicio del Formulario      */}
						<form noValidate onSubmit={formik.handleSubmit}>
							<Stack spacing={3}>
								<TextField
									error={
										!!(
											formik.touched.rec_logincodigo_reus &&
											formik.errors.rec_logincodigo_reus
										)
									}
									fullWidth
									helperText={
										formik.touched.rec_logincodigo_reus &&
										formik.errors.rec_logincodigo_reus
									}
									label='Usuario'
									name='rec_logincodigo_reus'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='email'
									value={formik.values.rec_logincodigo_reus}
								/>
								<TextField
									error={
										!!(
											formik.touched.rec_loginclave_reus &&
											formik.errors.rec_loginclave_reus
										)
									}
									fullWidth
									helperText={
										formik.touched.rec_loginclave_reus &&
										formik.errors.rec_loginclave_reus
									}
									label='Password'
									name='rec_loginclave_reus'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='password'
									value={formik.values.rec_loginclave_reus}
								/>
							</Stack>
							{formik.errors.submit && (
								<Typography color='error' sx={{ mt: 3 }} variant='body2'>
									{formik.errors.submit}
								</Typography>
							)}
							<Button
								fullWidth
								size='large'
								sx={{ mt: 3 }}
								type='submit'
								variant='contained'
							>
								Continuar
							</Button>
						</form>
						<Button
							fullWidth
							size='large'
							sx={{ mt: 3 }}
							type='submit'
							variant='contained'
							onClick={() => signIn('google', { callbackUrl: '/' })}
						>
							Google
						</Button>
						{/* Fin del Formulario      */}
					</div>
				</Box>
			</Box>
		</AuthLayout>
	);
};

import * as Yup from 'yup';

export const formUsuarioValidations = Yup.object({
	sis_tipide_tide: Yup.string()
		.max(10)
		.required('Tipo Identificación es requerido'),
	rec_nroide_reus: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9]*$/, 'El formato no es valido.')
		.min(6)
		.required('Numero Identificación es requerido'),
	rec_priape_reus: Yup.string()
		.max(30)
		.required('Primer Apellido es requerido'),
	rec_segape_reus: Yup.string().max(30),
	rec_prinom_reus: Yup.string().max(30).required('Primer Nombre es requerido'),
	rec_segnom_usua: Yup.string().max(30),
	rec_fecnac_reus: Yup.date()
		.max('2007-01-01', 'Usuario debe haber nacido antes del 2007')
		.required('Fecha es requerida'),
	rec_sexusu_reus: Yup.string().max(25).required('Sexo es requerido'),
	rec_dirres_reus: Yup.string().max(255).required('Direccion es requerido'),
	rec_telefo_reus: Yup.number().required('Telefono es requerido'),
	rec_correo_reus: Yup.string().email().required('El correo es requerido'),
	rec_ocupcodigo_reoc: Yup.string().max(255).required('Ocupacion es requerido'),
	rec_traspcodigo_reta: Yup.string()
		.max(255)
		.required('Transporte habitual es requerido'),
	sis_codpai_sipa: Yup.string().max(255).required('Pais es requerido')
});

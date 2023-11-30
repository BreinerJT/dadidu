import * as Yup from 'yup';

export type CreateUser = Yup.InferType<typeof createUserValidation>;
export type EditUser = Yup.InferType<typeof editUserValidation>;

export const createUserValidation = Yup.object({
	recNroideReus: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9]*$/, 'El formato no es valido.')
		.min(6)
		.required('Numero Identificación es requerido'),
	recNiknamReus: Yup.string().max(30).required('Nickname es requerido.'),
	recNombreReus: Yup.string().max(30).required('Nombre es requerido.'),
	recApelidReus: Yup.string().max(30).required('Apellido es requerido.'),
	recFecnacReus: Yup.string().required('Fecha de nacimiento es requerida'),
	recSexusuReus: Yup.string().max(1).required('Tipo de sexo es requerido.'),
	recDirresReus: Yup.string().max(60).required('Dirección es requerida.'),
	recTelefoReus: Yup.string()
		.max(50)
		.required('Numero de telefono es requerido.'),
	apjCorreoApgm: Yup.string()
		.max(80)
		.required('Correo electronico es requerido.')
});

export const editUserValidation = Yup.object({
	recNroideReus: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9]*$/, 'El formato no es valido.')
		.min(6)
		.required('Numero Identificación es requerido'),
	recNiknamReus: Yup.string().max(30).required('Nickname es requerido.'),
	recNombreReus: Yup.string().max(30).required('Nombre es requerido.'),
	recApelidReus: Yup.string().max(30).required('Apellido es requerido.'),
	recFecnacReus: Yup.string().required('Fecha de nacimiento es requerida'),
	recSexusuReus: Yup.string().max(1).required('Tipo de sexo es requerido.'),
	recDirresReus: Yup.string().max(60).required('Dirección es requerida.'),
	recTelefoReus: Yup.string()
		.max(50)
		.required('Numero de telefono es requerido.'),
	apjCorreoApgm: Yup.string()
		.max(80)
		.required('Correo electronico es requerido.')
});

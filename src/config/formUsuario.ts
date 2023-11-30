import { FormUsuarioConfig } from '@/types';

export const formUsuarioConfig: FormUsuarioConfig = {
	tipoIdentificacion: [
		{
			value: 'CC',
			label: 'CC - Cédula de Ciudadania.'
		},
		{
			value: 'CE',
			label: 'CE - Cédula de Extranjeria.'
		},
		{
			value: 'TI',
			label: 'TI - Tarjeta de Identidad.'
		},
		{
			value: 'PA',
			label: 'PA - Pasaporte.'
		},
		{
			value: 'PE',
			label: 'PE - Permiso Especial.'
		}
	],
	tipoGenero: [
		{
			value: '1',
			label: 'Masculino'
		},
		{
			value: '2',
			label: 'Femenino'
		},
		{
			value: '3',
			label: 'Indefinido'
		}
	],
	tipodeocupaciones: [
		{
			value: '01',
			label: 'Profesores'
		},
		{
			value: '02',
			label: 'Trabajador Independiente'
		},
		{
			value: '03',
			label: 'Estudiantes.'
		},
		{
			value: '04',
			label: 'Comerciante'
		},
		{
			value: '05',
			label: 'Empleados'
		},
		{
			value: '06',
			label: 'Otros'
		}
	],
	transporteHabitual: [
		{
			value: 'NA',
			label: 'No Asignado.'
		},
		{
			value: '01',
			label: 'A pie.'
		},
		{
			value: '02',
			label: 'En moto.'
		},
		{
			value: '03',
			label: 'En carro particular'
		},
		{
			value: '04',
			label: 'En taxi.'
		},
		{
			value: '05',
			label: 'En bus.'
		},
		{
			value: '06',
			label: 'En bicicleta.'
		},
		{
			value: '07',
			label: 'En mototaxi.'
		},
		{
			value: '08',
			label: 'Otro.'
		}
	]
};

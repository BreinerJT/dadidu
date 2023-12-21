import { Select } from '@/shared/types';

export interface RegisterConfig {
	tipoIdentificacion: Select[];
	tipoGenero: Select[];
	tipodeocupaciones: Select[];
	transporteHabitual: Select[];
}

export interface Select {
	value: string;
	label: string;
}

export interface SidebarNavItem {
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	path: string;
	title: string;
}

export interface DashboardConfig {
	sidebarItems: SidebarNavItem[];
}

export interface FormUsuarioConfig {
	tipoIdentificacion: Select[];
	tipoGenero: Select[];
	tipodeocupaciones: Select[];
	transporteHabitual: Select[];
}

export interface RegisterConfig extends FormUsuarioConfig {}

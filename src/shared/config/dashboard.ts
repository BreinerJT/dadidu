import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	sidebarItems: [
		{
			title: 'Biciusuarios',
			path: '/biciusuarios/browser',
			icon: 'userPlus'
		},
		{
			title: 'Registrese',
			path: '/auth/register',
			icon: 'userPlus'
		},
		{
			title: 'Login',
			path: '/auth/login',
			icon: 'lock'
		}
	]
};

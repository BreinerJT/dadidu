import axios from 'axios';

export const dadiduApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT_HOST
});

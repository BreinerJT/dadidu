import { useQuery } from 'react-query';

import { dadiduApi } from '@/apis/dadiduApi';
import { Data } from '@/types/user';

const getUserById = async (id: string) => {
	const user = await dadiduApi.get<Data>(
		`/api/users?currentpage=1&pagesize=10&parameter=PKEY&filter=${id}`
	);
	return user.data.rspData[0];
};

export const useUser = ({ id }: { id: string }) => {
	const userQuery = useQuery(['user', id], () => getUserById(id));

	return {
		userQuery
	};
};

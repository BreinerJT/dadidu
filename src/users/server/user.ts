import { dadiduApi } from '@/apis/dadiduApi';
import { Data } from '@/users/types/user';

export const getUserById = async (id: string) => {
	try {
		const user = await dadiduApi.get<Data>(
			`/api/users?currentpage=1&pagesize=10&parameter=PKEY&filter=${id}`
		);
		return user.data.rspData[0];
	} catch (error) {
		return null;
	}
};

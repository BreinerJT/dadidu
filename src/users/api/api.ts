import { dadiduApi } from '@/apis/dadiduApi';
import { Data } from '@/users/types/user';
import { CreateUser, EditUser } from '@/validations/user';

export const createUser = async (body: CreateUser) => {
	const data = {
		rspData: [
			{
				...body,
				recNroregReus: 'NA',
				recNomusuReus: `${body.recNombreReus} ${body.recApelidReus}`,
				recImgvisReus:
					'pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6',
				sisCodpaiSipa: '205',
				sisIdedptSidp: '205020',
				sisCodproSipr: '205020001000',
				recCodposReus: '205020001000',
				recGeolatReus: 0.0,
				recGeolonReus: 0.0
			}
		]
	};

	// Descomentar cuando se agreguen los textfields al formulario
	// Para crear un nuevo usuario. Borrar variable data de arriba.

	// const data = {
	// 	rspData: [{...body, recNroregReus: "NA", recNomusuReus: body.recNombreReus + body.recApelidReus }]
	// };

	const resp = await dadiduApi.post('/api/users/create', data);
	return resp.data;
};

export const getUserById = async (id: string) => {
	const user = await dadiduApi.get<Data>(
		`/api/users?currentpage=1&pagesize=10&parameter=PKEY&filter=${id}`
	);
	return user.data.rspData[0];
};

export const editUser = async ({
	body,
	id
}: {
	body: EditUser;
	id: number;
}) => {
	const data = {
		rspData: [
			{
				...body,
				recIdeunikeyReus: id,
				recNroregReus: 'NA',
				recNomusuReus: `${body.recNombreReus} ${body.recApelidReus}`,
				recImgvisReus:
					'pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6',
				sisCodpaiSipa: '205',
				sisIdedptSidp: '205020',
				sisCodproSipr: '205020001000',
				recCodposReus: '205020001000',
				recGeolatReus: 0.0,
				recGeolonReus: 0.0
			}
		]
	};

	// Descomentar cuando se agreguen los textfields al formulario
	// Para crear un nuevo usuario. Borrar variable data de arriba.

	// const data = {
	// 	rspData: [{...body, recNroregReus: "NA", recIdeunikeyReus: id, recNomusuReus: body.recNombreReus + body.recApelidReus }]
	// };

	const resp = await dadiduApi.put('/api/users/update', data);
	return resp.data;
};

export const deleteUser = async ({ id }: { id: number }) => {
	const data = [
		{
			recPKey: id,
			recEstreg: 2
		}
	];

	const resp = await dadiduApi.patch('/api/users/changestatus', data);
	return resp.data;
};

import { GetServerSideProps } from 'next';

import { UserView } from '@/users/views/User';
import { getUserById } from '@/users/server/user';
import { User } from '@/users/types/user';

const FormPage = ({ user }: { user: User }) => {
	return <UserView user={user} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { id } = query as { id: string };
	const user = await getUserById(id);

	if (!user) {
		return {
			redirect: {
				destination: '/biciusuarios',
				permanent: false
			}
		};
	}

	return {
		props: {
			user
		}
	};
};

export default FormPage;

import { useMutation, useQueryClient } from 'react-query';
import { createUser, deleteUser, editUser } from '@/users/api/api';

export const useUserMutation = () => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		}
	});

	const createMutation = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		}
	});

	const editMutation = useMutation({
		mutationFn: editUser
	});

	return {
		createMutation,
		deleteMutation,
		editMutation
	};
};

import NextLink from 'next/link';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';

import {
	Avatar,
	Box,
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Link,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@mui/material';
import toast from 'react-hot-toast';

import { Scrollbar } from '@/components/shared/Scrollbar';
import { Icons } from '@/components/shared/Icons';
import { getInitials } from '@/utils/getInitials';
import { User } from '@/types/user';
import { useUserMutation } from '@/hooks/user/useUserMutation';
import Image from 'next/image';

export interface BrowserTableProps {
	count: number;
	items: User[];
	page: number;
	rowsPerPage: number;
	onPageChange: (_event: MouseEvent | null, _page: number) => void;
	onRowsPerPageChange: (_event: ChangeEvent) => void;
}

const tableCells = ['Nombre', 'Email', 'Direccion', 'Telefono', 'Pais', ''];

export const BrowserTable = ({
	count = 0,
	items = [],
	page = 0,
	rowsPerPage = 0,
	onPageChange,
	onRowsPerPageChange
}: BrowserTableProps) => {
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const { deleteMutation } = useUserMutation();
	//const selectedSome = (selected.length > 0) && (selected.length < items.length);
	//const selectedAll = (items.length > 0) && (selected.length === items.length);

	const handleClickOpen = (user: User) => {
		setSelectedUser(user);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDeleteUser = () => {
		if (!selectedUser) return;

		deleteMutation.mutate(
			{ id: selectedUser.recIdeunikeyReus },
			{
				onSuccess: () => {
					setOpen(false);
					toast.success('El usuario ha sido eliminado.');
				},
				onError: () => {
					setOpen(false);
					toast.error('Ha habido un error, intentalo más tarde.');
				}
			}
		);
	};

	return (
		<>
			<Card>
				<Scrollbar>
					<Box sx={{ minWidth: 800 }}>
						<Table>
							<TableHead>
								<TableRow>
									{tableCells.map(cell => (
										<TableCell key={cell}>{cell}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map(reg => {
									// const lcrName =
									// 	reg.rec_priape_reus +
									// 	' ' +
									// 	reg.rec_segape_reus +
									// 	' ' +
									// 	reg.rec_prinom_reus +
									// 	' ' +
									// 	reg.rec_segnom_usua;

									// const lcrId =
									// 	'../biciusuarios/formusuario?id=' + reg.rec_nroreg_reus;

									//const isSelected = selected.includes(reg.rec_ideunikey_reus);
									//const createdAt = format(reg.createdAt, 'dd/MM/yyyy');
									return (
										<TableRow hover key={reg.recIdeunikeyReus}>
											<TableCell>
												<Stack alignItems='center' direction='row' spacing={2}>
													<Avatar src={reg.recImgvisReus}>
														{/* <Image
															alt='User profile picture'
															src={reg.recImgvisReus}
															fill
														/> */}
														{getInitials(reg.recNomusuReus)}
													</Avatar>
													<Typography variant='subtitle2'>
														{reg.recNomusuReus}
													</Typography>
												</Stack>
											</TableCell>
											<TableCell>{reg.apjCorreoApgm}</TableCell>
											<TableCell>{reg.recDirresReus}</TableCell>
											<TableCell>{reg.recTelefoReus}</TableCell>
											<TableCell>{reg.sisCodpaiSipa}</TableCell>
											<TableCell
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: '2px'
												}}
											>
												<Link
													component={NextLink}
													href={`/biciusuarios/user/${reg.recNroregReus}`}
													underline='hover'
													passHref
												>
													<IconButton aria-label='edit' color='success'>
														<Icons.edit />
													</IconButton>
												</Link>
												<IconButton
													onClick={() => handleClickOpen(reg)}
													aria-label='delete'
													color='error'
												>
													<Icons.delete />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Box>
				</Scrollbar>
				<TablePagination
					component='div'
					count={count}
					onPageChange={onPageChange}
					onRowsPerPageChange={onRowsPerPageChange}
					page={page}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[7, 15, 25]}
				/>
			</Card>
			{open && (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						Esta seguro que desea eliminar el usuario?
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							Si está seguro de que desea eliminar el usuario, haga clic en
							Eliminar. De lo contrario, haga clic en Cancelar.{' '}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={onDeleteUser} autoFocus color='error'>
							Eliminar
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

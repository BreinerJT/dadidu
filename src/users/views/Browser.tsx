import { useCallback, useState, ChangeEvent } from 'react';

import {
	Box,
	Button,
	Container,
	Stack,
	SvgIcon,
	Typography
} from '@mui/material';

import { BrowserTable } from '@/users/components/BrowserTable';
import { CreateNewUserDialog } from '@/users/components/create-new-user-dialog';
import { useUsers } from '@/users/hooks/useUsers';
import { TextBoxSearch } from '@/shared/components/TextboxSearch';
import { Layout } from '@/shared/layout/index';
import { Icons } from '@/shared/components/Icons';

export const Browser = () => {
	const [page, setPage] = useState<number>(0);
	const [showModal, setShowModal] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState<number>(7);
	const [tmpData, setTmpData] = useState([]); // Usar el estado para almacenar los datos
	const [searchValue, setSearchValue] = useState<string>('');
	const [tmpDataFilter, setSearchResults] = useState([]);
	const { usersQuery } = useUsers();

	// useEffect(() => {
	// 	if (tmpDataFilter.length === 0) {
	// 		fobLoadTempDataUsers().then(data => {
	// 			setTmpData(data);
	// 			setSearchResults(data);
	// 		});
	// 	}
	// }, []); // Este efecto se ejecuta una vez al cargar el componente
	// const customers = applyPagination(tmpDataFilter, page, rowsPerPage);
	//const customersIds = useMemo(() => customers.map((customer) => customer.rec_ideunikey_reus), [customers]);
	//const customersSelection = useSelection(customersIds);

	const fobEventHanandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchValue(value);

		if (value.length === 0) {
			setSearchResults(tmpData);
		} else {
			const filteredResults = tmpData.filter(item => {
				return item.rec_nomusu_reus.toLowerCase().includes(value.toLowerCase());
			});
			setSearchResults(filteredResults);
		}
	};

	const handlePageChange = useCallback((event: any, value: number) => {
		setPage(value);
	}, []);

	const handleRowsPerPageChange = useCallback((event: any) => {
		setRowsPerPage(event.target.value);
	}, []);

	return (
		<Layout title='Biciusuarios | ActiBike'>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth='xl'>
					<Stack spacing={3}>
						<Stack direction='row' justifyContent='space-between' spacing={4}>
							<Stack spacing={1}>
								<Typography variant='h4'>Biciusuarios</Typography>
								<Stack alignItems='center' direction='row' spacing={1}></Stack>
							</Stack>
							<div>
								<Button
									startIcon={
										<SvgIcon fontSize='small'>
											<Icons.plus />
										</SvgIcon>
									}
									variant='contained'
									onClick={() => setShowModal(true)}
								>
									Agregar Nuevo
								</Button>
							</div>
						</Stack>
						<TextBoxSearch
							value={searchValue}
							placeholder='Buscar BiciUsuario'
							onChange={fobEventHanandleSearch}
						/>
						{usersQuery.isSuccess && (
							<BrowserTable
								count={tmpDataFilter.length}
								items={usersQuery.data}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								page={page}
								rowsPerPage={rowsPerPage}
							/>
						)}
					</Stack>
				</Container>
			</Box>
			{showModal && (
				<CreateNewUserDialog
					id='new-user-menu'
					keepMounted
					open={showModal}
					onClose={() => setShowModal(false)}
				/>
			)}
		</Layout>
	);
};

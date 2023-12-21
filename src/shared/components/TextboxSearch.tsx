import { FC, ChangeEvent } from 'react';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { Icons } from '@/shared/components/Icons';

interface Props {
	value: string;
	placeholder: string;
	onChange: (_e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextBoxSearch: FC<Props> = ({
	value = '',
	placeholder = '',
	onChange = () => {}
}) => {
	return (
		<Card sx={{ p: 2 }}>
			<OutlinedInput
				defaultValue=''
				fullWidth
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				startAdornment={
					<InputAdornment position='start'>
						<SvgIcon color='action' fontSize='small'>
							<Icons.search />
						</SvgIcon>
					</InputAdornment>
				}
				sx={{ maxWidth: 500 }}
			/>
		</Card>
	);
};

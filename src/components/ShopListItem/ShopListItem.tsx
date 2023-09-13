import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ListItemAvatar, Avatar, ListItem, ListItemText } from '@mui/material';

import ShopCategoryIcon from '../ShopCategoryIcon';

interface shopListItemProps {
	shopId: number;
	shopName: string;
	shopType: number;
	shopNationCode: string;
}

function ShopListItem({ shopId, shopType, shopName, shopNationCode }: shopListItemProps) {
	const navigate = useNavigate();
	const modifyItem = () => {
		console.log('수정');
		navigate('/shop/form', {
			state: {
				isModify: true,
				shopId: shopId,
				shopType: shopType,
				shopName: shopName,
				shopNationCode: shopNationCode,
			},
		});
	};
	return (
		<ListItem
			sx={{
				borderBottom: 1,
				borderColor: '#d9d9d9',
				paddingY: 2,
				cursor: 'pointer',
				':hover': {
					background: '#efefef',
				},
			}}
			onClick={modifyItem}
		>
			<ListItemAvatar>
				<Avatar sx={{ background: '#95D6FF' }}>
					<ShopCategoryIcon category={shopType} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={shopName} />
		</ListItem>
	);
}

export default ShopListItem;

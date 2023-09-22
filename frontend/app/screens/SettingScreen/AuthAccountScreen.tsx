import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { TextStyles } from '../../styles/CommonStyles';

function AuthAccountScreen() {
	const [name, setName] = useState('');
	const reset = () => {
		setName('');
	};
	return (
		<View style={styles.viewContainer}>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold', mBottom: 5 }).title }}>
				인증하신 계좌로 1원을 입금하였습니다.
			</Text>
			<Text style={{ ...TextStyles({ align: 'left', mBottom: 10, color: '#666666' }).regular }}>
				입금내역에 표시된 숫자 4자리를 입력해주세요.
			</Text>
			<Image style={styles.img} source={require('../../assets/images/1won.png')} />
			<View style={styles.sectionView}>
				<View style={styles.inputBox}>
					<TextInput
						style={styles.input}
						value={name}
						onChangeText={setName}
						keyboardType="number-pad"
						textAlign="center"
					/>
					<TextInput
						style={styles.input}
						value={name}
						onChangeText={setName}
						keyboardType="number-pad"
						textAlign="center"
					/>
					<TextInput
						style={styles.input}
						value={name}
						onChangeText={setName}
						keyboardType="number-pad"
						textAlign="center"
					/>
					<TextInput
						style={styles.input}
						value={name}
						onChangeText={setName}
						keyboardType="number-pad"
						textAlign="center"
					/>
				</View>
				<Button mode="elevated" style={styles.button} textColor="#ffffff">
					확인
				</Button>
				<Text
					style={{
						...TextStyles({ align: 'center', color: '#666666', mTop: 10 }).small,
					}}
				>
					입금내역이 없다면 등록하신 계좌 정보를 다시 확인해주세요.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
	},
	sectionView: {
		flexGrow: 1,
		justifyContent: 'flex-start',
	},
	inputBox: {
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 60,
		justifyContent: 'space-around',
	},
	input: {
		...TextStyles().regular,
		flex: 1,
		borderWidth: 2,
		borderRadius: 16,
		borderColor: '#91C0EB',
		marginHorizontal: 20,
	},
	img: {
		alignSelf: 'center',
		width: '90%',
		// height: 50,
		resizeMode: 'contain',
		// marginVertical: 50,
	},
	button: {
		backgroundColor: '#91C0EB',
		shadowColor: 'transparent',
	},
});
export default AuthAccountScreen;

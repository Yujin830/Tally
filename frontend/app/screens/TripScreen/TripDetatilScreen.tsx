import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Chip, Text } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../api/api';
import DetailListItem from '../../components/DetailList/DetailListItem';
import { Payment } from '../../model/payment';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'TripDetail'>;

function TripDetailScreen({ navigation, route }: TripDetailScreenProps) {
	interface OrderTypeSelectItem {
		label: string;
		value: string;
	}
	const [payData, setPayData] = useState<Payment[]>([]);
	const currentDate = new Date();
	const [modalVisible, setModalVisible] = useState(false);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
	const day = currentDate.getDate();
	const { id, title, location, type, startDay, endDay, travelParticipants } = route.params || {};
	const [orderType, setOrderType] = useState('오래된 순');

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const res = await api.get(`/payment/${id}`);

					if (res.status === 200) {
						const payList = res.data;

						setPayData((prevPayData) => [...prevPayData, ...payList]);
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchData(); // 화면이 focus될 때마다 데이터를 가져옴
			console.log(payData);
		}, []), // 두 번째 인자는 종속성 배열. 빈 배열이면 최초 렌더링 때만 실행됨.
	);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Icon name="chevron-left" size={50} color="black" />
				<View style={styles.header_button_group}>
					<Button
						style={styles.button}
						mode="text"
						labelStyle={TextStyles().regular}
						onPress={() => console.log('Pressed')}
					>
						정산 현황
					</Button>
					<Button
						style={styles.button}
						labelStyle={TextStyles().regular}
						mode="text"
						onPress={() => console.log('Pressed')}
					>
						분석
					</Button>
				</View>
			</View>

			<View style={styles.title_box}>
				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						flexWrap: 'wrap',
					}}
				>
					<Text style={TextStyles().title}>{title}</Text>
					<Text style={[TextStyles().small, styles.type]}>{type}</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						flexWrap: 'wrap',
					}}
				>
					<Text style={TextStyles().regular}>
						{startDay}~{endDay}
					</Text>
				</View>
			</View>
			<View style={styles.party_box}>
				<Icon name="face" size={30} color="green" />
				<Icon name="face" size={30} color="green" />
				<Button
					icon="plus"
					style={styles.button}
					mode="text"
					labelStyle={TextStyles().regular}
					onPress={() => console.log('Pressed')}
				>
					일행 추가
				</Button>
			</View>
			<View style={styles.center_box}>
				<Text style={[TextStyles().small, styles.end_date]}>
					현재 날짜: {year}-{month}-{day}
				</Text>
				<Text style={[TextStyles().header, styles.balance]}>500,00원</Text>
			</View>
			<View style={styles.body_button_group}>
				<Button
					icon="plus"
					style={styles.button}
					labelStyle={TextStyles().regular}
					mode="text"
					onPress={() =>
						navigation.navigate('AddPayment', {
							id,
							title,
							location,
							type,
							startDay,
							endDay,
							travelParticipants,
						})
					}
				>
					내역 추가
				</Button>
				<Button
					style={styles.button}
					labelStyle={TextStyles().regular}
					mode="text"
					onPress={() => console.log('Pressed')}
				>
					정산
				</Button>
			</View>
			{/* <DropDownPicker
				open={openOrderType}
				value={orderType}
				items={orderTypeItems}
				setOpen={setOpenOrderType}
				setValue={setOrderType}
				setItems={setOrderTypeItems}
				textStyle={TextStyles().small}
				placeholder={orderType}
				style={styles.selectInput}
			/> */}
			<View style={styles.order_button}>
				<Button onPress={() => setModalVisible(!modalVisible)}>{orderType}</Button>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModalVisible(!modalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							정렬
						</Text>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setModalVisible(!modalVisible)}
						/>
					</View>
					<View style={styles.order_type_container}>
						<Button
							style={styles.order_type}
							mode="elevated"
							buttonColor="#91C0EB"
							textColor="white"
							onPress={() => {
								setOrderType('최신순');
								setModalVisible(!modalVisible);
							}}
						>
							최신순
						</Button>

						<Button
							style={styles.order_type}
							mode="elevated"
							buttonColor="#91C0EB"
							textColor="white"
							onPress={() => {
								setOrderType('오래된 순');
								setModalVisible(!modalVisible);
							}}
						>
							오래된 순
						</Button>
					</View>
				</View>
			</Modal>
			<TouchableOpacity style={styles.detail_item_box}>
				<Text>여행 준비</Text>
				<DetailListItem
					title={'런던 센텀 호텔'}
					time={'21:17'}
					balance={300000}
					party={'김싸피, 이싸피, 김호피'}
					abroad={false}
				/>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	order_type: {
		width: 350,
		padding: 10,
		margin: 10,
	},
	order_type_container: {
		padding: 50,
		alignItems: 'center',
	},
	modalView: {
		marginTop: '100%',
		height: '100%',
		// flex: 1,
		width: '100%',
		alignSelf: 'stretch',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		// alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	order_button: {
		flexDirection: 'row',
	},
	container: {
		flexDirection: 'column',
		paddingTop: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
	selectInput: {
		borderWidth: 0,
		borderBottomWidth: 0,
		width: 150,
	},
	center_box: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 50,
	},
	end_date: {
		alignItems: 'center',
	},
	party_box: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	title_box: {
		padding: 10,
	},
	detail_item_box: {
		padding: 10,
	},
	body_button_group: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	balance: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	period: {
		fontSize: 13,
	},
	title: {
		fontSize: 30,
	},
	type: {
		alignSelf: 'flex-end',
	},
	button: {
		padding: 0,
		borderRadius: 20,
		flexWrap: 'wrap',
	},
	header_button_group: {
		flexDirection: 'row',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
export default TripDetailScreen;

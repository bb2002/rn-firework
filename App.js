import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Kontakt from "react-native-kontaktio"
import { useSelector, useDispatch } from 'react-redux';
import 'react-native-gesture-handler'
import Intro from './pages/Intro'
import EscapeHelperCont from "./container/EscapeHelper.cont"
import { newBeaconDetected, noBeaconDetected } from './modules/Beacon';
import { loadBuildingMainPage, noBeaconMainPage } from "./modules/BuildingMainPage"
import UserManual from './pages/user/UserManual';
import AddMap from './pages/user/AddMap';
import SearchMap from './pages/user/SearchMap';
import SignUpPage from './pages/user/SignUp';
import LoginCont from './container/Login.cont';
import AdminMenu from './pages/admin/AdminMenu';
import SearchStatus from './pages/admin/SearchStatus';
import ControlRoom from './pages/admin/ControlRoom';
import Building from './pages/admin/Building';
import AddMapAdmin from './pages/admin/AddMapAdmin';
import SearchMapAdmin from './pages/admin/SearchMapAdmin';
import Manual from './pages/admin/Manual';
import MenuCont from "./container/Menu.cont"


const {connect, startScanning} = Kontakt
const Stack = createStackNavigator();

// React navigation 관련 처리
const optionsOfNoHeader = {
    headerShown: false
}

const beaconSetup = async () => {
	await connect()
	await startScanning()
	console.log(">> Start Scanning...")
}

const App = () => {
	const dispatch = useDispatch()

	const { screenMode, beacon } = useSelector(({ screenMode, beacon }) => ({
		screenMode, beacon
	}))

	useEffect(() => {
		// Beacon 업데이터 실행
		DeviceEventEmitter.addListener("beaconsDidUpdate", ({ beacons }) => {
			beacons.forEach(beacon => {
				// 감지된 비콘 목록 중 가장 가까운 것을 선정하여 등록
				dispatch(newBeaconDetected(beacon))
			});
		})

		DeviceEventEmitter.addListener("beaconDidDisappear", (disappearBeacon) => {
			dispatch(noBeaconDetected(disappearBeacon))
		})
	}, [])

	useEffect(() => {
		if(beacon.uuid) {
			// 비콘이 있는 경우
			dispatch(loadBuildingMainPage(beacon.uuid))
		} else {
			// 비콘이 없는 경우
			dispatch(noBeaconMainPage())
		}
	}, [beacon.uuid])

	return (
		<>
			{
				screenMode.screen === "intro" && (
					<Intro beaconSetup={beaconSetup} />
				)
			}

			{
				screenMode.screen === "user" && (
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Menu">
							<Stack.Screen name="Menu" component={MenuCont} options={optionsOfNoHeader}/>
							<Stack.Screen name="EscapeHelper" component={EscapeHelperCont} options={{ headerTitle: "피난 도우미" }}/>
							<Stack.Screen name="SignUp" component={SignUpPage} options={{ headerTitle: "사용자 등록" }}/>
							<Stack.Screen name="AddMap" component={AddMap} options={{ headerTitle: "피난 안내도 등록" }}/>
							<Stack.Screen name="SearchMap" component={SearchMap} options={{ headerTitle: "피난 안내도 검색" }}/>
							<Stack.Screen name="UserGuide" component={UserManual} options={{ headerTitle: "이용 안내" }}/>
						</Stack.Navigator>
					</NavigationContainer>
				)
			}
			
			{
				screenMode.screen === "admin" && (
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Login">
							<Stack.Screen name="Login" component={LoginCont} options={{ headerTitle: "관리자 모드" }}/>
							<Stack.Screen name="Menu" component={AdminMenu} options={optionsOfNoHeader}/>
							<Stack.Screen name="SearchStatus" component={SearchStatus} options={{ headerTitle: "상황 검색" }}/>
							<Stack.Screen name="ControlRoom" component={ControlRoom} options={{ headerTitle: "방재실/수신반 관리" }}/>
							<Stack.Screen name="Building" component={Building} options={{ headerTitle: "건물 이력 관리" }}/>
							<Stack.Screen name="AddMapAdmin" component={AddMapAdmin} options={{ headerTitle: "피난 안내도 등록" }}/>
							<Stack.Screen name="SearchMapAdmin" component={SearchMapAdmin} options={{ headerTitle: "피난 안내도 검색" }}/>
							<Stack.Screen name="Manual" component={Manual} options={{ headerTitle: "관리모드 사용법" }}/>
						</Stack.Navigator>
					</NavigationContainer>
				)
			}
		</>
	)	
	
};

export default App;

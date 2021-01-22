import React, { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Kontakt from "react-native-kontaktio"
import { useSelector, useDispatch } from 'react-redux';
import 'react-native-gesture-handler'
import Intro from './pages/Intro'
import Menu from './pages/user/Menu';
import EscapeHelperCont from "./container/EscapeHelper.cont"
import { newBeaconDetected, noBeaconDetected } from './modules/Beacon';
import UserGuide from './pages/user/UserGuide';
import AddMap from './pages/user/AddMap';
import SearchMap from './pages/user/SearchMap';
import SignUpPage from './pages/user/SignUp';
import LoginCont from './container/Login.cont';


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

	const { screenMode } = useSelector(({ screenMode }) => ({
		screenMode
	}))

	useEffect(() => {
		DeviceEventEmitter.addListener("beaconsDidUpdate", ({ beacons, region }) => {
			if(beacons.length === 0) {
				// 감지된 비콘이 없는 경우
				dispatch(noBeaconDetected())
			} else {
				beacons.forEach(beacon => {
					// 새로운 비콘을 감지 함
					dispatch(newBeaconDetected(beacon))
				});
			}
		})
	}, [])

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
							<Stack.Screen name="Menu" component={Menu} options={optionsOfNoHeader}/>
							<Stack.Screen name="EscapeHelper" component={EscapeHelperCont} options={{ headerTitle: "피난 도우미" }}/>
							<Stack.Screen name="SignUp" component={SignUpPage} options={{ headerTitle: "사용자 등록" }}/>
							<Stack.Screen name="AddMap" component={AddMap} options={{ headerTitle: "피난 안내도 등록" }}/>
							<Stack.Screen name="SearchMap" component={SearchMap} options={{ headerTitle: "피난 안내도 검색" }}/>
							<Stack.Screen name="UserGuide" component={UserGuide} options={{ headerTitle: "이용 안내" }}/>
						</Stack.Navigator>
					</NavigationContainer>
				)
			}
			
			{
				screenMode.screen === "admin" && (
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Login">
							<Stack.Screen name="Login" component={LoginCont} options={{ headerTitle: "관리자 모드" }}/>
						</Stack.Navigator>
					</NavigationContainer>
				)
			}
		</>
	)	
	
};

export default App;

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import GlobalContextProvider from '@/context/GlobalContext';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
	const [fontsLoaded, error] = useFonts({
		'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
		'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
		'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
		'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
	});

	useEffect(() => {
		if (error) throw new Error('Fonts not loaded');
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded) return null;
	if (!fontsLoaded && !error) return null;

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerShown: false,
					headerStyle: {
						backgroundColor: '#fff',
					},
				}}
			/>
			<Stack.Screen name='(auth)' options={{ headerShown: false }} />
		</Stack>
	);
};

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<GlobalContextProvider>
				<MainLayout />
			</GlobalContextProvider>
		</GestureHandlerRootView>
	);
}

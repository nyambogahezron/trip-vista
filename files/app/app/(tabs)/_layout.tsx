import Colors from '@/constants/Colors';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
	return (
		<Tabs
			initialRouteName='index'
			screenOptions={{
				tabBarShowLabel: true,
				tabBarInactiveTintColor: Colors.black,
				tabBarActiveTintColor: '#ff7f36',
				tabBarStyle: {
					backgroundColor: '#fff',
					borderTopWidth: 0,
					borderTopColor: 'transparent',
					borderRadius: 25,
					bottom: 6,
					width: '96%',
					marginHorizontal: '2%',
					height: 60,
					position: 'absolute',
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
				},

				tabBarLabelStyle: {
					fontSize: 11,
					fontFamily: 'poppins-bold',
					fontWeight: 'bold',
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					headerShown: false,
					title: 'Explore',

					tabBarIcon: ({ color }) => (
						<Ionicons size={25} name='compass' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='categories'
				options={{
					title: 'Categories',
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={25} name='space-dashboard' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => (
						<Ionicons
							size={24}
							name='search-outline'
							color='#000'
							className='font-pblack text-black'
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='bookmark'
				options={{
					title: 'Bookmark',
					tabBarIcon: ({ color }) => (
						<Ionicons size={25} name='bookmark' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<FontAwesome size={25} name='user' color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

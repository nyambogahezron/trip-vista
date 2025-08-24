import React, { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TravelGroups from '@/components/TravelGroups';
import SearchInput from '@/components/SearchInput';
import TopRated from '@/components/TopRated';
import ListingsItems from '@/components/ListingsItems';
import CategoriesButtons from '@/components/CategoriesButtons';
import { AnimatedFlashList } from '@shopify/flash-list';
const HomePage = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [showCategories, setShowCategories] = useState<boolean>(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	async function onRefresh() {
		const timer = setTimeout(() => {
			setLoading(false);
			return () => clearTimeout(timer);
		}, 1000);
	}

	const data = [
		{
			key: 'topRated',
			component: <TopRated />,
		},
		{
			key: 'list',
			component: <ListingsItems />,
		},
	];

	return (
		<SafeAreaView className='bg-bgColor flex-1'>
			<StatusBar barStyle='dark-content' backgroundColor='#f3f3f3' />

			<Stack.Screen
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#f3f3f3',
					},
					headerTintColor: '#000',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					header: () => (
						<View
							style={{
								height: 65,
							}}
							className='flex-row items-center w-full justify-between'
						>
							{showCategories ? (
								<CategoriesButtons
									setSelectedCategory={() => {}}
									selectedCategory='All'
								/>
							) : (
								<SearchInput />
							)}
						</View>
					),
				}}
			/>

			<AnimatedFlashList
				refreshing={false}
				onRefresh={onRefresh}
				data={data}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => <View>{item.component}</View>}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				ListFooterComponent={() => (
					<View>
						<TravelGroups />
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default HomePage;

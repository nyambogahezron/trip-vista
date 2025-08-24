import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LoadingScreen from '@/components/LoadingScreen';
import { useGlobalContext } from '@/context/GlobalContext';
import ListingCard from './ListingCard';
import { AnimatedFlashList } from '@shopify/flash-list';

export default function TopRated() {
	const [isLoading, setLoading] = useState<boolean>(true);
	const { listingsData } = useGlobalContext();

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

	return (
		<View className='bg-bgColor flex-1 px-2'>
			<View className='py-2 px-4'>
				<Text className='text-xl font-rbold leading-5 text-orange-500'>
					Top Rated
				</Text>
			</View>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<AnimatedFlashList
					horizontal
					refreshing={false}
					onRefresh={onRefresh}
					data={listingsData.slice(0, 10)}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => <ListingCard item={item} key={item.id} />}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				/>
			)}
		</View>
	);
}

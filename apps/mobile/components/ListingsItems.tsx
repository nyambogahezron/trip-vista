import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoadingScreen from '@/components/LoadingScreen';
import Animated from 'react-native-reanimated';
import { useGlobalContext } from '@/context/GlobalContext';
import CategoriesButtons from './CategoriesButtons';
import ListingCard from './ListingCard';

export default function ListingsItems() {
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [isLoading, setLoading] = useState<boolean>(true);
	const { listingsData } = useGlobalContext();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<View className='bg-bgColor flex-1 px-2'>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<Animated.FlatList
					refreshing={false}
					data={listingsData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ListingCard
							item={item}
							key={item.id}
							customCardStyle='w-full px-1'
							customImageStyle='w-full'
						/>
					)}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					ListHeaderComponent={() => (
						<CategoriesButtons
							setSelectedCategory={setSelectedCategory}
							selectedCategory={selectedCategory}
						/>
					)}
					stickyHeaderIndices={[0]}
				/>
			)}
		</View>
	);
}

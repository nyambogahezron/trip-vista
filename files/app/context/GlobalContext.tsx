import {
	generateListingsData,
	generateReviewsData,
	generateTravelGroupsData,
} from '@/utils/generate-dumy-data';
import { ListingProps, Review, TravelGroup } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext<any>(null);

export default function GlobalContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [listingsData, setListingsData] = useState<ListingProps[]>([]);
	const [reviewsData, setReviewsData] = useState<Review[]>([]);
	const [travelGroupsData, setTravelGroupsData] = useState<TravelGroup[]>([]);

	useEffect(() => {
		setListingsData(generateListingsData());

		setReviewsData(generateReviewsData());

		setTravelGroupsData(generateTravelGroupsData());
	}, []);

	const value = {
		listingsData,
		reviewsData,
		travelGroupsData,
	};
	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
}

export function useGlobalContext() {
	return useContext(GlobalContext);
}

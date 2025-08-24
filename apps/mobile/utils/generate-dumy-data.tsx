import { faker } from '@faker-js/faker';
import { CategoryProp, ListingProps, Review, TravelGroup, User } from '@/types';

export function RadomUser(): User {
	return {
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		image: faker.image.avatar(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
		location: faker.location.city(),
		bio: faker.lorem.paragraph(),
		avatar: faker.image.avatar(),
	};
}

export function RadomListing(): ListingProps {
	const data = {
		id: faker.string.uuid(),
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		location: faker.location.city(),
		image: faker.image.url(),
		category: faker.commerce.department() as CategoryProp,
		description: faker.lorem.paragraphs(3),
		rating: faker.number.int({ min: 1, max: 5 }),
		duration: faker.date.recent().toISOString(),
	};
	return JSON.parse(JSON.stringify(data));
}

export function RadomReview(): Review {
	return {
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		image: faker.image.avatar(),
		rating: faker.number.int({ min: 1, max: 5 }),
		review: faker.lorem.paragraph(),
		user: RadomUser(),
	};
}

export function RadomTravelGroup(): TravelGroup {
	return {
		id: faker.string.uuid(),
		name: faker.company.name(),
		image: faker.image.avatar(),
		rating: faker.number.float({ min: 1, max: 5 }),
		reviews: faker.number.int({ min: 100, max: 5000 }),
	};
}

export function generateListingsData(): ListingProps[] {
	return new Array(30).fill(null).map(() => RadomListing());
}

export function generateReviewsData(): Review[] {
	return new Array(50).fill(null).map(() => RadomReview());
}

export function generateTravelGroupsData(): TravelGroup[] {
	return new Array(10).fill(null).map(() => RadomTravelGroup());
}

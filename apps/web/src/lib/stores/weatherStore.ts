import { atom } from 'nanostores';
import { CITIES_WEATHER_DATA, type CityWeather } from '$lib/data/weatherData';

// Selected city key atom ('new-delhi' | 'mumbai' | 'bengaluru')
export const activeCityId = atom<string>('new-delhi');

// Active alert modal state atom
export const isAlertModalOpen = atom<boolean>(false);

// Active unit atom ('C' | 'F')
export const tempUnit = atom<'C' | 'F'>('C');

// Derived active city weather data helper
export function getActiveCityWeather(): CityWeather {
	const currentId = activeCityId.get();
	return CITIES_WEATHER_DATA[currentId] ?? CITIES_WEATHER_DATA['new-delhi'];
}

export function setCity(cityId: string) {
	if (CITIES_WEATHER_DATA[cityId]) {
		activeCityId.set(cityId);
	}
}

export function toggleAlertModal(open?: boolean) {
	if (open !== undefined) {
		isAlertModalOpen.set(open);
	} else {
		isAlertModalOpen.set(!isAlertModalOpen.get());
	}
}

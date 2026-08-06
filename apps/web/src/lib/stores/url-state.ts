import { goto } from '$app/navigation';
import { page } from '$app/state';

export const defaultRegion = 'india';

export function selectedRegion(): string {
	return page.url.searchParams.get('region') ?? defaultRegion;
}

export function selectedDate(): string | null {
	return page.url.searchParams.get('date');
}

export function selectedZone(): string | null {
	return page.url.searchParams.get('zone');
}

export async function setSearchState(
	name: 'region' | 'date' | 'zone',
	value: string
): Promise<void> {
	const url = new URL(page.url);
	url.searchParams.set(name, value);
	// The URL is derived from the current route and preserves arbitrary query state.
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	await goto(url, { keepFocus: true, noScroll: true });
}

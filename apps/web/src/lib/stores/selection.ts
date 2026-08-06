import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type SelectionState = {
	region: string;
	date: string;
	zone: string;
};

const initialState: SelectionState = {
	region: browser
		? (new URLSearchParams(window.location.search).get('region') ?? 'India')
		: 'India',
	date: browser ? (new URLSearchParams(window.location.search).get('date') ?? '') : '',
	zone: browser ? (new URLSearchParams(window.location.search).get('zone') ?? 'central') : 'central'
};

export const selection = writable<SelectionState>(initialState);

export function updateSelection(next: Partial<SelectionState>): void {
	selection.update((current) => {
		const value = { ...current, ...next };
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set('region', value.region);
			url.searchParams.set('date', value.date);
			url.searchParams.set('zone', value.zone);
			history.replaceState(history.state, '', url);
		}
		return value;
	});
}

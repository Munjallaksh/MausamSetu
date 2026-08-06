import { createQuery } from '@tanstack/svelte-query';

import { getHealth } from './client';

export function useHealth() {
	return createQuery(() => ({
		queryKey: ['health'] as const,
		queryFn: getHealth,
		refetchInterval: 15_000,
		retry: 1
	}));
}

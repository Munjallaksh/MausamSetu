import { env } from '$env/dynamic/public';

import { healthSchema, type Health } from './schemas';

const apiBaseUrl = env.PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
const serviceBaseUrl = apiBaseUrl.replace(/\/api\/v1\/?$/, '');

export async function apiFetch<T>(
	path: string,
	schema: { parse: (value: unknown) => T }
): Promise<T> {
	const response = await fetch(`${apiBaseUrl}${path}`);
	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}
	return schema.parse(await response.json());
}

export async function getHealth(): Promise<Health> {
	const response = await fetch(`${serviceBaseUrl}/health`);
	if (!response.ok) {
		throw new Error(`Health request failed: ${response.status} ${response.statusText}`);
	}
	return healthSchema.parse(await response.json());
}

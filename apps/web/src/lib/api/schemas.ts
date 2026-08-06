import { z } from 'zod';

export const healthSchema = z.object({
	status: z.string(),
	api_version: z.string(),
	python_version: z.string(),
	torch_version: z.string(),
	cuda_available: z.boolean(),
	gpu_name: z.string().nullable(),
	vram_total_gb: z.number().nullable(),
	vram_used_gb: z.number().nullable(),
	model_loaded: z.boolean(),
	data_manifest: z.string().nullable(),
	ist_time: z.string()
});

export type Health = z.infer<typeof healthSchema>;

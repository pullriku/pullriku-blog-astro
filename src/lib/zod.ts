import type { z } from "astro/zod";

export function assertSchema<T, _TSchema extends z.ZodType<T>>() {}

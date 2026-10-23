import type { APIRoute } from 'astro';
import { buildLlmsTxt, textResponse } from '../llms';

export const GET: APIRoute = async ({ site }) => textResponse(await buildLlmsTxt(site!, false));

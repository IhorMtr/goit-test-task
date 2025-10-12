import { parseFilter } from '../helpers/parseFilter';
import { Camper } from '../types/camper';
import { Response } from '../types/response';
import { api } from './instance';

export async function getCampers(page = 1, limit = 4): Promise<Response> {
  const res = await api.get<Response>(`/campers?page=${page}&limit=${limit}`);
  return res.data;
}

export async function getFilteredCampers(
  filter: Record<string, any>,
  page = 1,
  limit = 4
): Promise<Response> {
  const parsedFilter = parseFilter(filter);

  const searchParams = new URLSearchParams({
    ...parsedFilter,
    page: String(page),
    limit: String(limit),
  }).toString();

  const res = await api.get<Response>(`/campers?${searchParams}`);
  return res.data;
}

export async function getCamperById(id: string): Promise<Camper> {
  const res = await api.get<Camper>(`/campers/${id}`);
  return res.data;
}

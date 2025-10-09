import { parseFilter } from '../helpers/parseFilter';
import { Camper } from '../types/camper';
import { api } from './instance';

export async function getCampers(): Promise<Camper> {
  const res = await api.get<Camper>('/campers');
  return res.data;
}

export async function getFilteredCampers(
  filter: Record<string, any>
): Promise<Camper> {
  const parsedFilter = parseFilter(filter);
  const searchParams = new URLSearchParams(parsedFilter).toString();

  console.log(searchParams);
  const res = await api.get<Camper>(`/campers?${searchParams}`);
  return res.data;
}

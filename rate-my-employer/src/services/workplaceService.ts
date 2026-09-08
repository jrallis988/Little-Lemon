import type { Workplace } from '../types';
import { apiRequest } from './apiClient';
import { seedWorkplaces } from '../data/seed';

export async function listWorkplaces(companyId: string): Promise<Workplace[]> {
  try {
    const result = await apiRequest<{ data: Workplace[] }>(
      `/api/workplaces?companyId=${encodeURIComponent(companyId)}`,
    );
    return result.data;
  } catch {
    return seedWorkplaces.filter((item) => item.companyId === companyId);
  }
}

export async function getWorkplace(id: string): Promise<Workplace | null> {
  try {
    return await apiRequest<Workplace>(`/api/workplaces/${id}`);
  } catch {
    return seedWorkplaces.find((item) => item.id === id) ?? null;
  }
}

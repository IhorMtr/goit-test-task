import { Filter } from '../types/filter';

const equipmentFilters = ['AC', 'TV', 'bathroom', 'automatic', 'kitchen'];

export function parseFilter(filter: Filter) {
  const equipmentArray = filter.equipment ?? [];

  const result: Record<string, any> = { ...filter };

  delete result.equipment;

  if (typeof result.location === 'string') {
    const trimmed = result.location.trim();
    if (trimmed === '') {
      delete result.location;
    } else {
      result.location = trimmed;
    }
  } else if (result.location == null) {
    delete result.location;
  }

  if (result.vehicleType === null) {
    delete result.vehicleType;
  } else {
    result.form = result.vehicleType;
    delete result.vehicleType;
  }

  for (const item of equipmentArray) {
    if (equipmentFilters.includes(item)) {
      result[item] = true;
    }
  }

  return result;
}

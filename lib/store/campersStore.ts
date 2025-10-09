import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleEquipment } from '../types/vehicleEquipment';
import { VehicleType } from '../types/vehicleType';
import { Camper } from '../types/camper';

interface CampersStore {
  filters: {
    location: string;
    vehicleEquipment: Partial<VehicleEquipment>;
    vehicleType: VehicleType;
  };
  favourites: string[];
  campers: Camper[];

  setFilters: (filters: CampersStore['filters']) => void;
  resetFilters: () => void;

  setLocation: (location: string) => void;
  setVehicleType: (type: VehicleType) => void;
  setVehicleEquipment: (equipment: Partial<VehicleEquipment>) => void;

  toggleFavourite: (id: string) => void;
  setCampers: (campers: Camper[]) => void;
}

type CampersData = Omit<
  CampersStore,
  | 'setFilters'
  | 'resetFilters'
  | 'setVehicleType'
  | 'setVehicleEquipment'
  | 'toggleFavourite'
  | 'setCampers'
  | 'setLocation'
>;

const initialStore: CampersData = {
  filters: {
    location: '',
    vehicleEquipment: {
      ac: false,
      automatic: false,
      kitchen: false,
      tv: false,
      bathroom: false,
    },
    vehicleType: null,
  },
  favourites: [],
  campers: [],
};

export const useCampersStore = create<CampersStore>()(
  persist(
    (set, get) => ({
      ...initialStore,

      setFilters: filters => set({ filters }),
      resetFilters: () => set({ filters: initialStore.filters }),

      setLocation: location =>
        set(state => ({
          filters: { ...state.filters, location },
        })),

      setVehicleType: type =>
        set(state => ({
          filters: { ...state.filters, vehicleType: type },
        })),

      setVehicleEquipment: equipment =>
        set(state => ({
          filters: {
            ...state.filters,
            vehicleEquipment: {
              ...state.filters.vehicleEquipment,
              ...equipment,
            },
          },
        })),

      setCampers: campers => set({ campers }),

      toggleFavourite: id => {
        const { favourites } = get();
        set({
          favourites: favourites.includes(id)
            ? favourites.filter(fav => fav !== id)
            : [...favourites, id],
        });
      },
    }),
    {
      name: 'campers-store',
      partialize: state => ({
        filters: state.filters,
        favourites: state.favourites,
        campers: state.campers,
      }),
    }
  )
);

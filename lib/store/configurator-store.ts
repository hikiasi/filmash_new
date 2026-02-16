import { create } from 'zustand';

interface ConfigState {
  selectedTrim: any | null;
  selectedColor: any | null;
  selectedWheels: any | null;
  selectedInterior: any | null;
  selectedSteeringWheel: any | null;
  selectedOptions: any[];

  setSelectedTrim: (trim: any) => void;
  setSelectedColor: (color: any) => void;
  setSelectedWheels: (wheels: any) => void;
  setSelectedInterior: (interior: any) => void;
  setSelectedSteeringWheel: (sw: any) => void;
  toggleOption: (option: any) => void;
  resetConfig: () => void;
}

export const useConfiguratorStore = create<ConfigState>((set) => ({
  selectedTrim: null,
  selectedColor: null,
  selectedWheels: null,
  selectedInterior: null,
  selectedSteeringWheel: null,
  selectedOptions: [],

  setSelectedTrim: (trim) => set({
    selectedTrim: trim,
    selectedColor: trim.colors?.[0] || null,
    selectedWheels: trim.wheels?.[0] || null,
    selectedInterior: trim.interiors?.[0] || null,
    selectedSteeringWheel: trim.steering_wheels?.[0] || null,
    selectedOptions: [],
  }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setSelectedWheels: (selectedWheels) => set({ selectedWheels }),
  setSelectedInterior: (selectedInterior) => set({ selectedInterior }),
  setSelectedSteeringWheel: (selectedSteeringWheel) => set({ selectedSteeringWheel }),
  toggleOption: (option) => set((state) => ({
    selectedOptions: state.selectedOptions.find(o => o.id === option.id)
      ? state.selectedOptions.filter(o => o.id !== option.id)
      : [...state.selectedOptions, option]
  })),
  resetConfig: () => set({
    selectedTrim: null,
    selectedColor: null,
    selectedWheels: null,
    selectedInterior: null,
    selectedSteeringWheel: null,
    selectedOptions: [],
  }),
}));

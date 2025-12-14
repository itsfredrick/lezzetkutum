import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlanConfig {
  personCount: 2 | 4;
  recipeCount: 3 | 4 | 5;
}

export interface MenuItem {
  id: string;
  quantity: number;
}

export interface DeliveryDetails {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  addressDetail: string;
  dateId: string; // e.g. "oct-14"
  timeId: string; // e.g. "morning"
  type: 'home' | 'work';
}

interface FunnelState {
  // Step 1: Plan
  planConfig: PlanConfig;
  setPlanConfig: (config:  Partial<PlanConfig>) => void;
  
  // Step 2: Menu
  menuSelection: MenuItem[];
  addMenuItem: (id: string, maxRecipes: number) => void;
  removeMenuItem: (id: string) => void;
  clearMenu: () => void;
  
  // Step 3: Delivery
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: (details: Partial<DeliveryDetails>) => void;
  
  // Actions
  resetFunnel: () => void;
  
  // Computed (Actions that return values effectively, or just state properties)
  totalPrice: number; // This might be better calculated in components or a selector if logic is complex
}

// Initial States
const defaultPlan: PlanConfig = { personCount: 2, recipeCount: 3 };
const defaultDelivery: DeliveryDetails = {
  firstName: '',
  lastName: '',
  phone: '',
  city: 'istanbul',
  district: 'kadikoy',
  neighborhood: '',
  addressDetail: '',
  dateId: 'oct-14',
  timeId: 'morning',
  type: 'home'
};

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      planConfig: defaultPlan,
      setPlanConfig: (config) => set((state) => ({ 
        planConfig: { ...state.planConfig, ...config } 
        // Note: Changing plan config might imply resetting menu selection if max count changes drastically, 
        // but for now we'll keep it simple or handle it in UI.
      })),

      menuSelection: [],
      addMenuItem: (id, maxRecipes) => set((state) => {
        const currentCount = state.menuSelection.reduce((acc, item) => acc + item.quantity, 0);
        if (currentCount >= maxRecipes) return state; // Block if full

        const existing = state.menuSelection.find(item => item.id === id);
        if (existing) {
          return {
            menuSelection: state.menuSelection.map(item => 
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { menuSelection: [...state.menuSelection, { id, quantity: 1 }] };
      }),
      removeMenuItem: (id) => set((state) => {
        const existing = state.menuSelection.find(item => item.id === id);
        if (existing && existing.quantity > 1) {
          return {
            menuSelection: state.menuSelection.map(item => 
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          };
        }
        return { menuSelection: state.menuSelection.filter(item => item.id !== id) };
      }),
      clearMenu: () => set({ menuSelection: [] }),

      deliveryDetails: defaultDelivery,
      setDeliveryDetails: (details) => set((state) => ({
        deliveryDetails: { ...state.deliveryDetails, ...details }
      })),

      resetFunnel: () => set({
        planConfig: defaultPlan,
        menuSelection: [],
        deliveryDetails: defaultDelivery
      }),
      
      totalPrice: 0, // Placeholder, usually computed in component based on real recipe data
    }),
    {
      name: 'lezzetkutum-funnel-storage',
    }
  )
);

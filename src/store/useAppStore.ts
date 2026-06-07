import { create } from 'zustand';
import { getPreference, setPreference } from '../lib/preferences';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  method: 'whatsapp' | 'email';
}

interface AppState {
  activeTab: string;
  isKeyboardOpen: boolean;
  isSheetOpen: boolean;
  isOffline: boolean;
  networkError: string | null;
  leads: Lead[];
  prefillName: string;
  prefillEmail: string;
  setActiveTab: (tab: string) => void;
  setKeyboardOpen: (open: boolean) => void;
  setSheetOpen: (open: boolean) => void;
  setOffline: (offline: boolean) => void;
  setNetworkError: (error: string | null) => void;
  addLead: (lead: Lead) => void;
  setPrefill: (name: string, email: string) => void;
  loadLeads: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'home',
  isKeyboardOpen: false,
  isSheetOpen: false,
  isOffline: false,
  networkError: null,
  leads: [],
  prefillName: '',
  prefillEmail: '',

  setActiveTab: (tab) => set({ activeTab: tab }),
  setKeyboardOpen: (open) => set({ isKeyboardOpen: open }),
  setSheetOpen: (open) => set({ isSheetOpen: open }),
  setOffline: (offline) => set({ isOffline: offline }),
  setNetworkError: (error) => set({ networkError: error }),

  addLead: async (lead) => {
    const updated = [lead, ...get().leads].slice(0, 50);
    set({ leads: updated });
    await setPreference('leads', JSON.stringify(updated));
    await setPreference('prefill_name', lead.name);
    await setPreference('prefill_email', lead.email);
    set({ prefillName: lead.name, prefillEmail: lead.email });
  },

  setPrefill: (name, email) => set({ prefillName: name, prefillEmail: email }),

  loadLeads: async () => {
    try {
      const leadsJson = await getPreference('leads');
      const name = await getPreference('prefill_name');
      const email = await getPreference('prefill_email');
      if (leadsJson) set({ leads: JSON.parse(leadsJson) });
      if (name || email) set({ prefillName: name || '', prefillEmail: email || '' });
    } catch {
      // fresh install, no data
    }
  },
}));

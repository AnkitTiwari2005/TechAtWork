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
  leads: Lead[];
  prefillName: string;
  prefillEmail: string;
  setActiveTab: (tab: string) => void;
  setKeyboardOpen: (open: boolean) => void;
  addLead: (lead: Lead) => void;
  setPrefill: (name: string, email: string) => void;
  loadLeads: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'home',
  isKeyboardOpen: false,
  leads: [],
  prefillName: '',
  prefillEmail: '',

  setActiveTab: (tab) => set({ activeTab: tab }),

  setKeyboardOpen: (open) => set({ isKeyboardOpen: open }),

  addLead: async (lead) => {
    const updated = [lead, ...get().leads].slice(0, 50); // keep last 50
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

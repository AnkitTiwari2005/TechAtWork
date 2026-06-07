// Capacitor Preferences wrapper with web localStorage fallback

let PreferencesPlugin: typeof import('@capacitor/preferences').Preferences | null = null;

async function getPlugin() {
  if (!PreferencesPlugin) {
    try {
      const mod = await import('@capacitor/preferences');
      PreferencesPlugin = mod.Preferences;
    } catch {
      PreferencesPlugin = null;
    }
  }
  return PreferencesPlugin;
}

export async function setPreference(key: string, value: string): Promise<void> {
  const plugin = await getPlugin();
  if (plugin) {
    await plugin.set({ key, value });
  } else {
    localStorage.setItem(key, value);
  }
}

export async function getPreference(key: string): Promise<string> {
  const plugin = await getPlugin();
  if (plugin) {
    const result = await plugin.get({ key });
    return result.value ?? '';
  } else {
    return localStorage.getItem(key) ?? '';
  }
}

export async function removePreference(key: string): Promise<void> {
  const plugin = await getPlugin();
  if (plugin) {
    await plugin.remove({ key });
  } else {
    localStorage.removeItem(key);
  }
}

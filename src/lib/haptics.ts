// Haptics wrapper with graceful web fallback

let HapticsPlugin: typeof import('@capacitor/haptics').Haptics | null = null;

async function getPlugin() {
  if (!HapticsPlugin) {
    try {
      const mod = await import('@capacitor/haptics');
      HapticsPlugin = mod.Haptics;
    } catch {
      HapticsPlugin = null;
    }
  }
  return HapticsPlugin;
}

export async function hapticLight(): Promise<void> {
  const plugin = await getPlugin();
  if (plugin) {
    try {
      const { ImpactStyle } = await import('@capacitor/haptics');
      await plugin.impact({ style: ImpactStyle.Light });
    } catch { /* no haptics on this device */ }
  }
}

export async function hapticMedium(): Promise<void> {
  const plugin = await getPlugin();
  if (plugin) {
    try {
      const { ImpactStyle } = await import('@capacitor/haptics');
      await plugin.impact({ style: ImpactStyle.Medium });
    } catch { /* no haptics */ }
  }
}

export async function hapticSuccess(): Promise<void> {
  const plugin = await getPlugin();
  if (plugin) {
    try {
      const { NotificationType } = await import('@capacitor/haptics');
      await plugin.notification({ type: NotificationType.Success });
    } catch { /* no haptics */ }
  }
}

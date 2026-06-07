import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.techatwork.app',
  appName: 'Tech@Work',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#131313',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#131313',
    },
    Keyboard: {
      resize: 'body' as any,
      style: 'dark' as any,
    },
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    overScrollMode: 'never',
  },
};

export default config;

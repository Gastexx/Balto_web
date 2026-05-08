import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.balto.app',
  appName: 'Balto',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

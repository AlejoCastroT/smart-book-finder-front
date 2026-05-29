// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en paralelo */
  fullyParallel: true,
  /* ... (otras configuraciones que vienen por defecto) ... */
  
  use: {
    baseURL: 'http://localhost:5173', // El puerto por defecto de Vite
    trace: 'on-first-retry',
  },

  /* Configurar navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Puedes dejar Firefox y WebKit habilitados si quieres probar en múltiples navegadores
  ],

  /* Levantar tu servidor local de desarrollo antes de las pruebas */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
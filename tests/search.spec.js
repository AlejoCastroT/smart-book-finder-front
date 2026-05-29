import { test, expect } from '@playwright/test';

test.describe('Buscador de Libros - Taller Final', () => {

  // Este bloque se ejecuta antes de cada prueba, abriendo la página
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // CASO 1 y 2: Búsqueda y visualización (El "Happy Path")
  test('Debe buscar un libro y visualizar el resultado correctamente', async ({ page }) => {
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() === 'fetch' || route.request().resourceType() === 'xhr') {
        await route.fulfill({ 
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            title: 'El Señor de los Anillos',
            author: 'J.R.R. Tolkien',
            publishedYear: 1954,
            editions: 5,
            coverUrl: ''
          }, {
            title: 'El Señor de los Anillos 2',
            author: 'J.R.R. Tolkien',
            publishedYear: 1955,
            editions: 4,
            coverUrl: ''
          }, {
            title: 'El Señor de los Anillos 3',
            author: 'J.R.R. Tolkien',
            publishedYear: 1956,
            editions: 3,
            coverUrl: ''
          }])
        });
      } else {
        await route.continue();
      }
    });

    await page.fill('input[name="title"]', 'El Señor de los Anillos');
    await page.selectOption('select[name="language"]', 'espanol');
    await page.click('button[type="submit"]');

    // Validamos que se visualice al menos el primer resultado
    const bookTitle = page.locator('.book-card h3').first();
    await expect(bookTitle).toHaveText('El Señor de los Anillos');
  });

  // CASO 3: Error por parámetros requeridos
  test('Debe mostrar error cuando no se envía título ni autor', async ({ page }) => {
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() === 'fetch' || route.request().resourceType() === 'xhr') {
        // Simulamos un error 400 Bad Request desde el backend
        await route.fulfill({ 
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ message: "Debe enviar título o autor" })
        });
      } else {
        await route.continue();
      }
    });

    // Hacemos clic en buscar sin llenar nada
    await page.click('button[type="submit"]');

    // Validamos que aparezca el mensaje de error en pantalla
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Debe enviar título o autor');
  });

  // CASO 4: Error por cantidad insuficiente de coincidencias (< 3)
  test('Debe mostrar error cuando no se encuentran mínimo 3 coincidencias', async ({ page }) => {
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() === 'fetch' || route.request().resourceType() === 'xhr') {
        // Simulamos la excepción de la regla de negocio del backend
        await route.fulfill({ 
          status: 404, // O el código HTTP que decidas usar en tu backend para esto
          contentType: 'application/json',
          body: JSON.stringify({ message: "No se encontraron mínimo 3 coincidencias" })
        });
      } else {
        await route.continue();
      }
    });

    await page.fill('input[name="title"]', 'Libro muy raro');
    await page.click('button[type="submit"]');

    // Validamos que la regla de negocio se refleje en el frontend
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('mínimo 3 coincidencias');
  });
});
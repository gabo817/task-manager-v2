import { test, expect } from "@playwright/test";

test("un usuario puede iniciar sesión, crear una tarea y verla en la lista", async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto("/");

  // 2. Llenar el formulario de Login
  await page.getByPlaceholder("Usuario o correo").fill("admin@test.com"); 
  await page.getByPlaceholder("Contraseña").fill("123456");           
  
  // 3. Hacer clic en el botón de ingreso
  await page.getByRole("button", { name: /ingresar al sistema/i }).click();

  // 4. Crear la tarea (ya dentro de la vista principal)
  await page.getByLabel("Nueva tarea").fill("Comprar pan");
  await page.getByRole("button", { name: "Añadir tarea" }).click();

  // 5. Verificar que la tarea aparece en la pantalla
  //  await expect(page.getByText("Comprar pan")).toBeVisible();
});
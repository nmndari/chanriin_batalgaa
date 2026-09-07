// 4 тест САНААТАЙГААР унагаах демо файл — trace viewer-ийн дасгалд зориулсан.
//
// playwright.config.ts-ийн testIgnore-оор ердийн ажиллагаанаас хасагдсан тул
// `npx playwright test` дээр 12 passed хэвээр байна.
//
// Дахин ажиллуулж trace үүсгэх бол config-оос testIgnore мөрийг түр хасаад:
//   npx playwright test failed-demo --trace on --project=chromium
//
// docs/ дэх нотолгоо:
//   fail-locator-not-found-trace.zip  ← алдаа 1
//   fail-element-missing-trace.zip    ← алдаа 4

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});

// АЛДАА 1 — ЛОКАТОР ОЛДОХГҮЙ
// 'garchig' гэсэн data-test сайтад байхгүй. Элемент бүр олдохгүй.
test('алдаа 1: локатор олдохгүй', async ({ page }) => {
  await expect(page.getByTestId('garchig')).toBeVisible();
});

// АЛДАА 2 — ЭЛЕМЕНТ БАЙГАА Ч ТЕКСТ ТААРАХГҮЙ
// Элемент олдоно, зүгээр утга нь 'Products' биш 'Бараанууд' гэж хүлээсэн.
test('алдаа 2: текст таарахгүй', async ({ page }) => {
  await expect(page.getByTestId('title')).toHaveText('Бараанууд');
});

// АЛДАА 3 — ТОО ТААРАХГҮЙ
// Сайтад 6 бараа байдаг, бид 10 гэж хүлээсэн.
test('алдаа 3: тоо таарахгүй', async ({ page }) => {
  await expect(page.getByTestId('inventory-item')).toHaveCount(10);
});

// АЛДАА 4 — ХҮЛЭЭХ ХУГАЦАА ДУУСАХ (timeout)
// Сагс хоосон байхад badge үүсдэггүй. Бид харагдахыг хүлээж 5 сек барина.
test('алдаа 4: timeout — хэзээ ч гарч ирэхгүй элемент', async ({ page }) => {
  await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
});

// SauceDemo (https://www.saucedemo.com) — нэвтрэх үйлдлийн автомат тест

// Locator стратеги: зөвхөн орчин үеийн, хэрэглэгчид харагдах шинжид
// тулгуурласан locator — getByRole, getByText, getByTestId, getByPlaceholder.

// test/expect — тест ба шалгалт бичих функцууд.
// Page — TypeScript төрөл, доорх login() функцийн параметрт хэрэглэнэ.
import { test, expect, type Page } from '@playwright/test';

// хэрэглэгч солиход зөвхөн энд засна.
const BASE_URL = 'https://www.saucedemo.com';
const USER = 'standard_user';
const PASSWORD = 'secret_sauce';


// Тест бүрт давтахгүйн тулд дундын функц үүсгэв..
async function login(page: Page, username: string, password: string) {
  // .fill() нь элемент бэлэн болтол автоматаар хүлээдэг — wait бичих шаардлагагүй.
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

// Playwright тест бүрт цоо шинэ хөтчийн контекст үүсгэдэг (cookie хоосон), 
// тиймээс тестүүд бие биедээ халдахгүй, зэрэг ажиллаж чадна.
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// ТЕСТ 1 — Амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  await login(page, USER, PASSWORD);

  // Нэг шалгалт хийвэл хуурамч "passed" гарах эрсдэлтэй тул 4 өнцгөөс баталгаажуулав.
  await expect(page).toHaveURL(/inventory\.html/);        // хаяг сольсон эсэх
  await expect(page.getByText('Products')).toBeVisible(); // текст харагдаж байгаа эсэх
  await expect(page.getByTestId('title')).toHaveText('Бараанууд'); // гарчиг яг таарах эсэх
  await expect(page.getByTestId('inventory-item')).toHaveCount(6); // 6 бараа ачаалагдсан эсэх
});

// ТЕСТ 2 — Буруу нууц үг
test('буруу нэвтрэх мэдээлэл оруулбал алдаа гарна', async ({ page }) => {
  await login(page, USER, 'buruu-password'); // нэр зөв, нууц үг санаатай буруу

  // Алдааны мессеж харагдсан эсэх.
  await expect(page.getByTestId('error')).toBeVisible();

  await expect(page.getByTestId('error')).toContainText(
    'Username and password do not match any user in this service',
  );

  // Хамгийн чухал шалгалт: алдаа гарсан ч хажуугаар нь нэвтрүүлээгүй байх ёстой.
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// ТЕСТ 3 — Сагсанд бараа нэмэх
test('нэвтэрсний дараа сагсанд бараа нэмэх', async ({ page }) => {
  // Бэлтгэл: нэвтэрч, барааны хуудсанд орсныг батална.
  await login(page, USER, PASSWORD);
  await expect(page.getByTestId('title')).toHaveText('Products');

  // Эхний төлөв: сагс хоосон байхад badge үүсдэггүй.
  await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();

  // "Add to cart" товч хуудсанд 6 байгаа тул шууд дарвал strict mode алдаа өгнө
  // (энэ нь буруу элемент дээр дарахаас хамгаана). 
  const backpack = page
    .getByTestId('inventory-item')
    .filter({ hasText: 'Sauce Labs Backpack' });
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  // Сагсны тоолуур 1 болсон эсэх.
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

  // Товч "Add to cart" → "Remove" болж хувирсан эсэх
  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
});


// ТЕСТ 4 — Системээс гарах

test('системээс гарах', async ({ page }) => {
  await login(page, USER, PASSWORD);
  await expect(page.getByTestId('title')).toHaveText('Products');
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Нэвтрэх формд буцаж ирсэн эсэхийг 2 элементээр батална.
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});

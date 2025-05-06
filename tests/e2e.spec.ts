import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:4200';
const user = {
  email: 'testuser@example.com',
  password: 'Test123',
};

test('Registration + Login + Add to Cart + View Cart', async ({ page }) => {
  // Clear localStorage before each test
  await page.goto(baseUrl);
  await page.evaluate(() => localStorage.clear());

  // Navigate to registration
  await page.goto(`${baseUrl}/signup`);
  await page.fill('input[formControlName="email"]', user.email);
  await page.fill('input[formControlName="password"]', user.password);
  await page.fill('input[formControlName="confirmPassword"]', user.password);
  await page.click('button:has-text("Sign Up")');

  await expect(page).toHaveURL(/.*login/);

  // Fill in login form
  await page.fill('input[formControlName="email"]', user.email);
  await page.fill('input[formControlName="password"]', user.password);
  await page.click('button:has-text("Login")');

  // Expect navigation to products page
  await expect(page).toHaveURL(/.*products/);

  // Add the first product to cart
  await page.locator('button', { hasText: 'Add to Cart' }).first().click();

  // Go to Cart
  await page.click('button:has-text("Cart")');

  // Expect to see the added product
  const cartItems = page.locator('ul li');
  await expect(cartItems).toHaveCount(1);
  await expect(cartItems.first()).toContainText('T-Shirt'); // Replace with actual product name if needed
});
//second test for wrong pass

test('Login fails with wrong password', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('input[formControlName="email"]', 'user@example.com');
  await page.fill('input[formControlName="password"]', 'wrongpass');
  await page.click('button:has-text("Login")');

  await expect(page.locator('text=Invalid email or password')).toBeVisible();
});

// third test check the amount of the cart
test('Cart total is correctly calculated', async ({ page }) => {
  const baseUrl = 'http://localhost:4200';
  const user = { email: 'carttest@example.com', password: 'Test123' };

  // Clear previous users
  await page.goto(baseUrl);
  await page.evaluate(() => localStorage.clear());

  // Sign up
  await page.goto(`${baseUrl}/signup`);
  await page.fill('input[formControlName="email"]', user.email);
  await page.fill('input[formControlName="password"]', user.password);
  await page.fill('input[formControlName="confirmPassword"]', user.password);
  await page.click('button:has-text("Sign Up")');
  await expect(page).toHaveURL(/.*login/);

  // Login
  await page.fill('input[formControlName="email"]', user.email);
  await page.fill('input[formControlName="password"]', user.password);
  await page.click('button:has-text("Login")');
  await expect(page).toHaveURL(/.*products/);

  // Add first two products
  const addButtons = await page.locator('button:has-text("Add to Cart")');
  await addButtons.nth(0).click(); // T-Shirt: 49.99
  await addButtons.nth(1).click(); // Sneakers: 199.99

  // Go to cart
  await page.click('button:has-text("Cart")');

  // Assert cart total = 49.99 + 199.99 = 249.98
  const totalText = await page.locator('text=Total:').textContent();
  const total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
  expect(total).toBeCloseTo(249.98, 2); // Allowing small floating-point deviation
});

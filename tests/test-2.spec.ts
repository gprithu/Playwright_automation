import { test, expect } from '@playwright/test';

test('Flipkart iPhone search flow', async ({ page }) => {

  await page.goto('https://www.flipkart.com/');

  // Close login popup if visible
  const closeBtn = page.locator('button:has-text("✕")');
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  // Search for product
  const searchBox = page.getByPlaceholder('Search for Products, Brands and More');
  await searchBox.fill('iphone 17');
  await searchBox.press('Enter');

  // Wait for results
  await page.waitForLoadState('networkidle');

  // Click on first product (better locator)
  const product = page.locator('a:has-text("iPhone")').first();

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    product.click()
  ]);

  // Wait for product page
  await newPage.waitForLoadState();

  // Select storage variant (example: 256 GB)
  const storageOption = newPage.locator('text=256 GB').first();
  await storageOption.click();

  // Assertion (example: check Add to Cart button visible)
  await expect(newPage.getByRole('button', { name: /add to cart/i }))
    .toBeVisible();

});

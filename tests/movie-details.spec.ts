import { test, expect } from '@playwright/test';

test.describe('Movie Details Page', () => {
  test('should display movie details correctly', async ({ page }) => {
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    await page.waitForLoadState('networkidle');
    
    // Click on the first movie
    await page.getByRole('link', { name: /Deadpool & Wolverine/ }).first().click();
    
    // Verify we're on the movie details page
    await expect(page).toHaveURL(/.*movie\?id=533535.*/);
    await expect(page).toHaveTitle(/Deadpool & Wolverine/);
    
    // Verify movie details are displayed
    await expect(page.getByRole('heading', { name: 'Deadpool & Wolverine', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Come together.', level: 2 })).toBeVisible();
    
    // Verify synopsis section
    await expect(page.getByRole('heading', { name: 'The Synopsis', level: 3 })).toBeVisible();
    await expect(page.getByText(/A listless Wade Wilson toils away/)).toBeVisible();
    
    // Verify cast section
    await expect(page.getByRole('heading', { name: 'The Cast', level: 3 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ryan Reynolds' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hugh Jackman' })).toBeVisible();
    
    // Verify genres section
    await expect(page.getByRole('heading', { name: 'The Genres', level: 3 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Action/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Comedy/ })).toBeVisible();
    
    // Verify recommended movies section
    await expect(page.getByRole('heading', { name: 'Recommended Movies', level: 2 })).toBeVisible();
    
    // Test back navigation
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/.*\?category=Popular&page=1/);
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
  });

  test('should navigate to cast member details', async ({ page }) => {
    await page.goto('https://debs-obrien.github.io/playwright-movies-app/movie?id=533535&page=1');
    await page.waitForLoadState('networkidle');
    
    // Click on a cast member
    await page.getByRole('link', { name: 'Ryan Reynolds' }).click();
    
    // Verify we're on the person details page
    await expect(page).toHaveURL(/.*person\?id=10859.*/);
  });

  test('should navigate to genre page', async ({ page }) => {
    await page.goto('https://debs-obrien.github.io/playwright-movies-app/movie?id=533535&page=1');
    await page.waitForLoadState('networkidle');
    
    // Click on a genre
    await page.getByRole('link', { name: /Action/ }).first().click();
    
    // Verify we're on the genre page
    await expect(page).toHaveURL(/.*genre\?id=28&name=Action.*/);
  });
});

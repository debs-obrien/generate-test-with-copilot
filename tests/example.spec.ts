import { test, expect } from '@playwright/test';

test('homepage shows popular movies', async ({ page }) => {
  await page.goto('https://debs-obrien.github.io/playwright-movies-app');

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');
  
  // Verify the main content structure
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "Popular" [level=1]
      - heading "movies" [level=2]
      - list "movies":
        - listitem "movie":
          - link "poster of Deadpool & Wolverine Deadpool & Wolverine rating":
            - img "poster of Deadpool & Wolverine"
            - heading "Deadpool & Wolverine" [level=2]
        - listitem "movie":
          - link "poster of Inside Out 2 Inside Out 2 rating":
            - img "poster of Inside Out 2"
            - heading "Inside Out 2" [level=2]
        - listitem "movie":
          - link "poster of Despicable Me 4 Despicable Me 4 rating":
            - img "poster of Despicable Me 4"
            - heading "Despicable Me 4" [level=2]
  `);
  
  // Verify specific movies are visible
  await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'movies' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Deadpool & Wolverine' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Inside Out 2' }).first()).toBeVisible();
  
  // Test navigation functionality
  await page.getByRole('link', { name: /Deadpool & Wolverine/ }).first().click();
  await expect(page).toHaveURL(/.*movie\?id=533535.*/);
  await expect(page.getByRole('heading', { name: 'Deadpool & Wolverine', level: 1 })).toBeVisible();
});

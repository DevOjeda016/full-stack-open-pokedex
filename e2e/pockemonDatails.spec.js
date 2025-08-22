import { test, describe, expect } from '@playwright/test'

const pokemons = [
  { name: 'bulbasaur', position: 'first' },
  { name: 'diglett', position: 'last' },
  { name: 'ivysaur', position: 'middle' },
]

describe('Pokedex pokemon details', () => {
  for (const pokemon of pokemons) {
    describe(`${pokemon.name} card`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/pokemon/${pokemon.name}`)
      })

      test('should display details', async ({ page }) => {
        await expect(page.getByText(pokemon.name)).toBeVisible()
      })

      test('should display correct navigation buttons', async ({ page }) => {
        // Home always visible
        await expect(page.getByText('home')).toBeVisible()

        if (pokemon.position === 'first') {
          await expect(page.getByText('next')).toBeVisible()
        } else if (pokemon.position === 'last') {
          await expect(page.getByText('next')).not.toBeVisible()
        } else {
          await expect(page.getByText('next')).toBeVisible()
          await expect(page.getByText('previous')).toBeVisible()
        }
      })
    })
  }
})

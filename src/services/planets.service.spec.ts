import { describe, expect, it, vi } from 'vitest'
import { getAllPlanets } from './planets.service'

const mockFetch = (mockedResponse: { ok: boolean, json?: () => void }) => {
  global.fetch = vi.fn().mockResolvedValueOnce(mockedResponse)
}

describe('Given planets service', () => {
  describe('When getAllPlanets is called', () => {
    describe('And request fails', () => {
      it('Then it should throw error', async () => {
        mockFetch({ ok: false })

        try {
          await getAllPlanets()
        } catch (error) {
          expect(error).toEqual({ ok: false })
        }
      })
    })

    describe('And request is successful', () => {
      it('Then it should return the response', async () => {
        const response = { ok: true, json: vi.fn() }
        mockFetch(response)

        await getAllPlanets()
        expect(response.json).toHaveBeenCalled()
      })
    })
  })
})

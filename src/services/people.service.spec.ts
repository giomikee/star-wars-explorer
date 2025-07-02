import { describe, expect, it, vi } from 'vitest'
import { getAllPeople } from './people.service'

const mockFetch = (mockedResponse: { ok: boolean, json?: () => void }) => {
  global.fetch = vi.fn().mockResolvedValueOnce(mockedResponse)
}

describe('Given people service', () => {
  describe('When getAllPeople is called', () => {
    describe('And request fails', () => {
      it('Then it should throw error', async () => {
        mockFetch({ ok: false })

        try {
          await getAllPeople()
        } catch (error) {
          expect(error).toEqual({ ok: false })
        }
      })
    })

    describe('And request is successful', () => {
      it('Then it should return the response', async () => {
        const response = { ok: true, json: vi.fn() }
        mockFetch(response)

        await getAllPeople()
        expect(response.json).toHaveBeenCalled()
      })
    })
  })
})

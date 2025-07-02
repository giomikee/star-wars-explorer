import { describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { useNavigation } from './useNavigation'

vi.mock('vue-router', async () => ({
  ...(await vi.importActual('vue-router')),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}))

describe('Feature: useNavigation composable', () => {
  describe('Given composable methods', () => {
    describe('When navigate method is called with "/planets" path', () => {
      it('Then it should navigate to "/planets" page', () => {
        const routerPushSpy = vi.spyOn(useRouter(), 'push')

        const { navigate } = useNavigation()

        navigate('/planets')

        expect(routerPushSpy).toHaveBeenCalledWith('/planets')
      })
    })
  })
})

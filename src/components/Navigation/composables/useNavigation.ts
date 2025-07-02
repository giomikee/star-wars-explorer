import { useRouter } from 'vue-router'

export function useNavigation () {
  const router = useRouter()

  const navigate = (path: string) => router.push(path)

  return { navigate }
}

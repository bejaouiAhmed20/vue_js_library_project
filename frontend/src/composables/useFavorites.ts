import { ref } from 'vue'

const favorites = ref<any[]>([])
let currentKey = 'favorites_guest'

// Function to refresh favorites when the user logs in/out
export const initFavorites = () => {
  const userId = localStorage.getItem('userId') ?? 'guest'
  currentKey = `favorites_${userId}`
  favorites.value = JSON.parse(localStorage.getItem(currentKey) ?? '[]')
}

// Initialize immediately on load
initFavorites()

const save = () => localStorage.setItem(currentKey, JSON.stringify(favorites.value))

export const useFavorites = () => {
  // Ensure we are in sync when the composable is called
  const currentUserId = localStorage.getItem('userId') ?? 'guest'
  if (currentKey !== `favorites_${currentUserId}`) {
    initFavorites()
  }

  const isFavorite = (bookId: number) =>
    favorites.value.some((b: any) => b.id === bookId)

  const addFavorite = (book: any) => {
    if (!isFavorite(book.id)) {
      favorites.value.push(book)
      save()
    }
  }

  const removeFavorite = (bookId: number) => {
    favorites.value = favorites.value.filter((b: any) => b.id !== bookId)
    save()
  }

  return { favorites, isFavorite, addFavorite, removeFavorite, initFavorites }
}

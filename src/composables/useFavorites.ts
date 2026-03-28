import { ref } from 'vue'

const userId = localStorage.getItem('userId') ?? 'guest'
const KEY = `favorites_${userId}`

// Reactive favorites list for the current user
const favorites = ref<any[]>(JSON.parse(localStorage.getItem(KEY) ?? '[]'))

const save = () => localStorage.setItem(KEY, JSON.stringify(favorites.value))

export const useFavorites = () => {
  const isFavorite = (bookId: number) =>
    favorites.value.some(b => b.id === bookId)

  const addFavorite = (book: any) => {
    if (!isFavorite(book.id)) {
      favorites.value.push(book)
      save()
    }
  }

  const removeFavorite = (bookId: number) => {
    favorites.value = favorites.value.filter(b => b.id !== bookId)
    save()
  }

  return { favorites, isFavorite, addFavorite, removeFavorite }
}

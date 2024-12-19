import { BookData } from "@/types"

export default async function fetchOneBook (
  id: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-nu-eight.vercel.app/book/${id}`

  try {
    const res = await fetch(url)
    if(!res.ok) {
      throw new Error()
    }
    return await res.json()
  } catch (err) {
    console.log(err)
    return null
  }
}
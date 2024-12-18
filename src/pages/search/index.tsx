import { ReactNode } from "react"
import SearchableLayout from "@/components/searchable-layout"
import BookItem from "@/components/book-item"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import fetchBooks from "@/lib/fetch-books"

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q
  const books = await fetchBooks(q as string)

  return {
    props: {
      books
    }
  }
}

export default function Search ({
  books
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return <div>
    {books.map(book => <BookItem key={book.id} {...book}></BookItem>)}
  </div>
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
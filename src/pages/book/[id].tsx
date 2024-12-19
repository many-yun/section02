import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'
import { useRouter } from 'next/router'

  export const getStaticPaths = () => {
    return {
      paths: [
        { params: {id: "1"} }, // 문자열로만 가능
        { params: {id: "2"} },
        { params: {id: "3"} },
      ],
      fallback: true // fallback : 대비책
      // false : 404 not found
      // 'blocking' SSR 방식
      // true : SSR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
    }
  }

  export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id
    const book = await fetchOneBook(Number(id))

    if(!book) {
      return {
        notFound: true, // 데이터가 없는 경우 404페이지로 리빌드
      }
    }

    return {
      props: {
        book
      },
    }
  }

export default function Page({
  book
}:InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if(router.isFallback) return "로딩중입니다."

  if(!book) return "문제가 발생했습니다. 다시 시도하세요."
  
  const {
    id, title, subTitle, description, author, publisher, coverImgUrl
  } = book

  return <div className={style.container} key={id}>
    <div style={{backgroundImage:`url('${coverImgUrl}')`}} className={style.cover_img_container}>
      <img src={coverImgUrl} alt="" />
    </div>
    <div className={style.title}>{title}</div>
    <div className={style.subTitle}>{subTitle}</div>
    <div className={style.author}>{author} | {publisher}</div>
    <div className={style.description}>{description}</div>
  </div>
}
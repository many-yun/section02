import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from './searchable-layout.module.css'

export default function SearchableLayout ({ children }: {
  children: ReactNode
}) {
  
  const router = useRouter()
  const [search, setSearch] = useState('')

  const q = router.query.q as string

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // <HTMLInputElement> : 리액트에서 html의 input 엘리먼트에서 발생한 이벤트 타입
    
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onChange={onChangeSearch} type="text" placeholder="검색어를 입력하세요.." 
        onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}
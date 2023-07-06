import React from 'react'
import {Body, Header} from '../components'
import {useLocation, useParams, useSearchParams} from 'react-router-dom' // react hook 함수

// useLocation : 현재 브라우저 url 위치 값을 가져옴
// useParams : url에 params 값을 접근하는 데 사용 (객체의 형태로 가져옴)
// useSearchParams : url의 query값을 매개변수로 가져올 때 사용 (문자열 해석)

const Detail = () => {
  let temp = [
    {
      num : 10,
      name : '셔츠'
    },
    {
      num : 20,
      name : '바지'
    },
    {
      num : 30,
      name : '모자'
    },
    {
      num: 40,
      name : '장갑'
    }
  ]

  const location = useLocation();
  console.log(location); // {pathname: '/detail/1/10/%EC%85%94%EC%B8%A0', search: '', hash: '', state: null, key: '9w42zl56'}
  const params = useParams();
  console.log(params); // {id: '1', num: '10', name: '셔츠'}
  const [query, setQuery] = useSearchParams(); // /detail/1/10/셔츠?id=1
  console.log(query.get("id")); // 1 (쿼리문의 키에 대한 값을 가져옴)

  return (
    <div>
      <Header name={'Detail'}></Header>
      <div>
        {temp && temp[params.id - 1].num}번
        {temp && temp[params.id - 1].name}
      </div>
    </div>
  )
}

export default Detail

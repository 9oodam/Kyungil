import React from 'react'
import Input from './Input'
import List from './List'
import {useState, useEffect} from 'react'

const Container = () => {
    const [isFinish, setFinish] = useState(false);
    const [list, setList] = useState([]);
    useEffect(() => {
        console.log("전체 : ", list);
    }, [list]);
  

    return (
        <div className='container'>
        <Input list={list} setList={setList} />
        <List list={list} setList={setList} isFinish={isFinish} setFinish={setFinish}  />
        </div>
    )
}

export default Container

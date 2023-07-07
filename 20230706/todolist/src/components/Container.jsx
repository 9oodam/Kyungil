import React from 'react'
import Input from './Input'
import List from './List'
import {useState, useEffect} from 'react'

const Container = ({list, setList}) => {
    return (
        <div className='container'>
        <Input list={list} setList={setList} />
        <List list={list} setList={setList}  />
        </div>
    )
}

export default Container

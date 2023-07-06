import React from 'react'
import Subject from './Subject'
import Button from './Button'
import { useEffect } from 'react';

const ListItem = ({value, index, del}) => {
    return (
        <div className='list-item'>
            <div className='index'>{index+1}</div>
            <div className='title'>{value.title}</div>
            <div className='date'>{value.today} ~ {value.due}</div>
            <div className='content'>{value.content}</div>

            <div className='delBtn' onClick={() => {del(index)}}>
                <Button btn={'X'} />
            </div>
        </div>
    )
}

const List = ({list, setList, isFinish, setFinish}) => {
    function del(index) {
        console.log("삭제");
        list.splice(index, 1); // 값만 바뀌고 주소는 안바뀜 (setList가 감지 못함)
        let temp = [...list]; // 배열을 새로 복사해서 주소까지 바꿔줌
        setList(temp);
    }

    return (
        <div className='list-container'>
            <Subject subject={'ing'} />
            <div className='lists'>
                {list.map((value, index) => {
                    return <ListItem key={index} value={value} index={index} del={del} />
                })} 
            </div>
        </div>
    )
}

export default List

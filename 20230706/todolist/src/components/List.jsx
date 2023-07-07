import React from 'react'
import Subject from './Subject'
import Button from './Button'

const ListItem = ({value, index, del, fin}) => {
    let color;
    if(value.isFinish == true) {
        color = "rgb(100, 100, 100)"
    }
    return (
        <div className='list-item' style={{backgroundColor:color}}>
            <div className='index'>{index+1}</div>
            <div className='title'>{value.title}</div>
            <div className='date'>{value.today} ~ {value.due}</div>
            <div className='content'>{value.content}</div>

            <div className='btns2'>
                <div className='finBtn' onClick={() => {fin(index)}}>
                    <Button btn={'V'} fin={value.isFinish} />
                </div>
                <div className='delBtn' onClick={() => {del(index)}}>
                    <Button btn={'X'} />
                </div>
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

    function fin(index) {
        console.log("완료");
        let finished = list[index];
        if(finished.isFinish == true) {
            finished.isFinish = false;
        }else {
            finished.isFinish = true;
        }
        console.log("뭐지 : ", list[index]);
        let temp = [...list];
        setList(temp);
    }

    return (
        <div className='list-container'>
            <div className='lists'>
                {list.map((value, index) => {
                    return <ListItem key={index} value={value} index={index} del={del} fin={fin} />
                })} 
            </div>
        </div>
    )
}

export default List

import React from 'react'
import Subject from './Subject'
import Button from './Button'
import {useState, useEffect} from 'react'

const Label = ({label}) => {
  return (
    <div className='label'>
      {label}
    </div>
  )
}

const Input = ({list, setList}) => {
    function submit() {
        // 입력 값 받아서 저장
        let _title = document.querySelector("#title");
        let _today = document.querySelector("#today");
        let _due = document.querySelector("#due");
        let _content = document.querySelector("#content");

        if(!_title.value || !_due.value || !_content.value) {
            console.log("빈칸 있음")
            return;
        }else {
            console.log("저장")
            let submit = [{
                title : _title.value,
                today : _today.value,
                due : _due.value,
                content : _content.value,
                isFinish : false
            }];
        
            console.log("추가 : ", submit);
            setList([...list, ...submit]);

            reset();
        }
    }

    // 입력창 리셋
    function reset() {
        let _title = document.querySelector("#title");
        let _due = document.querySelector("#due");
        let _content = document.querySelector("#content");
        _title.value = "";
        _due.value = "";
        _content.value = "";
    }

    // 오늘 날짜
    let todayDate = getToday(new Date());

    function getToday(date) {
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return `${year}-${month}-${day}`;
    }

    return (
        <div className='input-container'>
            <Subject subject={'To Do List'} />

            <div className='inputs'>
                <Label label={'Title'} />
                <input id='title' className='input' type="text" />
                <Label label={'Today'} />
                <input id='today' className='input' type='date' defaultValue={todayDate} disabled></input>
                <Label label={'Due Date'} />
                <input id='due' className='input' type='date' min={todayDate}></input>
                <Label label={'Content'} />
                <textarea id='content' className='content' name="content" cols="30" rows="10"></textarea>
            </div>

            <div className='btns'>
                <div onClick={reset}>
                    <Button btn={'Reset'}  />
                </div>
                <div onClick={submit}>
                    <Button btn={'Submit'} />
                </div>
            </div>
        </div>
    )
}

export default Input

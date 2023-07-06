import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
// <Link /> == <a></a>
// 페이지 새로고침X, url만 변경

// useNavigate : react hook 함수, 페이지 전환을 위해 사용

const Body = ({path, name, login, item}) => {
    const nav = useNavigate();

    return (
        <>
            <div className='body'>
                <Link to={path}>Go to [{name}]</Link>
                <button onClick={() => {
                    nav(path);
                }}>Go to [{name}]</button>

                {login ? <div>로그인 됨</div> : <div>로그인 안됨</div>}
                
                <div>
                    {item && item.id ? <div>{item.id} </div> : null}
                    {item && item.num ? <div>{item.num}번 </div> : null}
                    {item && item.name ? <div>{item.name} </div> : null}
                </div>
            </div>
            <br></br>
        </>
    )
}

export default Body

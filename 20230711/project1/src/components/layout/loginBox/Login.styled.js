import styled from 'styled-components'

// 우리가 만들고 싶은 태그에 백틱으로 스타일 적용
// extension에서 vscode-styled-components 설치

// & : 스타일이 적용되고 있는 대상

export const LoginBoxInput = styled.button`
    border: 2px solid white;
    width: 200px; height: 50px;
`

export const LoginBoxWrap = styled.div`
    border : 3px solid;
    background-color: blue;
    // props 값 받아서 있으면 왼쪽 없으면 오른쪽 값 적용
    width: ${(props) => props.width || "500px"};
    height: 500px;

    // 이 컴포넌트 안에 해당 클래스 이름 보유하고 있는 태그
    & .login-title {
        color: white;
        font-size: 20px;
        text-align: center;
    }

    // 이 컴포넌트 안에 해당 컴포넌트
    & ${LoginBoxInput} {
        background-color: red;
    }
`


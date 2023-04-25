import styled from "styled-components"

export const Btn = styled.button`
    margin-right: 20px;
    width: 120px;
    height: 50px;
    border: solid 2px #FFFFFF;
    border-radius: 20px;
    background-color: #122e5d;
    font-weight: 800;
    color: #FFFFFF;
    cursor: pointer;
    &:hover{
        background-color: #FFFFFF;
        color: #122e5d;
        box-shadow: 0px 0px 10px 2px #FFFFFF; 
    }
    transition: 0.6s;
`
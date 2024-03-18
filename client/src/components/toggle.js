import React, { useState } from 'react'
import styled from "styled-components";
const ToggleButton = () => {
    const [isToggled , setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!isToggled);
    }
  return (
    <ToggleContainer>
    <div>
      <button onClick={handleToggle}>
        {isToggled ? 'Invoice' : 'Estimate'}
      </button>
    </div>
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div`
button{
    height:40px;
    color:white;
    width:250px;
    background-color: #293846;
    padding:10px;
    border: 2px solid grey;
    border-radius:20px;
    font-family : 'Trebuchet MS' , 'Lucida Grande', Arial , sans-serif;
    font-size:15px;
    display:grid;
    left: 50%;
  }
  button:hover{
    color:black;
    cursor:pointer;
    background-color:#cbd3d4 ;
    border: 2px solid black;
  }
`;
export default ToggleButton;

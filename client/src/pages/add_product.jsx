import React from 'react'
import Sidebar from '../components/Sidebar';
import styled from "styled-components";

function AddProduct() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div>
      <AddContainer>
      <Sidebar/>
        <div className='addbtn'>
          <button onClick={handleClick}>
            Add Product
          </button>
        </div>
      </AddContainer>
    </div>
  )
}

const AddContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items: center;
  button{
    height:50px;
    width:150px;
    background-color: #cbd3d4;
    padding:10px;
    margin-left:550px;
    border: 2px solid black;
    border-radius:15px;
    font-family : 'Trebuchet MS' , 'Lucida Grande', Arial , sans-serif;
    font-size:18px;
  }
  button:hover{
    color:white;
    cursor:pointer;
    background-color:#293846;
  }
`;
export default AddProduct;

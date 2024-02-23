import React from 'react'
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
function Sales() {
  return (
    <SalesContainer>
      <div className='sidebar'><Sidebar/></div>
      <div className='sale_image'>
        <img src='../assets/salesdata.png' alt='Sales data' />
      </div>
    </SalesContainer>
  )
}

const SalesContainer = styled.div`
  display: flex;
  flex-direction: row;
  .sidebar{
    width: 40%;
    height: 100vh;
  }
  .sale_image{
    background-color: beige;
    width: 60%;
    height: 10v0h;
  }
`;


export default Sales;
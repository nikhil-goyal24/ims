import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Sidebar from '../components/Sidebar';
import ToggleButton from '../components/toggle';
function Dashboard() {
  return (
        <DashboardContainer>
        <div className='sidebar'>
          <Sidebar />
          </div>
          <div className='panel'>
            <div className='tglbtn'><ToggleButton/></div>
            <div className='bar'>
              <input
                type="text"
                // value={itemName}
                //onChange={(e) => setItemName(e.target.value)}
                placeholder="Item name"
              />
              <button >Add Item</button>
              <button >Clear Items</button>
            </div>
          </div>
          <div className='bill'>
            <div className='nminput'>
              Name:
              <input placeholder='Enter Name' />
            </div>

            <div>
              <table>
                <tr>
                  <th>S.NO.</th>
                  <th>Product</th>
                  <th>HSN/SAC</th>
                  <th>GST</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Per</th>
                  <th>Discount%</th>
                  <th>Amount</th>
                </tr>
              </table>
            </div>
          </div>
        </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
width:100vw;
height: 100vh;
display:flex;
flex-direction:row;
.sidebar{
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100VH;
}
.panel{
  display:flex;
  flex-direction:column;
  width: 60%;
}
th{
  border: 2px solid black;
  padding:2px;
  background-color:cyan;
}
`;
export default Dashboard;
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const SidebarContainer = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;
 padding: 20px;
`;

const SidebarItem = styled(Link)`
 padding: 20px 10px 20px 10px; /* Adjusted padding for left and right */
 cursor: pointer;
 transition: all 0.3s ease;
 border: 1px solid #ddd;
 border-radius: 5px;
 font-size: 16px;
 font-weight: bold; /* Increased font weight */
 text-align: center; /* Center-aligned text */
 text-decoration: none;
 color: black;
 &:hover {
    border-color: black;
    background-color: #f0f0f0;
    transform: scale(1.05); /* Zoom effect on hover */
 }
`;

const Sidebar = () => {
 return (
    <SidebarContainer>
      <SidebarItem to="/">Home</SidebarItem>
      <SidebarItem to="/add">Add Product</SidebarItem>
      <SidebarItem to="/sales">Sales</SidebarItem>
      <SidebarItem to="/tax">Tax</SidebarItem>
    </SidebarContainer>
 );
};

export default Sidebar;

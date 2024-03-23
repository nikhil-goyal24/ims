import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import AddProductComponent from '../components/AddProductComponent';
// Define the styled components
const Dashboard = styled.div`
 display: flex;
 height: 100vh;
`;

const SidebarContainer = styled.div`
 width: 20%;
 height: 100%;
 background-color: #f0f0f0; // Example background color
`;

const Content = styled.div`
 flex-grow: 1;
 background-color: #fff; // Example background color
`;

// Define the AddProduct component
const AddProduct = () => {
 return (
    <Dashboard>
      <SidebarContainer>
        <Sidebar/>
      </SidebarContainer>
      <Content>
        <AddProductComponent/>
      </Content>
    </Dashboard>
 );
};

export default AddProduct;

import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
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

// Define the Sales component
const Sales = () => {
 return (
    <Dashboard>
      <SidebarContainer>
        <Sidebar/>
      </SidebarContainer>
      <Content>
        Dude Sales kithaaa!!!!!!!!!!
      </Content>
    </Dashboard>
 );
};

export default Sales;

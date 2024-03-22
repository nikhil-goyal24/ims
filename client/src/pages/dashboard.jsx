import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
const DashboardContainer = styled.div`
 display: flex;
 height: 100vh;
`;

const Side = styled.div`
 width: 20%;
 height: 100%;
 background-color: #f0f0f0;
`;

const Contents = styled.div`
 flex-grow: 1;
 background-color: #ffffff;
`;

const Dashboard = () => {
 return (
    <DashboardContainer>
      <Side>
        <Sidebar/>
      </Side>
      <Contents>
        <DashboardContent />
      </Contents>
    </DashboardContainer>
 );
};

export default Dashboard;

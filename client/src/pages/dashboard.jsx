import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    
        <DashboardContainer>
          <Sidebar/>
        </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
width:100vw;
height: 100vh;
`;
export default Dashboard;

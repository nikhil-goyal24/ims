import React, { useState } from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;
 padding: 20px;
`;

const ToggleContainer = styled.div`
 display: flex;
 justify-content: center;
 padding: 10px 0;
 gap: 10px;
`;

const ToggleButton = styled.button`
 padding: 10px 20px;
 border: 1px solid #ddd;
 border-radius: 5px;
 cursor: pointer;
 background-color: ${props => props.selected ? '#f0f0f0' : 'transparent'};
 color: ${props => props.selected ? 'black' : 'gray'};
 font-size: 18px;
 font-weight: bold;
 transition: all 0.3s ease;

 &:hover {
    background-color: #f0f0f0;
    color: black;
 }
`;

const NameInput = styled.input`
 padding: 10px 20px;
 border: 1px solid #ddd;
 border-radius: 5px;
 cursor: pointer;
 background-color: ${props => props.selected ? '#f0f0f0' : 'transparent'};
 color: ${props => props.selected ? 'black' : 'gray'};
 font-size: 18px;
 font-weight: bold;
 transition: all 0.3s ease;

 &:hover {
    background-color: #f0f0f0;
    color: black;
 }
`;

const BillContainer = styled.div`
 display: flex;
 flex-direction: column;
 padding: 20px;
`;

const SearchBar = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
 padding: 10px;
 border: 1px solid #ddd;
 border-radius: 8px;
 margin-bottom: 20px;
`;

const SearchInput = styled.input`
 flex-grow: 1;
 border: none;
 padding: 5px;
 height: 95%;
`;

const ActionButton = styled.button`
 padding: 5px 10px;
 border: 1px solid #ddd;
 border-radius: 5px;
 cursor: pointer;
 background-color: transparent;
 color: black;
 transition: all 0.3s ease;

 &:hover {
    background-color: #f0f0f0;
 }
`;

const Bill = styled.div`
 display: flex;
 flex-direction: column;
 padding: 10px;
 border: 1px solid #ddd;
 border-radius: 5px;
`;

const BillTable = styled.div`
 display: flex;
 flex-direction: column;
 border: 1px solid #ddd;
 border-radius: 5px;
 padding: 10px;
`;

const TableRow = styled.div`
 display: flex;
 justify-content: space-between;
 margin-bottom: 5px;
`;

const TableCell = styled.div`
 flex: 1;
 padding: 5px;
 border: 1px solid #ddd;
`;

const FinalCell = styled.div`
 flex: 1;
 padding: 5px;
 border: 1px solid #ddd;
 border-radius: 5px;
 text-align: center;
`;
const PrintButton = styled.button`
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 background-color: #007bff;
 color: white;
 transition: all 0.3s ease;

 &:hover {
    background-color: #0056b3;
 }
`;

const DashboardContent = () => {
 const [selected, setSelected] = useState('Invoice');

 const handleToggle = (value) => {
    setSelected(value);
 };

 return (
    <ContentContainer>
      <ToggleContainer>
        <NameInput placeholder="Enter Name" />
        <NameInput placeholder="Contact no." />
        <ToggleButton selected={selected === 'Invoice'} onClick={() => handleToggle('Invoice')}>Invoice</ToggleButton>
        <ToggleButton selected={selected === 'Estimate'} onClick={() => handleToggle('Estimate')}>Estimate</ToggleButton>
      </ToggleContainer>
      <BillContainer>
        <SearchBar>
          <SearchInput placeholder="Search..." />
          <ActionButton>Add</ActionButton>
          <ActionButton>Clear</ActionButton>
        </SearchBar>
        <Bill>
          <BillTable>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Discount(%)</TableCell>
              <TableCell>Amount(Rs.)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>XYZ</TableCell>
              <TableCell>985-ASDFC</TableCell>
              <TableCell>IN9855541GST</TableCell>
              <TableCell>25</TableCell>
              <TableCell>100</TableCell>
              <TableCell>10</TableCell>
              <TableCell>2250</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>ABC</TableCell>
              <TableCell>975-ASDFC</TableCell>
              <TableCell>IN9855541GST</TableCell>
              <TableCell>100</TableCell>
              <TableCell>50</TableCell>
              <TableCell>20</TableCell>
              <TableCell>4000</TableCell>
            </TableRow>
            <TableRow>
              <FinalCell>Total</FinalCell>
              <FinalCell>6250</FinalCell>
            </TableRow>
            {/* Additional table rows can be added here */}
          </BillTable>
          <PrintButton>Print</PrintButton>
        </Bill>
      </BillContainer>
    </ContentContainer>
 );
};

export default DashboardContent;

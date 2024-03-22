import React from 'react';
import styled from 'styled-components';

// Define the styled components
const ContentContainer = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;
 padding: 20px;
`;

const ButtonWrapper = styled.div`
 display: flex;
 justify-content: center;
 padding: 10px 0;
 gap: 10px;
`;

const UploadButton = styled.button`
 padding: 10px 20px;
 border: 1px solid #ddd;
 border-radius: 5px;
 cursor: pointer;
 background-color: #f0f0f0;
 color: black;
 font-size: 18px;
 font-weight: bold;
 transition: all 0.3s ease;
 width: 200px; // Specified width
 margin-top: 50px; // Adjusted to cover 20% of the height
 margin-bottom: 50px; // Adjusted to cover 20% of the height

 &:hover {
    background-color: #e0e0e0;
    border-color: black;
 }
`;

const FormWrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 height: 80%;
`;

const FormInput = styled.input`
 width: 50%;
 padding: 10px 20px;
 border: 1px solid #ddd;
 border-radius: 5px;
 cursor: pointer;
 background-color: ${props => props.selected ? '#f0f0f0' : 'transparent'};
 color: ${props => props.selected ? 'black' : 'gray'};
 font-size: 18px;
 font-weight: bold;
 transition: all 0.3s ease;
 text-align: center; // Align placeholders to the center
 margin-bottom: 20px ;
 &:hover {
    background-color: #f0f0f0;
    color: black;
 }
`;

const AddButton = styled(UploadButton)`
 margin-top: 20px;
`;

// Define the ContentPage component
const ContentPage = () => {
 return (
    <ContentContainer>
      <ButtonWrapper>
        <UploadButton>Upload Excel</UploadButton>
      </ButtonWrapper>
      <FormWrapper>
        <FormInput type="text" placeholder="Product Name" />
        <FormInput type="text" placeholder="Price" />
        <FormInput type="text" placeholder="HSN/SAC" />
        <FormInput type="text" placeholder="GST% Paid" />
        <FormInput type="text" placeholder="Quantity" />
        <AddButton>ADD</AddButton>
      </FormWrapper>
    </ContentContainer>
 );
};

export default ContentPage;

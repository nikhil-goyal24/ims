import React from 'react'
import styled from "styled-components";
import { RiFolderUploadLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";

function Sidebar() {
    const sidebarData = [
        {
            title:"Home",
            icon:<LuLayoutDashboard />, 
            link:"/"
        },{
            title:"Add Product",
            icon:<RiFolderUploadLine />, 
            link:"/add"
        },{
            title:"Tax",
            icon:<FaRupeeSign/>, 
            link:"/tax"
        },{
            title:"Sales",
            icon:<BsGraphUpArrow/>, 
            link:"/sales"
        },
    ];
  return (
    <div>
    <SidebarContainer>
    <div className='sidebar'>
        <ul className='SidebarList'>
        {sidebarData.map((val , key)=> {
            return(
            <li 
            key={key} 
            className='row' 
            id={window.location.pathname == val.link ? "active" : ""}
            onClick={()=> {window.location.pathname = val.link}}
            > 
            {" "}
            <div className='icon'>{val.icon} </div>{" "}
            <div className='title'>{val.title} </div> 
            </li>
            ) 
        })}
        </ul>
    </div>
    </SidebarContainer>
    </div>
  ) 
}
const SidebarContainer = styled.div`
    .sidebar{
    height : 100vh;
    width : 250px;
    background-color: #2F4050;
    padding:0%;
    }
    .SidebarList{
        margin:0%;
        height: auto;
        padding: 0;
        width : 100%;
    }

    .SidebarList #active{
        background-color: #293846;
    }
    .row{
        width : 100%;
        height : 80px;
        list-style-type : none;
        margin : 0%;
        display: flex;
        flex-direction : row;
        color: white;
        justify-content : center;
        align-items: center;
        font-family : 'Trebuchet MS' , 'Lucida Grande', Arial , sans-serif;
    }

    .row:hover{
        cursor:pointer;
        background-color: #293846;
    }

    .icon{
        flex : 30%;
        display:grid;
        place-items:center;
    }
    .title{
        flex:70%;
    }
`;

export default Sidebar;
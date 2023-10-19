import React from 'react';
import {Link} from 'react-router-dom'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import './Sidebar.css'
import { sendArrow } from '../../../assets/assets';


const SideNavBar = () => {
  return (
      <CDBSidebar textColor="#333" backgroundColor="#ffffff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Quick Access
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to="/messenger" relative="path">
            <CDBSidebarMenuItem className='sideMenu'><div className='menuItem' style={{color:'green', fontSize:'20px', fontWeight:'bold'}}>{sendArrow} &nbsp;&nbsp;Messages</div></CDBSidebarMenuItem>
            </Link>
            <Link to="/call" relative="path">
            <CDBSidebarMenuItem className='sideMenu'><div className='menuItem' style={{color:'red', fontSize:'20px', fontWeight:'bold'}}>{sendArrow} &nbsp;&nbsp;Video Call</div></CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  );
};

export default SideNavBar;
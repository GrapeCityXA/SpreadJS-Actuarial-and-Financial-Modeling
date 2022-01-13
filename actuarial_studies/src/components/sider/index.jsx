import React,{Component} from 'react'
import {Layout, Menu} from "antd"
import {DiffOutlined ,CalculatorOutlined} from "@ant-design/icons"
import "./sider.less"
const {Sider} = Layout

class IndexSider extends Component{
    state={
        collapsed: false,
    }
    onCollapse = collapsed => {this.setState({collapsed})}
    handleMenuChange = (e) => {
        window.location.href = window.location.origin + '/#' + e.key
    }
    
    render(){
        const {collapsed} = this.state
        return(
            <Sider className="index-sider" collapsible collapsed={collapsed} onCollapse={this.onCollapse} >
                <div className="logo"></div>
                <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" onClick={this.handleMenuChange}>
                    <Menu.Item key="/designer" icon={<DiffOutlined />}>精算模型管理</Menu.Item>
                    <Menu.Item key="/" icon={<CalculatorOutlined />}>保险精算</Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default IndexSider
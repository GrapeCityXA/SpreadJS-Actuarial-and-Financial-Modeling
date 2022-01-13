import React, { Component } from 'react'
import '@grapecity/spread-sheets-designer-resources-cn';
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"
import '@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css'
import { Designer } from '@grapecity/spread-sheets-designer-react';
import * as designerGC from '@grapecity/spread-sheets-designer';
import GC from '@grapecity/spread-sheets';
import {
    Button, Switch, Drawer, Form, Input, Checkbox, Row, Col,
    Select, Radio, InputNumber, Spin
} from "antd"
import { CalculatorOutlined, SaveOutlined } from '@ant-design/icons';
import './designer.less'
import dataSource from '../../assets/dataSource';
import axios from 'axios';
import PubSub from 'pubsub-js';
const { Option } = Select;

export default class SpreadDesigner extends Component {
    constructor(props) {
        super(props)
        this.designer = null
    }
    state = {
        config: designerGC.Spread.Sheets.Designer.DefaultConfig,
        colInfos: [],
        showFormula: true,
        drawerVisible: false,
        loading: false
    }
    // 初始化编辑器
    designerInitial = (designer) => {
        this.designer = designer;
        this.designer.setConfig(GC.Spread.Sheets.Designer.ToolBarModeConfig);
        this.designer.getWorkbook().getActiveSheet().options.showFormulas = true;
        // this.designer.getWorkbook().getActiveSheet().suspendCalcService(false);
        this.designer.getWorkbook().bind(GC.Spread.Sheets.Events.SheetTabClick, (e, info) => {
            // 显示公式
            // info.sheet.options.showFormulas = this.state.showFormula;
            // 挂起计算服务
            // info.sheet.suspendCalcService(false)
        })
    }
    calculate = () => {
        debugger;

        console.log(this.designer.getWorkbook().getDataSource())
        // this.designer.getWorkbook().getActiveSheet().resumeCalcService(true);
    }

    showFormula = (checked) => {
        debugger;
        this.setState({
            showFormula: checked
        })
        // this.designer.getWorkbook().getActiveSheet().options.showFormulas = checked;

    }
    showDrawer = () => {
        debugger;
        this.setState({
            drawerVisible: true
        })
        this.designer.getWorkbook().getActiveSheet().options.showFormulas = true;
        this.designer.getWorkbook().setActiveSheet('Pricing');
    };

    onClose = () => {
        this.setState({
            drawerVisible: false
        })
    };
    onFinish = (values) => {
        debugger;
        console.log('Success:', values);
        let spread = this.designer.getWorkbook();
        spread.getSheetFromName('利益演示（件均）').getDataSource().getSource().持有年度 = values.years;
        spread.getSheetFromName('Assum').getDataSource().getSource().分红水平 = values.level;
        spread.getSheetFromName('Sum').getDataSource().getSource().年交保费 = values.premium;
        spread.getSheetFromName('Sum').getDataSource().getSource().性别 = values.sex;
        spread.getSheetFromName('Sum').getDataSource().getSource().交费期间 = Number(values.time);
        spread.getSheetFromName('Sum').getDataSource().getSource().年龄 = values.age;
        this.state.loading = true;
        this.designer.getWorkbook().getActiveSheet().resumeCalcService(true);
        this.state.loading = false;
        this.onClose();
        this.designer.getWorkbook().setActiveSheet('利益演示（件均）');
        this.designer.getWorkbook().getActiveSheet().options.showFormulas = false;
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    onAgeChange = () => {

    }
    onTimeChage = () => {

    }
    saveCalculatorSpread = () => {
        debugger;
        let newData = JSON.stringify(this.designer.getWorkbook().toJSON())
        document.getElementsByClassName("gc-ribbon-bar")[0].classList.add("collapsed");
        let ref = window.location.href;
        if (ref.indexOf("?") !== -1) {
            let modelName = ref.split("?")[1].split("=")[1];
            sessionStorage.setItem(decodeURI(modelName), newData)
            alert("保存成功")
        }
    }
    componentDidUpdate() {
        document.getElementsByClassName("gc-ribbon-bar")[0].classList.add("collapsed")
    }
    componentDidMount() {
        debugger;
        document.getElementsByClassName("gc-ribbon-bar")[0].classList.add("collapsed");
        let ref = window.location.href;
        if (ref.indexOf("?") !== -1) {
            let modelName = ref.split("?")[1].split("=")[1];
            let tableJson = sessionStorage.getItem(decodeURI(modelName));
            let spread = this.designer.getWorkbook();
            spread.fromJSON(JSON.parse(tableJson))
            spread.setActiveSheet('Pricing')
        }
        this.designer.getWorkbook().getActiveSheet().options.showFormulas = true;
        // spread.activeSheet.resumeCalcService(true);
        let cuntomerData = {
            持有年度: 35,
            年龄: 30,
            性别: 'F',
            交费期间: 10,
            年交保费: 2000,
            分红水平: '高档'
        }
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(cuntomerData);
        let spread = this.designer.getWorkbook();

        let sheetInterest = spread.getSheetFromName('利益演示（件均）');
        let sheetSum = spread.getSheetFromName('Sum');
        let sheetAssum = spread.getSheetFromName('Assum');
        let sheetPricing = spread.getSheetFromName('Pricing');
        let sheetDec = spread.getSheetFromName('Dec');
        if (sheetInterest)
            sheetInterest.setDataSource(source);
        if (sheetSum)
            sheetSum.setDataSource(source);
        if (sheetAssum)
            sheetAssum.setDataSource(source);
        if (sheetInterest & sheetSum & sheetAssum & sheetPricing & sheetDec) {

            sheetInterest.options.isProtected = true;
            sheetSum.options.isProtected = true;
            sheetAssum.options.isProtected = true;
            sheetPricing.options.isProtected = true;
            sheetDec.options.isProtected = true;
        }

        spread.bind(GC.Spread.Sheets.Events.ActiveSheetChanging, function (sender, args) {
            //Cancel sheet switching.
            args.cancel = true;
        });


    }
    // 组件卸载时上传配置表格，向数据展示组件传值
    componentWillUnmount() {

    }
    render() {
        const { config } = this.state
        return (
            <div style={{ height: '100%' }}>
                {/* <span>显示精算公式：</span><Switch defaultChecked onChange={this.showFormula} /> */}
                <Button icon={<CalculatorOutlined />} size="middle" style={{ margin: "10px 10px" }} type="primary" onClick={this.calculate, this.showDrawer} >计算</Button>
                <Button icon={<SaveOutlined />} size="middle" style={{ margin: "10px 10px" }} type="primary" onClick={this.saveCalculatorSpread} >保存</Button>
                <Spin spinning={this.state.loading} delay={500} tip="计算中...">
                </Spin>
                <Designer
                    styleInfo={{
                        height: '100%',
                    }}
                    designerInitialized={this.designerInitial}
                    config={config}
                />
                <Drawer title="客户收益计算" placement="right" onClose={this.onClose} visible={this.state.drawerVisible} width={600}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        className=""
                        style={{ marginTop: '20px' }}
                    >
                        <Row gutter={24} gutter={[0, '40px']}>
                            <Col span={24} key={1} >
                                <Form.Item name="sex" label="性别"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择性别!',
                                        },
                                    ]}>
                                    <Radio.Group>
                                        <Radio value="M">男</Radio>
                                        <Radio value="F">女</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={24} key={2}>
                                <Form.Item
                                    label="年龄："
                                    name="age"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入年龄，范围（0~50）!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0} max={50}
                                        onChange={this.onAgeChange}
                                        placeholder="请输入年龄，范围（0~50）"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} key={3}>
                                <Form.Item
                                    label="年交保费："
                                    name="premium"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择年交保费!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        addonBefore="+"
                                        addonAfter="¥"
                                        placeholder="请选择年交保费"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} key={4}>
                                <Form.Item
                                    label="交费期间："
                                    name="time"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择交费期间!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="请选择一个交费期间"
                                        allowClear
                                    >
                                        <Option value="1">1</Option>
                                        <Option value="3">3</Option>
                                        <Option value="5">5</Option>
                                        <Option value="10">10</Option>
                                        <Option value="15">15</Option>
                                        <Option value="20">20</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={24} key={5}>
                                <Form.Item
                                    label="持有年度："
                                    name="years"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入持有年度（1~76）!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={1} max={76}
                                        addonBefore="+"
                                        addonAfter="¥"
                                        placeholder="请输入持有年度（1~76）"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} key={6}>
                                <Form.Item
                                    label="分红水平："
                                    name="level"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择分红水平!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="请选择分红水平"
                                        allowClear
                                    >
                                        <Option value="低档">低档</Option>
                                        <Option value="中档">中档</Option>
                                        <Option value="高档">高档</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={24} >
                                <Form.Item
                                    wrapperCol={{
                                        offset: 4,
                                        span: 8,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        开始计算
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

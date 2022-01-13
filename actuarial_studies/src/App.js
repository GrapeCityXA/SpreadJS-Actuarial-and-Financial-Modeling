import React,{Suspense} from 'react';
import {Layout} from 'antd'
import './App.less'
import IndexFooter from './components/footer'; 
import IndexSider from './components/sider'; 
import MiddleComponent from './components/middleComponent';
// const MiddleComponent = React.lazy(() => import('./components/middleComponent'))
// const PureSpread = React.lazy(() => import('./components/pureSpread'))
// const SpreadDesigner = React.lazy(() => import('./components/designer'))
const {Content,Header} = Layout



const App = () => (
  <Layout className="app">
     <IndexSider/>
     <Layout>
     <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
        <div className = "site-layout-sub-header-name">保险精算系统</div>
     </Header>
        <Content className="index-content">
          <MiddleComponent/>
        </Content>
        <IndexFooter/>
     </Layout>
  </Layout>
)
  


export default App;

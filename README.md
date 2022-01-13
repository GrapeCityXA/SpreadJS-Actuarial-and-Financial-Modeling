### 葡萄城表格技术 - 精算与金融建模

精算是一门限于保险行业，以产品定价和准备金评估（偿付能力评估）为核心，基于对风险的量化分析，围绕着保险公司从产品开发、承保、营销、出险、年度评估、再报安排及投资等各业务流程的学科。如今，越来越多的金融机构也开始尝试使用它结合金融建模技术来评估公司的财务状况风险。

除了需要运用现代数学、统计学、金融学及法学等的科学技术外，精算师在数据建模中还经常使用 Excel 等数据管理软件。然而，在很多场景下 Excel 的效率并不高，比如版本控制，以及面对大型复杂模型和多经济情景的分布式计算需求。为了应对这些短板，越来越多的金融机构开始尝试借助第三方精算建模软件或选择自主研发。借助葡萄城[ 纯前端表格控件 SpreadJS](https://www.grapecity.com.cn/developer/spreadjs) 和 [服务端表格组件 GcExcel](https://www.grapecity.com.cn/developer/grapecitydocuments/excel-java) 搭建的精算建模软件，可以在兼顾大规模数据管理的同时，满足各类金融建模（如财务三张表、项目管理 NPV/IRR、投资价值预测等）、版本控制和公式计算精度的要求。相比于 Excel，SpreadJS 和 GcExcel 模块化的组件功能支持各种定制化开发，更适合大型复杂模型和多经济情景的分布式计算需要。

### 使用方法

用VScde打开工程，执行npm install 命令，完成对依赖包的安装

![输入图片说明](%E5%9B%BE%E7%89%871.png)

安装完成依赖包，后执行npm run start 命令，启动工程

![输入图片说明](%E5%9B%BE%E7%89%872.png)

精算系统首页如图所示，内置“养老报销精算“模型，后续精算在此模型上进行，也可导入其它精算模型（后续精算需要自己业务和模型需求开发）
![输入图片说明](%E5%9B%BE%E7%89%873.png)

点击表格中的表格中的精算按钮，或双击精算模型名称，进入养老保险精算界面

![输入图片说明](%E5%9B%BE%E7%89%874.png)

点击“计算“按钮，弹出客户收益计算弹窗，输入客户信息
![输入图片说明](%E5%9B%BE%E7%89%875.png)

点击“开始计算“按钮，开始进行客户收益计算，页面跳转到客户养老收益界面

![输入图片说明](%E5%9B%BE%E7%89%876.png)

计算结束后，界面展示客户养老报销收益明细界面
![输入图片说明](%E5%9B%BE%E7%89%877.png)

点击“保存“按钮，可将当前用户精算信息保存到报表中
![输入图片说明](%E5%9B%BE%E7%89%878.png)

若要基于不同的客户信息进行精算，可再次点击“计算“按钮，输入不同的客户信息，再次进行客户收益精算
![输入图片说明](%E5%9B%BE%E7%89%879.png)

### 精算与金融建模的技术要点

常见的金融建模技术已经从传统、简单的静态预测技术演变为更加复杂的动态模拟技术，即确定性金融建模技术和随机金融建模技术。确定性金融建模是基于一种“what if”的分析技术，模型中的变量利用这种分析技术得以确定，而随机金融建模技术中所有的变量都是通过一个假设的概率分布随机来确定的。

 **一、静态预测技术** 

假设保险公司的运营以及所处的经济环境在未来不会发生变化，所有的假设都是唯一的、确定的，并用这个模型来预测公司的未来财务状况。静态预测技术是根据一组假设，来预测公司的未来可能出现的情况。例如，保险公司可以利用一组一致的假设，如资产、负债、经济状况以及其他一些重要变量，来预测公司未来五年的盈余。

 **二、敏感性测试** 

敏感性测试又被称为敏感性分析（Sensitivity analysis），其通过预测一些可能出现的情景来扩展预测结果。敏感性测试通常是通过每次改变一个关键变量来实现，通过进行一系列上述计算，这样我们就可能得到一个公司所面临的关键风险的全面分析以及其对公司财务状况的影响。敏感性测试存在两个主要问题：一是，精算师在进行分析时有可能很难确定变量需要改变的范围；二是，变量之间的相关性有可能被扰乱，因为我们每次只改变了一个变量。

 **三、情景分析和压力测试**
 
敏感性测试和确定性情景分析（Scenario analysis）二者主要的区别是，前者每次只改变一个变量，而后者每次改变一组变量。如前所述，确定性情景的变量的值是预先确定的，但是变量之间的相关性系数是可以改变的。确定性情景分析技术是在不同的未来情景下，预测公司财务状况的发展趋势。压力测试（Stress testing）是一种极端情况下的确定性情景分析技术，通常利用最坏和发生可能性相对较小的情景进行计算。如果公司的财务状况在这种极为罕见的情景下仍然是可以接受的，那么，公司的风险一般假定也是可以承受的。

 **四、随机模拟** 

该方法一般应用于情景分析中的情景构建过程，随机模拟可以生成大量的情景。随机建模和确定性情景分析的主要区别是，随机模拟下变量情景的构建是利用变量的概率分布随机生成的，而确定性情景分析的情景是预先确定的。因此，利用随机模拟所生成的变量的情景一般称之为随机情景，而利用确定性技术所生成的变量的情景一般称之为确定性情景。值得注意的是，敏感度测试和随机模拟其实都是情景分析，其区别仅是如何生成情景。

由此可见，金融建模技术目前呈现出两种发展趋势：一是，金融建模技术的性质由确定性向随机性转变，由静态向动态转变；二是，目前的金融建模技术比以往更加重视变量之间的相关性。

### 葡萄城表格技术的优势

金融建模技术的两种发展趋势也同样影响了未来精算建模软件的发展，我们需要的精算建模软件需要提供动态的财务分析方法，在体现“随机性”、“动态性”思想的同时，还能够随机模拟不确定性环境下公司的资产、负债及未来的经营成果，为高层管理者控制经营风险、制定战略决策提供依据。

在 Excel 越来越难以满足精算与金融建模需求的同时，开始有越来越多的金融机构尝试使用更专业的第三方精算建模软件。

用葡萄城表格技术产品 SpreadJS 和 GcExcel 构建精算建模软件的优势如下：

表格组件完全遵循了 Excel 的使用习惯，并兼容 Excel 的数据结构，在 Excel 软件中构建的各类金融模型（如财务三张表的历史及预测模型；项目投资或项目管理模型；市场规模预测和投资价值预测模型等）可以直接导入由 SpreadJS 和 GcExcel 构建的精算建模软件中使用。
两款组件均提供大量 API 接口，用户可自定义各类快捷键和响应事件，在构建精算模型时可以更直接地创建预测任务，提升精算建模软件对数据缺省值、趋势转变和大量异常值的鲁棒性。
相比于 Excel，SpreadJS 和 GcExcel 的组件功能更加开放和灵活，用其构建的版本管理模块，在满足用户自定义的同时，还支持由用户主动创建历史版本（版本快照），在生成副本、保存模板或导出本地 Excel 文档时版本快照可以由精算建模软件自动生成。
SpreadJS 和 GcExcel 组件构建的专用精算软件在运算效率上要比 Excel 公式和 VBA 非编译计算高很多，更适合大型复杂模型和多经济情景的分布式计算需求。

### 葡萄城表格技术的功能特色

- 支持跨平台开发
以原生方式嵌入，支持 B/S、H5 小程序、APP 和桌面应用程序开发

- 支持国产操作系统
支持 Windows、Mac、Linux，通过麒麟软件、统信 UOS 兼容性认证

- 不依赖第三方库
加载、编辑、导入、导出 Excel 时无需预装插件和第三方应用软件
- 
支持云应用开发
支持公有云部署、私有云部署和独立服务器部署

- 支持主流技术栈
前端组件基于 HTML5 标准，可与前、后端技术框架相结合

- 开放的 API 接口
内置大量 API 接口可供调用，轻松扩展，满足更多定制化需求

### 葡萄城表格技术的成功案例

[![输入图片说明](https://www.grapecity.com.cn/images/metalsmith/developer/casestudies/casestudies-htxxrj/pic05.png)](https://www.grapecity.com.cn/developer/casestudies/htxxrj)

 **航天信息软件 - 智慧统计平台** 
由航天信息软件研发的智慧统计平台，基于某统计局的报表填报系统项目而开发的，通过嵌入纯前端表格控件 SpreadJS，该平台实现了在线报表设计及分析功能，通过拖拽元数据（指标）可以快速设计各类报表样式，实现表内、表间审核公式和表内、表间计算公式等。

[![输入图片说明](https://www.grapecity.com.cn/images/metalsmith/developer/casestudies/casestudies-bjhc/pic02.png)](https://www.grapecity.com.cn/developer/casestudies/bjhc)

 **北京海创 - 金融业数据智能分析平台** 
由北京海创研发的金融业数据智能分析平台，通过嵌入 SpreadJS，实现了基于 Web 的数据采集、自助式报表设计与浏览、灵活查询、自主分析和数据预测等功能，简洁、易用，有效解决了用户数据填报、查询和分析需求，支持云部署及企业现场部署等多种方式。

### SpreadJS 三大应用场景

表格文档协同编辑
SpreadJS 的应用场景之一，可实现多人实时协作的在线文档编辑系统。

类Excel报表设计
SpreadJS 的应用场景之一，可大幅降低从本地到线上的数据迁移工作量。

数据填报
SpreadJS 的应用场景之一，可实现类Excel的数据填报与展示。
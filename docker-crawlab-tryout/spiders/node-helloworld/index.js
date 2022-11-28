// 引入 SDK
const crawlab = require('crawlab-sdk');

// 这是一个结果，需要为 object 类型
const result = {name: 'crawlab'};

(async () => {
    // 调用保存结果方法
    await crawlab.saveItem(result);
    // 关闭数据库连接，否则程序不会结束
    await crawlab.close();
})();
class Spy {
    constructor(group) {
        if (window.SpyClient && group) {
            this.group = group;
            this.spy = new window.SpyClient({
                pid: '3_105', // 必须
                lid: '', // 可选，页面的logid
                sample: 1 // 全局抽样，取值：[0-1], 所有发送接口都受到该抽样，单个发送接口的sample配置会覆盖该抽样。
            });

            // 基于performance timing的基本指标
            this.spy.listenTiming(metric => this.sendPerf(metric));

            // 最大块内容绘制完成时间
            this.spy.listenLCP(metric => this.sendPerf(metric));

            // 获取资源的本身大小、传输大小、数量、传输、缓存率
            this.spy.listenResource(metric => this.sendPerf(metric));
        }
    }

    sendPerf = (info) => {
        if (this.spy) {
            this.spy.sendPerf({ group: this.group, info});
        }
    }
}

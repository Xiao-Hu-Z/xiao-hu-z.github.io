class BuriedPoint {
    constructor(options) {
        const defaultOptions = {
            system: ''
        }
        this.username = '';
        this.options = {...defaultOptions, ...options};
    }
    setDoubleTime(data) {
        if (data < 10) {
            return '0' + data
        } else {
            return data;
        }
    }
    triggerEvent(triggerData) {
        const sendData = {};
        const sendItem = [];
        sendData.url = window.location.href;
        const date = new Date();
        const ydata = date.getFullYear() + '-' + this.setDoubleTime(date.getMonth() + 1) + '-' + this.setDoubleTime(date.getDate());
        const time = this.setDoubleTime(date.getHours()) + ':' + this.setDoubleTime(date.getMinutes()) + ':' + this.setDoubleTime(date.getSeconds());
        sendData.createTime = ydata + ' ' + time;
        sendData.username = this.username;
        sendData.system = this.options.system;
        if (triggerData[0] == '_trackNumber') {
            sendData.eventName = encodeURI(triggerData[1]);
            sendItem.push(sendData);
            this.sendQadc(JSON.stringify(sendItem));
        } else if (triggerData[0] == '_trackTime') {
            sendData.eventName = encodeURI(triggerData[1]);
            sendData.useTime = triggerData[2];
            sendItem.push(sendData);
            this.sendQadc(JSON.stringify(sendItem));
        }
    }
    sendQadc(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://kirin.baidu-int.com/api/tool/211264');
        xhr.setRequestHeader('content-type', 'application/json');
        var sendObj = {};
        sendObj.parameter = data;
        sendObj.name = 'wangwenwen05';
        sendObj.token = '91b26f0f597c48dbb5932d0de6198ae0';
        // xhr.setRequestHeader('name', 'wangwenwen05');
        // xhr.setRequestHeader('token', '91b26f0f597c48dbb5932d0de6198ae0');
        xhr.send(JSON.stringify(sendObj));
        xhr.onreadystatechange = function() {
             if (xhr.readyState === 4) {
                 if (xhr.status === 200) {
                     console.log(xhr.responseText,'res');
                 }
             }
        }
    }
}
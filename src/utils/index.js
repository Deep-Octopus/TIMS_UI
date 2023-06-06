/**
 * 读取UTF8编码的字节，并专为Unicode的字符串
 * @param arr
 * @returns {string}
 */
export function readUTF(arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = this.init(arr);
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}

/**
 * 解析Base64编码字符串为文本
 */
export function decodeBase64(base64String) {
    // 解码 Base64 字符串
    const decodedData = atob(base64String);
    // 将二进制数据转换成文本
    const textDecoder = new TextDecoder();
    return textDecoder.decode(new Uint8Array([...decodedData].map(c => c.charCodeAt(0))));
}

export function formatDate(date, format) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = format
        .replace('yyyy', year)
        .replace('MM', month < 10 ? `0${month}` : month)
        .replace('dd', day < 10 ? `0${day}` : day)
        .replace('HH', hours < 10 ? `0${hours}` : hours)
        .replace('mm', minutes < 10 ? `0${minutes}` : minutes)
        .replace('ss', seconds < 10 ? `0${seconds}` : seconds);

    return formattedDate;
}

// 保存table配置
export function handleSave(tableTarget = "student", config = {fields: [
        {type: 'input', label: '学号', prop: 'id', placeholder: '请输入学号', disabled: false},
        {type: 'input', label: '姓名', prop: 'name', placeholder: '请输入姓名', disabled: false},
        {type: 'radio', label: '性别', prop: 'gender', options: ['男', '女'], disabled: false},
        {type: 'input', label: '电话号码', prop: 'phoneNumber', placeholder: "请输入电话号码", disabled: false},
    ],
    rules: {
        id: [
            {required: true, message: '请输入学号', trigger: 'blur'},
            {pattern: /^[0-9]{11}$/, message: "必须是11位数字", trigger: 'blur'}
        ],
        name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {pattern: /^[\u4E00-\u9FA5A-Za-z]+$/, message: '只能输入中文和英文', trigger: 'blur'}
        ],
        phoneNumber: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {pattern: /^[0-9]{11}$/, message: "必须是11位数字", trigger: 'blur'}
        ]
    },
    form: {
        id: '',
        name: '',
        gender: '',
        phoneNumber: '',
    }
}) {
    this.$store.dispatch("page/saveTableConfig", {
        tableTarget: tableTarget,
        configValue: JSON.stringify(config)
    })
}
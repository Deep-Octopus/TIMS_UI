import store from "@/store";
import message from "@/utils/message";

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
export function parseJson(jsonStr){
    return JSON.parse(jsonStr, (k, v) => {
        try{
            // 将正则字符串转成正则对象
            if (eval(v) instanceof RegExp) {
                return eval(v);
            }
        }catch(e){
            // nothing
        }

        return v;
    });
}

/**
 * json对象转json字符串
 * @param { Object } json json对象
 */
export function stringifyJson(json){
    return JSON.stringify(json, (k, v) => {
        // 将正则对象转换为正则字符串
        if(v instanceof RegExp){
            return v.toString();
        }

        return v;
    });
}
// 保存table配置
export function handleSave(tableTarget = "student", config = {}) {
    store.dispatch("page/saveTableConfig", {
        tableTarget: tableTarget,
        configValue: stringifyJson(config)
    })
}
export function save(){
    store.dispatch("page/saveTableConfig", {
        tableTarget: "clazz",
        configValue: stringifyJson({fields: [
                {type: 'input', label: '班级号', prop: 'id', placeholder: '请输入班级号', disabled: false},
                {
                    type: "input",
                    label: "班主任教工号",
                    prop: "teacherId",
                    placeholder: "请输入班主任教工号",
                    disabled: false
                },
                {
                    type: "select",
                    label: "所属学院",
                    prop: "department",
                    options: [
                        "人工智能学院"
                    ],
                    disabled: false
                }
            ],
            rules: {
                id: [
                    {required: true, message: '请输入班级号', trigger: 'blur'},
                    {pattern: /^[0-9]{8,10}$/, message: "8-10 位数字", trigger: 'blur'}
                ],
                teacherId:[
                    {required: true, message: "请输入班主任教工号", trigger: "blur"},
                    {pattern: /^[0-9]{3,8}$/, message: "3-8位数字", trigger: "blur"}
                ]
            },
            form: {
                id: "",
                teacherId: "",
                department: ""
            }})
    })
// handleSave("student",)
    message.success("保存成功")
}

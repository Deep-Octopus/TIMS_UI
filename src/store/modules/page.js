import {
    addEntity,
    deleteEntity,
    getStudents,
    initClazz,
    initEntity,
    multipleDeleteEntity,
    updateEntity
} from "@/api/user";
import message from "@/utils/message";
import request from "@/utils/request";

const state = {
    currentShow:'table',
    dialogVisible: false,
    dialogTitle: '',
    dialogMode: '',
    allData: [],
    fields: [
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
    },
    tableCurrentEntity: 'student',

    multipleSelection: [],// 存储选中的数据项

    returnShow: false,
    returnKey: 0,
    changePwdShow:false
    // addStatus:false,
}


const mutations = {
    CONFIG(state, data) {
        let config = JSON.parse(data)
        state.form = config.form
        state.fields = config.fields
        state.rules = config.rules
    },
    INIT_SUCCESS(state, data) {
        state.allData = data;
        message.success("数据获取成功")
    },
    ADD_ENTITY_SUCCESS(state, data) {
        state.allData.push({...data})
        message.success("添加成功")
        state.dialogVisible = false
    },
    DELETE_ENTITY_SUCCESS(state, data) {
        state.allData = state.allData.filter(item => !data.includes(item.id))
        message.success("删除成功")
    },
    MULTIPLEDELETE_ENTITY_SUCCESS(state, data) {
        state.allData = state.allData.filter(item => !data.includes(item.id))
        message.success("删除成功")
    },
    UPDATE_ENTITY_SUCCESS(state, data) {
        state.allData = state.allData.map((item) => {
            if (item.id === data.id) {
                return {...data};
            } else {
                return item;
            }
        });

        message.success("更新成功")
        state.dialogVisible = false
        actions.resetForm()
    }
}

const actions = {

    saveTableConfig(context, configData) {
        request.post("/api/auth/setTableConfig", configData).then(resp => {
            if (resp.status === 200) message.success("配置保存成功")
            else message.error(resp.message)
        })
    },
    getTableConfig(context) {
        request.get(`/api/auth/getTableConfig/${state.tableCurrentEntity}`).then(resp => {
            if (resp.status === 200) {
                context.commit("CONFIG", resp.data)
            }
        })
    },
    resetForm() {
        state.fields.map(field => field.disabled = false)
        for (let key in state.form) {
            state.form[key] = ''
        }
    },
    init(context) {
        initEntity(state.tableCurrentEntity).then(resp => {
            if (resp.status === 200) {
                context.commit("INIT_SUCCESS", resp.data)
            }
        }).catch(err => {
            console.error(err)
            message.error("添加失败")
        })
    },
    initClazzByTeacher(context, teacherId) {
        initClazz(teacherId, 'clazz').then(resp => {
            if (resp.status === 200) {
                context.commit("INIT_SUCCESS", resp.data)
            }
        }).catch(err => {
            console.error(err)
        })
    },
    add(context, data) {
        let dataTemp = {...data}
        addEntity(dataTemp, state.tableCurrentEntity).then(resp => {
            if (resp.status === 200) {
                // state.addStatus = true
                context.commit("ADD_ENTITY_SUCCESS", dataTemp)
            } else {
                message.error(resp.message)
            }
        }).catch(err => {
            console.error(err)
            message.error("添加失败")
        })
    },
    delete(context, data) {
        deleteEntity(data, state.tableCurrentEntity).then(resp => {
            if (resp.status === 200) {
                context.commit("DELETE_ENTITY_SUCCESS", data)
            }
        }).catch(err => {
            console.error(err)
            message.error(err)
        })
    },
    multipleDelete(context) {
        let idList = state.multipleSelection.map(item => item.id)
        console.log(idList)
        multipleDeleteEntity(idList, state.tableCurrentEntity).then(resp => {
            if (resp.status === 200) {
                context.commit("MULTIPLEDELETE_ENTITY_SUCCESS", idList)
            }
        }).catch(err => {
            console.error(err)
            message.error(err)
        })
    },
    update(context, data) {
        let dataTemp = {...data}
        updateEntity(dataTemp, state.tableCurrentEntity).then(resp => {
            if (resp.status === 200) {
                context.commit("UPDATE_ENTITY_SUCCESS", dataTemp)
            }
        }).catch(err => {
            console.error(err)
            message.error("更新失败")
        })
    },
    getStudentsByClazz(context, clazzId) {
        getStudents(clazzId, "clazz").then(resp => {
            if (resp.status === 200) {
                context.commit("INIT_SUCCESS", resp.data)
            } else {
                message.error(resp.message)
            }
        }).catch(err => {
            console.error(err)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
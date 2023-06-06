import {changeUserPwd, getUser, getUserInfoApi, userLogin, userLogOut} from "@/api/user";
import message from "@/utils/message";
import router from "@/router";

const state = {
    avatarUrl: require("@/assets/ava.png"),
    user: {
        username: "",
        auth: ""
    },
    userInfo:{

    },
    clazz:[
        "121230201",
        "121230202",
        "121230203",
        "121230204"
    ]
}



const mutations = {
    LOGIN_SUCCESS(state,data) {
        state.user.auth = data.data.user_type
        state.user.username = data.id

        localStorage.setItem('jwtToken',data.data.token)
        localStorage.setItem('user',JSON.stringify(state.user))

        data.router.replace('/home')
        message.success("登录成功")
    },
    INIT_USER_AUTH_SUCCESS(state,data) {
        state.user.auth = data.data.user_type
        state.user.username = data.data.username

        localStorage.setItem('user',JSON.stringify({auth:data.data.user_type,username:data.data.username}))
    }
}

const actions = {
    login(context, data) {
        let user = data.form
        let router = data.router
        userLogin(user).then(resp => {
            if (resp.status === 200) {
                context.commit("LOGIN_SUCCESS",{data:resp.data,router:router,id:user.username})
            }else if (resp.status === 404){
                message.error("账号不存在")
            }else if (resp.status === 401){
                message.error("密码错误")
            } else{
                message.error(resp.message)
            }
        })
    },
    getUsernameAndAuth(context,afterDo){
        getUser().then(resp => {
            if (resp.status === 200) {
                context.commit("INIT_USER_AUTH_SUCCESS",{...resp})
                afterDo && afterDo()
            }else{
                message.error("用户信息获取失败")
            }
        }).catch(err => {
        //     会显示afterDo不是一个方法，但是会执行，待解决
        })
    },
    getUserInfo(context){
        //TODO:今天要做的
        getUserInfoApi().then(resp => {
            if (resp.status === 200) {
                state.userInfo = resp.data
                context.dispatch("getUsernameAndAuth")
            }else{
                message.error(resp.message)
            }
        })
    },
    logout(context,afterDo){
      userLogOut().then(resp => {
          if (resp.status === 200) {
              afterDo()
              message.success("拜拜")
          }else{
              message.error(resp.message)
          }
      }).catch(err => {
          //     会显示afterDo不是一个方法，但是会执行，待解决
      })
    },
    changePwd(context,form){
        context.dispatch("getUsernameAndAuth",()=>{
            form = {...form,...state.user}
            changeUserPwd(form).then(resp => {
                if (resp.status === 200) {
                    message.success("密码修改成功，请重新登录")
                    context.rootState.page.changePwdShow = false
                    router.replace("/login")
                }else if(resp.status === 403){
                    message.error("旧密码输入错误")
                } else if(resp.status === 402){
                    message.error("旧密码和新密码一样")
                }else{
                    message.error(resp.message)
                }
            })
        })

    }

}

export default{
    namespaced : true,
    state,
    mutations,
    actions
}
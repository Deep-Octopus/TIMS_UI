<template>
  <div id="header">
    <div class="marquee-container">
      <div class="marquee-content">
        欢迎你！{{ $store.state.user.userInfo.name }}
      </div>
    </div>


    <template v-if="$store.state.user.user.auth!=='student'">
      <el-tooltip v-if="returnShow" class="item" effect="dark" content="返回" placement="top">
        <i v-if="returnShow" class="iconfont" style="color: red" @click="goReturn">&#xe669;</i>
      </el-tooltip>
<!--      <el-input-->
<!--          v-if="$store.state.page.tableCurrentEntity!=='student' && currentShow!=='calander'"-->
<!--          placeholder="请输入搜索内容"-->
<!--          v-model="searchContent"-->
<!--          style="width: 300px;margin-right: 15px;margin-top: -5px"-->
<!--          class="input-with-select">-->
<!--        <el-select v-model="searchType" slot="prepend" placeholder="请选择">-->
<!--          <el-option v-for="(field, index) in $store.state.page.fields" :label="field.label" :value="field.prop" :key="index"></el-option>-->
<!--        </el-select>-->
<!--        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
<!--      </el-input>-->
      <el-tooltip v-if="$store.state.page.tableCurrentEntity!=='student' && currentShow!=='calander'" class="item"
                  effect="dark" content="日历" placement="top">
        <i class="iconfont " @click="changeShow('calander')">&#xe65f;</i>
      </el-tooltip>

      <el-tooltip v-if="currentShow!=='table'" class="item" effect="dark" content="信息表" placement="top">
        <i class="iconfont " @click="changeShow('table')">&#xe758;</i>
      </el-tooltip>
      <el-tooltip v-if="currentShow!=='calander'" class="item" effect="dark" :content="changeContent" placement="top">
        <i v-if="$store.state.user.user.username === '000'" class="iconfont" @click="changeTableTarget">&#xe7e9;</i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="新增" placement="top">
        <i class="el-icon-circle-plus " @click="addDialogView()"
        ></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
        <i class="el-icon-delete-solid " @click="multipleDelete()"></i>
      </el-tooltip>
    </template>
    <template v-else>
      <el-tooltip v-if="currentShow!=='calander'" class="item" effect="dark" content="日历" placement="top">
        <i class="iconfont " @click="changeShow('calander')">&#xe65f;</i>
      </el-tooltip>
      <el-tooltip v-if="currentShow!=='table'" class="item" effect="dark" content="作业列表" placement="top">
        <i class="iconfont" @click="changeShow('table')">&#xe61a;</i>
      </el-tooltip>
    </template>


    <el-dropdown @command="handleCommand">
      <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium"
                 style="margin-top: -5px"></el-avatar>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">个人信息</el-dropdown-item>
        <el-dropdown-item command="2">修改密码</el-dropdown-item>
        <el-dropdown-item command="3" divided style="color: red">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-drawer :visible.sync="infoVisible" :close-on-click-modal="true">
      <my-description :user-info="user_info" :target="$store.state.user.user.auth" title="个人信息"></my-description>
    </el-drawer>
  </div>
</template>
<script>
import message from "@/utils/message";
import MyDescription from "@/components/myDescription.vue";

export default {
  components: {MyDescription},
  data() {
    return {
      infoVisible: false,
      searchType:'',
      searchContent:'',
    }
  },
  computed: {
    currentShow() {
      return this.$store.state.page.currentShow
    },
    changePwdShow() {
      return this.$store.state.page.changePwdShow
    },
    changeContent() {
      return `查看${this.$store.state.page.tableCurrentEntity === 'clazz' ? '老师' : '班级'}`
    },
    returnShow() {
      return this.$store.state.page.returnShow
    },
    user_info() {
      return this.$store.state.user.userInfo
    },
    user() {
      return JSON.parse(localStorage.getItem("user"))
    }
  },
  methods: {
    handleCommand(command) {
      if (command === '1') this.showInfo()
      else if (command === '2') this.changePwd()
      else this.logOut()
    },
    logOut() {
      this.$confirm("您确定退出吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("user/logout", () => {
              localStorage.removeItem("user")
              localStorage.removeItem("jwtToken")
              this.$router.replace('/login')
            }
        )

      })
    },
    changePwd() {
      this.$store.state.page.changePwdShow = true
    },
    multipleDelete() {
      if (this.$store.state["page/multipleSelection"].length > 0) {
        this.$confirm("此操作将不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$store.dispatch("page/multipleDelete")
        })
      }

    },
    addDialogView() {
      this.$store.state.page.dialogTitle = '新增信息'
      this.$store.state.page.dialogMode = 'add'
      this.$store.state.page.dialogVisible = true
    },
    showInfo() {
      this.infoVisible = true
      this.$store.dispatch("user/getUserInfo")
    },
    goReturn() {
      this.$store.state.page.returnShow = false
      this.searchType = ''
      // 恢复数据
      this.$store.state.page.form = this.$store.state.page.temp.form
      this.$store.state.page.rules = this.$store.state.page.temp.rules
      this.$store.state.page.fields = this.$store.state.page.temp.fields
      this.$store.state.page.allData = this.$store.state.page.temp.allData

      // this.$router.go("/home")
      this.$store.state.page.tableCurrentEntity = 'clazz'
      // this.$store.dispatch('page/getTableConfig')
      // this.$store.dispatch("page/init")
    },
    changeTableTarget() {
      this.$store.state.page.tableCurrentEntity = this.$store.state.page.tableCurrentEntity === 'clazz' ? "teacher" : "clazz"
      this.$store.dispatch('page/getTableConfig')
      this.$store.dispatch("page/init")
    },
    changeShow(show) {
      this.$store.state.page.currentShow = show
    },
    search(){
      if (this.searchType ===''){
        message.warning("请先选择搜索属性")
        return
      }
      if (this.searchContent === ''){
        message.warning("请输入搜索内容")
        return;
      }

      this.$store.dispatch("page/search",{
        searchType: this.searchType,
        searchContent: this.searchContent
      })
      this.$store.state.page.returnShow = false
    }
  }
}
</script>
<style scoped lang="less">
#header {
  height: 40px;
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  justify-content: right;
  font-size: 12px;
  padding: 5px;
}

.marquee-container {
  margin-right: 15px;
  display: inline-block;
  width: 66%;
  overflow: hidden;
}

.marquee-content {
  font-size: 16px;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
}

.item {
  margin-right: 15px;
  font-size: 25px;
  cursor: pointer;

  transform-origin: center;
}

.item:hover {
  scale: 1.2;
  animation: shake 0.5s ease-in-out infinite;
}

.avatar:hover {
  animation: ;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

</style>
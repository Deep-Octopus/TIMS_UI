<template>
  <div id="main">
    <div class="contain">
      <TopBar></TopBar>

      <template v-if="currentShow!=='calander'">
        <InformationTable v-if="$store.state.user.user.auth!=='student'" ref="info"></InformationTable>
        <ToDoList v-else style="text-align: left;"></ToDoList>
      </template>

      <ToDoCalander v-if="currentShow==='calander'" style="text-align: left"></ToDoCalander>

      <change-pwd :dialog-visible="changePwdShow"></change-pwd>

      <MyDialog
          :mode="dialogMode"
          :title="dialogTitle"
          :dialog-visible.sync="dialogVisible"
          :form="form"
          :rules="rules"
          :fields="fields"
          :add="add"
          :edit="edit"
          :close="closeV"
      ></MyDialog>
    </div>

  </div>
</template>


<script>
import InformationTable from "@/components/InformationTable.vue";
import TopBar from "@/components/TopBar.vue";
import MyDialog from "@/components/MyDialog.vue";
import ChangePwd from "@/components/ChangePwd.vue";
import ToDoList from "@/components/ToDoList.vue";
import ToDoCalander from "@/components/ToDoCalander.vue";

export default {
  components: {ToDoCalander, ToDoList, MyDialog, InformationTable, TopBar, ChangePwd},
  data() {
    return {}
  },
  created() {
    this.$store.dispatch("user/getUserInfo", () => {
    })
    //   获取用户名和用户类型
    this.$store.dispatch("user/getUsernameAndAuth", () => {
      if (this.$store.state.user.user.auth === 'teacher') {
        this.$store.state.page.tableCurrentEntity = 'clazz'
        this.$store.dispatch("page/getTableConfig")
        if (this.$store.state.user.user.username === '000') {
          this.$store.dispatch("page/init")
        } else {
          this.$store.dispatch("page/initClazzByTeacher", this.$store.state.user.user.username)
        }
        this.$store.dispatch("page/resetForm")
      }


    })
  },
  mounted() {
    // this.$store.dispatch("page/getTableConfig")//获取配置
    // this.$store.dispatch("page/init")
    // this.$store.dispatch("page/resetForm")
  }
  ,
  computed: {
    currentShow() {
      return this.$store.state.page.currentShow
    },
    form() {
      return this.$store.state.page.form
    },
    dialogVisible() {
      return this.$store.state.page.dialogVisible
    },
    fields() {
      return this.$store.state.page.fields
    },
    rules() {
      return this.$store.state.page.rules
    },
    dialogMode() {
      return this.$store.state.page.dialogMode
    },
    dialogTitle() {
      return this.$store.state.page.dialogTitle
    },
    changePwdShow() {
      return this.$store.state.page.changePwdShow
    }
  },
  methods: {
    add() {
      this.$store.dispatch("page/add", this.form)
      this.$refs.info.getData()
    },
    edit() {
      this.$store.dispatch("page/update", this.form)
      this.$refs.info.getData()
    },
    closeV() {
      this.$store.state.page.dialogVisible = false

      //TODO:disabled改为false

    }
    ,
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  }
}
</script>
<style lang="less" scoped>

#main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contain {
  height: 680px;
  width: 1200px;

  padding: 10px 20px;

  position: relative;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe,
    -15px -15px 30px #ffffff;
}

.contain::before {
  content: "教学信息管理系统";
  background-color: #C2C2C2;
  box-shadow: #999999 4px 5px;
  padding: 2px;
  border-radius: 3px;
  position: absolute;
  top: -5px;
  left: 0;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 25px;
  line-height: 2;
  transform: translate(25px, -23px);
  z-index: 99;
}
</style>
<template>
  <div>
    <el-table
        v-loading="loading"
        stripe
        :data="tableData"
        max-height="610"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55"
          align="center"
      >
      </el-table-column>
      <el-table-column
          v-for="(field,index) in fields"
          :prop=field.prop
          :label=field.label
          :key=index
          align="center"
      ></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="220"
          align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="onlyShowLook" round type="success" size="small" @click="doLook(scope.row)">查看</el-button>
          <el-button-group v-else>
            <el-button round type="success" size="small" @click="doLook(scope.row)">查看</el-button>
            <el-button round type="warning" size="small" @click="doUpdate(scope.row)">修改</el-button>
            <el-button round type="danger" size="small" @click="doDelete(scope.row)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        id="pagination"
        :total="total"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="sizes, prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>

    <el-drawer :visible.sync="lookInfoVisible" :close-on-click-modal="true">
      <my-description :user-info="lookUserInfo" :target="$store.state.page.tableCurrentEntity" title="查看信息"></my-description>
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
      tableData: [],

      total: 0, // 总条数
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页码

      addDialogVisible: false,
      seeDialogVisible: false,
      // 查看
      lookInfoVisible:false,
      lookUserInfo:{},

      loading: false,
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    allData() {
      this.getData()
    }
  },

  computed: {
    onlyShowLook(){
      return this.$store.state.page.tableCurrentEntity === 'clazz' && this.$store.state.user.user.username !== '000'
    },
    message() {
      return message
    },
    allData() {
      return this.$store.state.page.allData
    },
    user(){
      return this.$store.state.user.user
    },
    fields() {
      return this.$store.state.page.fields
    },
    form(){
      return this.$store.state.page.form
    },
  },
  methods: {
    getData() {
      // 根据当前页码和每页显示条数获取数据
      // 示例中使用了假数据，请根据实际情况替换为真实的获取数据的逻辑
      // 以下为示例假数据的获取方式
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.tableData = this.allData.slice(start, end);
      this.total = this.allData.length;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
      this.getData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getData();
    },

    handleSelectionChange(selection) {
      this.$store.state.page.multipleSelection = selection;
    },
    toggleSelection() {
      if (this.multipleSelection.length > 0) {
        this.$store.state.page.multipleSelection = [];
      } else {
        // 设置为全选，将所有数据项加入到 multipleSelection 数组中
        this.$store.state.page.multipleSelection = [...this.tableData];
      }
    },
    getRowKey(row) {
      // 返回每行数据的唯一标识符
      return row.id;
    },

    doDelete(row){
      this.$confirm("此操作将不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("page/delete",row.id)
      })

    },
    doUpdate(row){
      this.$store.state.page.fields[0].disabled = true

      this.$store.state.page.dialogTitle = '更新信息'
      this.$store.state.page.dialogMode = 'edit'
      this.$store.state.page.form = {...row}
      this.$store.state.page.dialogVisible = true
    },
    doLook(row){
      if (this.$store.state.page.tableCurrentEntity === 'clazz'){
        // 暂存
        this.$store.state.page.temp.fields = this.$store.state.page.fields
        this.$store.state.page.temp.rules = this.$store.state.page.rules
        this.$store.state.page.temp.form = this.$store.state.page.form
        this.$store.state.page.temp.allData = this.$store.state.page.allData

        // 查看班级
        this.$store.state.page.tableCurrentEntity = 'student'
        this.$store.dispatch('page/getTableConfig')
        this.$store.dispatch("page/getStudentsByClazz",row.id)
        this.$store.state.page.returnShow = true
      } else {
        // 查看老师或者学生信息
        this.lookUserInfo = {...row}
        this.lookInfoVisible = true
      }

    }
  }
}
</script>
<style scoped lang="less">
body{
  margin: 0;
}
#pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
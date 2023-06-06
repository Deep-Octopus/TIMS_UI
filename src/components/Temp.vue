<template>
  <div>
    <el-button type="primary" @click="openAddDialog">添加</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-button type="primary" @click="openViewDialog(row)">查看</el-button>
          <el-button type="warning" @click="openEditDialog(row)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加对话框 -->
    <info-dialog
      :mode="'add'"
      :title="'添加学生信息'"
      :dialog-visible.sync="addDialogVisible"
      :form="addForm"
      :rules="addRules"
      :fields="addFields"
      :add="addStudent"
      :close="closeAddDialog"
    ></info-dialog>

    <!-- 查看对话框 -->
    <info-dialog
      :mode="'view'"
      :title="'学生信息'"
      :dialog-visible.sync="viewDialogVisible"
      :form="viewForm"
      :rules="viewRules"
      :fields="viewFields"
      :close="closeViewDialog"
    ></info-dialog>

    <!-- 编辑对话框 -->
    <info-dialog
      :mode="'edit'"
      :title="'编辑学生信息'"
      :dialog-visible.sync="editDialogVisible"
      :form="editForm"
      :rules="editRules"
      :fields="editFields"
      :edit="editStudent"
      :delete="deleteStudent"
      :close="closeEditDialog"
    ></info-dialog>
  </div>
</template>

<script>
import InfoDialog from "@/components/InfoDialog.vue";

export default {
  name: "StudentManagement",
  components: { InfoDialog },
  data() {
    return {
      tableData: [],

      // TODO: define addForm, viewForm, editForm, addRules, viewRules, editRules, addFields, viewFields, editFields

      addDialogVisible: false,
      viewDialogVisible: false,
      editDialogVisible: false,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialogVisible = true;
    },
    closeAddDialog() {
      this.addDialogVisible = false;
      this.$refs.addForm.resetFields();
    },
    addStudent() {
      // TODO: add student to database
      this.closeAddDialog();
    },

    openViewDialog(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    closeViewDialog() {
      this.viewDialogVisible = false;
    },

    openEditDialog(row) {
      this.editForm = { ...row };
      this.editDialogVisible = true;
    },
    closeEditDialog() {
      this.editDialogVisible = false;
    },
    editStudent() {
      // TODO: update student data in database
      this.closeEditDialog();
    },
    deleteStudent() {
      // TODO: delete student from database
      this.closeEditDialog();
    },
  },
};
</script>

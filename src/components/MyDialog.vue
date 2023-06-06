<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="false"
      :lock-scroll="true"
  >
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="80px"
    >
      <template v-for="(field, index) in fields">
        <el-form-item :label="field.label" :key="index" :prop="field.prop">
          <template v-if="field.type==='input'">
            <el-input
                v-model=form[field.prop]
                :placeholder="field.placeholder"
                :disabled = field.disabled
            ></el-input>
          </template>
          <template v-if="field.type==='textarea'">
            <el-input
                type="textarea"
                v-model=form[field.prop]
                :placeholder="field.placeholder"
                :disabled = field.disabled
            ></el-input>
          </template>
          <template v-if="field.type==='select'">
            <el-select
                v-model=form[field.prop]
                :placeholder="field.placeholder"
                :disabled = field.disabled
            >
              <el-option
                  v-for="(option, optionIndex) in field.options"
                  :key="optionIndex"
                  :label="option"
                  :value="option"
              ></el-option>
            </el-select>
          </template>
          <template v-if="field.type==='radio'">
              <el-radio-group
                  v-model=form[field.prop]
                  :disabled = field.disabled
              >
                <el-radio v-for="(option,optionIndex) in field.options" :label="option" :key="optionIndex"></el-radio>
              </el-radio-group>
          </template>
          <template v-if="field.type==='date'">
            <el-date-picker
                v-model=form[field.prop]
                type="date"
                placeholder="请选择日期"
                :disabled = field.disabled></el-date-picker>
          </template>
        </el-form-item>
      </template>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <template v-if="mode=='add'">
        <el-button type='danger' @click="resetForm('form')">重置</el-button>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="validate()">添加</el-button>
      </template>
      <template v-if="mode=='view'">
        <el-button type="primary" @click="doClose">关闭</el-button>
      </template>
      <template v-if="mode=='edit'">
        <el-button type="danger" @click="doDelete()">删除</el-button>
        <el-button @click="doClose">取消</el-button>
        <el-button type="primary" @click="validate()">保存</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import message from "@/utils/message";

export default {
  name: "MyDialog",
  /**
   * mode: 模式，可选值包括 add、edit、view，分别表示添加、编辑和查看模式。默认为 view。
   * title: 对话框标题。
   * dialogVisible: 对话框是否显示。
   * form: 表单数据对象，必须包含与 fields 中定义的属性相同的属性。
   * rules: 表单验证规则对象。
   * fields: 表单项数组，定义了每个表单项的类型、标签、属性和占位符等属性。
   * add: 添加操作的回调函数，由父组件传递。
   * edit: 编辑操作的回调函数，由父组件传递。
   * delete: 删除操作的回调函数，由父组件传递。
   * close: 关闭操作的回调函数，由父组件传递。
   */
  props: {
    mode: {
      type: String,
      default: "view", // 'add', 'edit', 'view'
    },
    title: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    fields: {
      type: Array,
      default: () => [], // e.g., [{ type: 'input', label: '', prop: '', placeholder: '' }]
    },
    add: {
      type: Function,
      default: () => {},
    },
    edit: {
      type: Function,
      default: () => {},
    },
    delete: {
      type: Function,
      default: () => {},
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    doClose(){
      this.resetForm('form')
      this.$store.dispatch('page/resetForm')
      this.close()
    },
    doDelete(){
      this.$confirm("此操作将不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("page/delete",this.$store.state.page.form.id)
      }).then(() => {
        this.$store.state.page.dialogVisible = false
      })
    },
    validate(){
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.mode === 'add'){
            this.add()
          }
          if (this.mode === 'edit'){
            this.edit()
          }
          this.resetForm('form')
          this.$store.dispatch('page/resetForm')
        } else {
          message.error("输入不符合规范")
          return false;
        }
      });
    }
  },
};
</script>

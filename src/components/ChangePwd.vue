<template>
  <div class="change-password">
    <el-dialog
        title="更改密码"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        custom-class="change-password-dialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="change-password-footer">
        <el-button @click="$store.state.page.changePwdShow=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less">
.change-password {
  .el-button {
    background-color: #ff6a00;
    border-color: #ff6a00;
    color: #fff;
    &:hover,
    &:focus {
      background-color: #ff7c1a;
      border-color: #ff7c1a;
    }
  }
}

.change-password-dialog {
  .el-dialog__header {
    background-color: #ff6a00;
    color: #fff;
  }
  .el-form-item__label {
    color: #666;
  }
  .el-input__inner {
    background-color: #f2f2f2;
    border-color: #d9d9d9;
    color: #333;
    &:hover,
    &:focus {
      border-color: #ff6a00;
    }
  }
}

.change-password-footer {
  text-align: center;
  .el-button {
    margin-left: 20px;
  }
}
</style>

<script>
export default {
  props:{
    dialogVisible:{
      require: true,
      default: false
    }
  },
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: this.checkPasswordMatch, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            this.$store.state.page.changePwdShow = false
            done();
          })
          .catch(() => {});
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 处理表单提交逻辑
          this.$store.dispatch("user/changePwd",this.form)
        }
      });
    },
    checkPasswordMatch(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
  },
};
</script>

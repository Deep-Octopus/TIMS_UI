<template>
  <el-descriptions class="desc" :title="title" :column="1" border>
    <template slot="extra">
      <el-tooltip content="复制信息" effect="dark" placement="top">
        <el-button type="primary" size="small" class="iconfont" @click="copy(JSON.stringify(userInfo))"  style="font-size: 20px">&#xe600;</el-button>
      </el-tooltip>
    </template>
    <el-descriptions-item>
      <template v-if="target === 'teacher'" slot="label">
        <i class="iconfont">&#xe7de;</i>
        教工号
      </template>
      <template v-else slot="label">
        <i class="iconfont">&#xe7de;</i>
        学号
      </template>
      {{ userInfo.id }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="iconfont">&#xe60a;</i>
        姓名
      </template>
      {{ userInfo.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="iconfont">&#xe619;</i>
        性别
      </template>
      {{ userInfo.gender }}
    </el-descriptions-item>
    <el-descriptions-item v-if="target ==='teacher'">
      <template slot="label">
        <i class="iconfont">&#xe604;</i>
        学历
      </template>
      <el-tag size="small">{{ userInfo.educationalBackground }}</el-tag>
      <!--      <el-tag size="small">学校</el-tag>-->
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="iconfont">&#xe96d;</i>
        联系电话
      </template>
      {{ userInfo.phoneNumber }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import message from "@/utils/message";

export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    title:{
      type: String,
      default:"介绍列表"
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods:{
    copy(data){
      let url = data;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value)
      document.execCommand("Copy"); // 执行浏览器复制命令
      message.success("复制成功")
      oInput.remove()
    },
  }
}
</script>
<style scoped lang="less">
.desc {
  padding: 20px;
}
</style>
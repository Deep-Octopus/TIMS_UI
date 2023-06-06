<template>
  <el-collapse accordion style="padding: 0 20px;background: white;overflow: auto;height: 600px">
    <el-collapse-item v-for="(work,index) in workInfo" :key="index">
      <template slot="title">
        <el-checkbox v-model="work.isChecked">{{  }}</el-checkbox>
        <p :style="`text-decoration: ${work.isChecked ? 'line-through' : 'none'}`" >{{ work.title }}</p>
      </template>
      <div style="padding: 5px 0">
        <el-tag type="success" size="small" v-for="(tag,ind) in work.tags" :key="ind">{{ tag }}</el-tag>
        <el-tag type="danger" size="small">{{ work.dateLine }}</el-tag>
      </div>
      <div>{{ work.description }}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      workInfo: [
        {
          title: '高级Java第一次作业',
          tags: ["高级Java"],
          dateLine: "2023/06/06",
          description: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
          isChecked:true
        },
        {
          title: '数据结构算法第三次作业',
          tags: ['数据结构', '算法'],
          dateLine: '2023/06/12',
          description: '使用最优算法解决问题：在保证正确性的前提下，使用时间和空间复杂度最优的算法解决问题。',
          isChecked:false
        },
        {
          title: '计算机网络实验二',
          tags: ['计算机网络', '实验'],
          dateLine: '2023/06/15',
          description: '实践操作：通过实验，掌握计算机网络协议的实际应用，加深对理论知识的理解。',
          isChecked:true
        },
        {
          title: '操作系统课程设计',
          tags: ['操作系统', '课程设计'],
          dateLine: '2023/06/20',
          description: '实现系统功能：通过设计和实现操作系统的核心功能，掌握操作系统的原理和实现技术。',
          isChecked:false
        },
        {
          title: '数据库管理系统作业',
          tags: ['数据库', '管理系统'],
          dateLine: '2023/06/23',
          description: '数据存取与处理：使用数据库管理系统实现数据的增删改查和复杂查询，掌握数据库的使用方法。',
          isChecked:false
        },
        {
          title: '软件工程项目开发',
          tags: ['软件工程', '项目开发'],
          dateLine: '2023/06/30',
          description: '团队协作：通过团队合作完成软件项目的开发过程，掌握项目管理和软件工程实践。',
          isChecked:false
        },
        {
          title: '人工智能基础课程',
          tags: ['人工智能', '基础课程'],
          dateLine: '2023/07/05',
          description: '算法应用：通过学习常用的人工智能算法和应用案例，掌握人工智能的基础知识和实现方法。',
          isChecked:false
        },
        {
          title: 'Web开发项目',
          tags: ['Web开发', '项目'],
          dateLine: '2023/07/10',
          description: '前后端开发：通过实现Web应用的前后端交互，掌握前端和后端开发技术。',
          isChecked:false
        },
        {
          title: '软件测试实验课程',
          tags: ['软件测试', '实验课程'],
          dateLine: '2023/07/15',
          description: '测试方法：通过实践测试用例的编写和测试方法的使用，掌握软件测试的基础知识和实践技能。',
          isChecked:false
        },
        {
          title: '计算机组成原理作业',
          tags: ['计算机组成原理', '作业'],
          dateLine: '2023/07/20',
          description: 'CPU设计：通过实现简单CPU的设计和实现，掌握计算机硬件和指令集的原理和实现方法。',
          isChecked:false
        },{
          title: '操作系统课程设计',
          tags: ['操作系统', '课程设计'],
          dateLine: '2023/06/20',
          description: '实现系统功能：通过设计和实现操作系统的核心功能，掌握操作系统的原理和实现技术。',
          isChecked:false
        },
        {
          title: '数据库管理系统作业',
          tags: ['数据库', '管理系统'],
          dateLine: '2023/06/23',
          description: '数据存取与处理：使用数据库管理系统实现数据的增删改查和复杂查询，掌握数据库的使用方法。',
          isChecked:false
        },
        {
          title: '软件工程项目开发',
          tags: ['软件工程', '项目开发'],
          dateLine: '2023/06/30',
          description: '团队协作：通过团队合作完成软件项目的开发过程，掌握项目管理和软件工程实践。',
          isChecked:false
        },
        {
          title: '人工智能基础课程',
          tags: ['人工智能', '基础课程'],
          dateLine: '2023/07/05',
          description: '算法应用：通过学习常用的人工智能算法和应用案例，掌握人工智能的基础知识和实现方法。',
          isChecked:false
        },
        {
          title: 'Web开发项目',
          tags: ['Web开发', '项目'],
          dateLine: '2023/07/10',
          description: '前后端开发：通过实现Web应用的前后端交互，掌握前端和后端开发技术。',
          isChecked:false
        },
        {
          title: '软件测试实验课程',
          tags: ['软件测试', '实验课程'],
          dateLine: '2023/07/15',
          description: '测试方法：通过实践测试用例的编写和测试方法的使用，掌握软件测试的基础知识和实践技能。',
          isChecked:false
        },
        {
          title: '计算机组成原理作业',
          tags: ['计算机组成原理', '作业'],
          dateLine: '2023/07/20',
          description: 'CPU设计：通过实现简单CPU的设计和实现，掌握计算机硬件和指令集的原理和实现方法。',
          isChecked:false
        }
      ]
    }
  }
};
</script>
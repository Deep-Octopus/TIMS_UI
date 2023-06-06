<!--TODO-->
<template>
  <div style="height: 300px">
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
          slot="dateCell"
          slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      dialogVisible: false,
      inputValue: '',
      todos: []
    }
  },
  methods: {
    handleChange(date) {
      this.date = date
    },
    addTodo() {
      if (this.inputValue.trim() === '') {
        return
      }
      this.todos.push({
        text: this.inputValue.trim(),
        done: false
      })
      this.inputValue = ''
      this.dialogVisible = false
    }
  },
  computed: {
    todoCount() {
      return this.todos.filter(todo => !todo.done).length
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .el-calendar-table .el-calendar-day{
  height: 75px;
}

.is-selected {
  color: #1989FA;
}
</style>

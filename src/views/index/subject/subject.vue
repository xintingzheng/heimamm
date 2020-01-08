<template>
  <div class="subject">
    <!-- 上半部分模块 -->
    <el-card class="subject-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="small" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="small" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="优秀" value="shanghai"></el-option>
            <el-option label="良好" value="beijing"></el-option>
            <el-option label="差" value="beijing"></el-option>
            <el-option label="较差" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="$refs.addDialog.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分模块 -->
    <el-card class="subject-buttom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >禁用</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页模块 -->
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSize"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增输入框组件 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
// 导入新增模块的子组件
import addDialog from "./components/addDialog.vue";
// 导入学科接口
import { subjectList } from "@/api/subject.js";

export default {
  name: "subject",
  components: {
    addDialog
  },
  created() {
    subjectList({
      // 使用定义好的数据,方便后期维护
      // 页码
      page: this.page,
      // 页容量
      limit: this.size
    }).then(res => {
      // window.console.log(res);
      // 数据 赋值
      this.tableData = res.data.items;
      // 赋值 总页数
      this.total = res.data.pagination.total;
    })
  },
  data() {
    return {
      // title
      formInline: {},
      // 表格数据
      tableData: [],
      // 分页模块 默认选中的页数
      page: 1,
      // 页容量选项
      pageSize: [5,10,20,30],
      // 默认页容量
      size: 5,
      // 数据总条数量
      total: 0,
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    handleClick(row) {
      window.console.log(row);
    },
    // 分页模块
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
    // 新增按钮提交事件
  }
};
</script>

<style lang="less">
.subject {
  .subject-top {
    margin-bottom: 19px;
  }

  .paging {
    margin-top: 30px;
    text-align: center;
  }

  .el-table .cell {
    color: #5a5d62;
  }

  .small {
    width: 100px;
  }
}
</style>
<template>
  <div class="user">
    <!-- 上半部分模块 -->
    <el-card class="user-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="$refs.addDialog.dialogFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分模块 -->
    <el-card class="user-buttom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="role_id" label="角色" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column label="操作" display="flex:1"></el-table-column>
      </el-table>
      <!-- 分页模块 -->
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增组件 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
// 导入新增组件
import addDialog from './components/addDialog.vue';
import { userList } from '@/api/user.js';

export default {
  name: "user",
  // 注册组件
  components: {
    addDialog,
  },
  data() {
    return {
      
      // 表格的数据
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      // 分页模块 默认选中的页数
      currentPage4: 1,
      // 默认选中的页数
      page: 1,
      // 页容量
      size: 10,
      // 页容量选项
      pageSizes: [10, 20, 30, 50],
      // 总条数
      total: 0
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
    },
    // 获取数据
    getList() {
      userList({
        page: this.page, // 页码
        limit: this.size, // 页容量
        ...this.formInline // 展开运算符
      }).then(res => {
        // 设置 table 数据
        this.tableData = res.data.items;
        // 保存 总条数
        this.total = res.data.pagination.total;
      })
    }
  }
};
</script>

<style lang="less">
.user {
  .user-top {
    margin-bottom: 19px;
  }

  .paging {
    margin-top: 30px;
    text-align: center;
  }

  .el-table .cell {
    color: #5a5d62;
  }

  .el-dialog__header {
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
  }

  .el-dialog__title,
  .el-dialog__headerbtn .el-dialog__close {
    color: rgba(254, 254, 254, 1);
  }

  #briefIntroduction {
    height: 53px;
  }
}
</style>
<template>
  <div class="enterprise">
    <!-- 上半部分模块 -->
    <el-card class="enterprise-top">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="small" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="small" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchEnterprise">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="$refs.addDialog.dialogFormVisible = true"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分模块 -->
    <el-card class="enterprise-buttom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{ scope.row.create_itme | formatTime }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status == 1 ? "禁用": "启用"}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页模块 -->
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>

    <!-- 新增组件 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
// 导入新增组件
import addDialog from "./components/addDialog.vue";

// 接口组件
import { enterpriseList, enterpriseStatus } from "@/api/enterprise.js";

export default {
  name: "enterprise",
  components: {
    addDialog
  },
  data() {
    return {
      //表格的数据
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      // 内容
      tableData: [],
      // 分页模块 默认选中的页数
      currentPage4: 1,
      // 分页容器 默认选中的页数
      page: 1,
      // 页容量选项
      pageSizes: [5, 10, 20, 30],
      // 默认选中的页容量
      size: 5,
      // 数据总条数
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
    // 获取列表数据
    getList() {
      enterpriseList({
        page: this.page, // 页码
        limit: this.size, // 页容量
        ...this.formInline // 展开运算符 相当于把formInline丢到这里
      }).then(res => {
        // window.console.log(res);
        // 设置 table 数据
        this.tableData = res.data.items;
        // 保存 总条数
        this.total = res.data.pagination.total;
      });
    },
    // 修改状态
    changeStatus(item) {
      enterpriseStatus({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.code === 200) {
          this.$message.success("修改成功~");
          this.getList();
        }
      });
    },
    // 查询企业
    searchEnterprise() {
      this.getList();
    },
    // 清除搜索事件
    clearQuery() {
      this.$refs.formInline.resetFields();
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.enterprise {
  .enterprise-top {
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

  .small {
    width: 100px;
  }

  .red {
    color: #ff0094;
  }
}
</style>
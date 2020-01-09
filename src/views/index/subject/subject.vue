<template>
  <div class="subject">
    <!-- 上半部分模块 -->
    <el-card class="subject-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="small" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button type="primary" @click="searchSubject">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
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
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status == 0?"启用": "禁用"}}</el-button>
            <el-button type="text" @click="removeSubject(scope.row)">删除</el-button>
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
    <!-- 新增输入框组件 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑输入框组件 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入新增模块的子组件
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
// 导入学科接口
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";

export default {
  name: "subject",
  components: {
    addDialog,
    editDialog
  },
  created() {
    //获取数据
    this.getList();
  },
  data() {
    return {
      // 行内表单数据
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      // 表格数据
      tableData: [],
      // 分页模块 默认选中的页数
      page: 1,
      // 页容量选项
      pageSizes: [5, 10, 20, 30],
      // 默认页容量
      size: 5,
      // 数据总条数量
      total: 0
    };
  },
  methods: {
    // 分页模块
    handleSizeChange(size) {
      // window.console.log(`每页 ${val} 条`);
      // 保存页码
      this.size = size;
      // 到第一页
      this.page = 1;
      // 通过新页面获取数据
      this.getList();
    },
    handleCurrentChange(current) {
      // window.console.log(`当前页: ${val}`);
      // 把页码保存起来
      this.page = current;
      // 通过新的页面去获取数据
      this.getList();
    },
    // 获取数据的方法
    getList() {
      subjectList({
        // 使用定义好的数据,方便后期维护
        // 页码
        page: this.page,
        // 页容量
        limit: this.size,
        // 将formInline 合并
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        // 数据 赋值
        this.tableData = res.data.items;
        // 赋值 总页数
        this.total = res.data.pagination.total;
      });
    },
    // 修改状态
    changeStatus(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          //重新获取数据
          this.getList();
        }
      });
    },
    // 删除数据
    removeSubject(item) {
      this.$confirm("您确定要删除该条数据吗?", "温馨提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认
          subjectRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功!");
              //  判断还有没有数据
              if (this.tableData.length == 1) {
                // 如果当前页最后一条数据已被删除 页码--
                this.page--;
                // 如果数据已被删除完毕, 页码为 1
                this.page = this.page == 0 ? 1 : this.page;
              }
              //  重新获取数据
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    // 查询数据
    searchSubject() {
      this.page = 1;
      this.getList();
    },
    //清空搜索
    clearQuery() {
      //清空表单
      this.$refs.formInline.resetFields();
      //调用接口
      this.getList();
    },
    // 编辑数据
    enterEdit(item) {
      // 显示编辑框
      this.$refs.editDialog.dialogFormVisible = true;
      // 设置编辑框的数据
      // JSON.stringify(): 把数据转换为字符串
      // JSON.parse(): 把字符串转为数据
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    }
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

  .red {
    color: #ff3d3d;
  }
}
</style>
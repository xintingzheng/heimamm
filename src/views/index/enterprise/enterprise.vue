<template>
  <div class="enterprise">
    <!-- 上半部分模块 -->
    <el-card class="enterprise-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
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
          <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分模块 -->
    <el-card class="enterprise-buttom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="180"></el-table-column>
        <el-table-column prop="serial" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="username" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="createdDate" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
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
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200"
      ></el-pagination>
    </el-card>

    <!-- 新增模块 -->
    <el-dialog center width="600px" title="新增企业" :visible.sync="dialogFormVisible">
      <!-- 注册表单 -->
      <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
        <!-- 学科编号 -->
        <el-form-item label="企业编号" prop="serialNew" :label-width="formLabelWidth">
          <el-input v-model="registerForm.serialNew" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="企业名称" prop="nameNew" :label-width="formLabelWidth">
          <el-input v-model="registerForm.nameNew" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简称 -->
        <el-form-item label="企业简称" prop="forShort" :label-width="formLabelWidth">
          <el-input v-model="registerForm.forShort" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简介 -->
        <el-form-item label="企业简介" prop="briefIntroduction" :label-width="formLabelWidth">
          <el-input height="53px" id="briefIntroduction" v-model="registerForm.briefIntroduction" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科备注 -->
        <el-form-item label="企业备注" prop="remarks" :label-width="formLabelWidth">
          <el-input v-model="registerForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "enterprise",
  data() {
    return {
      // 新增
      formLabelWidth: "88px",
      dialogFormVisible: false,
      registerForm: {
        serialNew: "",
        nameNew: "",
        forShort: "",
        briefIntroduction: "",
      },
      registerRules: {
        serialNew: [
          { required: true, trigger: "change" }
        ],
        nameNew: [
          { required: true, trigger: "change" }
        ],
        forShort: [
          { required: true, trigger: "change" }
        ],
        briefIntroduction: [
          { required: true, trigger: "change" }
        ],
        remarks: [
          { trigger: "change" }
        ]
      },
      // title
      formInline: {
        user: "",
        region: ""
      },
      // 内容
      tableData: [
        {
          serial: "QD001",
          username: "黑马程序员",
          creator: "刘洋洋",
          createdDate: "2019-11-21",
          status: "启用"
        },
        {
          serial: "QD001",
          username: "阿里巴巴",
          creator: "北冰洋",
          createdDate: "2019-11-21",
          status: "禁用"
        },
      ],
      // 分页模块 默认选中的页数
      currentPage4: 1
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

  #briefIntroduction {
    height: 53px;
  }
}
</style>
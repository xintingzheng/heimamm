<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="新增企业" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="addForm" class="register" :model="addForm" :rules="addRules">
      <!-- 学科编号 -->
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseAdd } from "@/api/enterprise.js";
// 导入抽取的API
// import { enterpriseAdd } from "@/api/enterprise.js";

export default {
  data() {
    return {
      // 新增
      formLabelWidth: "88px",
      //   是否显示
      dialogFormVisible: false,
      // 表单的数据
      addForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      },
      //   验证规则
      addRules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 点击确定验证表单
          enterpriseAdd(this.addForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
                this.$message.success("新增成功");
                // 关闭对话框
                this.dialogFormVisible = false;
                // 清空表单
                this.$refs.addForm.resetFields();
                // 重新获取数据
                this.$parent.getList();
            } else if (res.code === 201) {
                this.$message.error("企业编号已存在,请更换哦~")
            }
          });
        } else {
          this.$message.warning("输入的格式不对哦~ 重新输入呗!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
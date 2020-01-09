<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="编辑企业" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="editForm" class="register" :model="editForm" :rules="editRules">
      <!-- 学科编号 -->
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="editForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseEdit } from "@/api/enterprise.js";
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
      editForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //   验证规则
      editRules: {
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
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 点击确定验证表单
          enterpriseEdit(this.editForm).then(res => {
              if (res.code === 201) { //错误时提示
                  this.$message.warning("企业编号不能重复哦~");
              } else if (res.code === 200) {
                // 关闭对话框
                this.dialogFormVisible = false;
                // 重新获取数据
                this.$parent.getList();
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
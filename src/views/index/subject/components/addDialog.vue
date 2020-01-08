<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="新增学科" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="registerForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="registerForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="registerForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "@/api/subject.js";

export default {
  data() {
    return {
      // 文本尺寸
      formLabelWidth: "100px",
      // 是否显示对话框
      dialogFormVisible: false,
      // 新增表单
      registerForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 验证规则
      registerRules: {
        rid: [
          { required: true, message: "学科编号不能为空", trigger: "change" }
        ],
        name: [
          { required: true, message: "学科名称不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitAdd() {
      this.$refs.registerForm.validate(valid => {
        // 成功
        if (valid) {
          subjectAdd(this.registerForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空内容
              this.$refs.registerForm.resetFields();
            } else if (res.code === 201) {
              // id重复
              this.$message.warning("学科的编号不能重复哦！！！");
            }
          });
        } else {
          this.$message.error("您输入的格式不对哦~ 检查一下哈!");
          return false;
        }
      });
    }
  },
  created() {
    window.console.log(subjectAdd);
  }
};
</script>

<style>
</style>
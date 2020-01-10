<template>
  <!-- 编辑模块 -->
  <el-dialog center width="600px" title="编辑学科" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="editForm" class="register" :model="editForm" :rules="editRules">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "@/api/subject.js";

export default {
  methods: {
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        // 成功
        if (valid) {
          subjectEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("编辑成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 重新获取数据
              this.$parent.getList();
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

  data() {
    return {
      // 文本尺寸
      formLabelWidth: "100px",
      // 是否显示对话框
      dialogFormVisible: false,
      // 新增表单
      editForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 验证规则
      editRules: {
        rid: [
          { required: true, message: "学科编号不能为空", trigger: "change" }
        ],
        name: [
          { required: true, message: "学科名称不能为空", trigger: "change" }
        ]
      }
    };
  },
//   created() {
    
//   }
};
</script>

<style>
</style>
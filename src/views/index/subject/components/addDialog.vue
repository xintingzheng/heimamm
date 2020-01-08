<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="新增学科" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="serialNew" :label-width="formLabelWidth">
        <el-input v-model="registerForm.serialNew" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="nameNew" :label-width="formLabelWidth">
        <el-input v-model="registerForm.nameNew" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" prop="forShort" :label-width="formLabelWidth">
        <el-input v-model="registerForm.forShort" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" prop="briefIntroduction" :label-width="formLabelWidth">
        <el-input
          height="53px"
          id="briefIntroduction"
          v-model="registerForm.briefIntroduction"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" prop="remarks" :label-width="formLabelWidth">
        <el-input v-model="registerForm.remarks" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 新增
      formLabelWidth: "100px",
      dialogFormVisible: false,
      registerForm: {
        serialNew: "",
        nameNew: "",
        forShort: "",
        briefIntroduction: ""
      },
      registerRules: {
        serialNew: [{ required: true, trigger: "change" }],
        nameNew: [{ required: true, trigger: "change" }],
        forShort: [{ trigger: "change" }],
        briefIntroduction: [{ trigger: "change" }],
        remarks: [{ trigger: "change" }]
      }
    };
  }
};
</script>

<style>
</style>
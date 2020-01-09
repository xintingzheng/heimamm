<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="新增企业" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
      <!-- 学科编号 -->
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="registerForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="registerForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
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
// 

export default {
  data() {
    return {
      // 新增
      formLabelWidth: "88px",
      //   是否显示
      dialogFormVisible: false,
      // 表单的数据
      registerForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: ""
      },
      //   验证规则
      registerRules: {
        eid: [{ required: true, trigger: "change" }],
        name: [{ required: true, trigger: "change" }],
        short_name: [{ required: true, trigger: "change" }],
        intro: [{ required: true, trigger: "change" }]
      }
    };
  },
  methods: {
    //   点击确定验证表单
    submitAdd(item) {

    }
  }
};
</script>

<style>
</style>
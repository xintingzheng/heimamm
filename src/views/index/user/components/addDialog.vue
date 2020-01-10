<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="新增用户" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="registerForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
        <el-select v-model="registerForm.role_id" placeholder="请选择角色" >
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
        <el-select v-model="registerForm.status" placeholder="请选择状态" >
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="registerForm.remark" autocomplete="off"></el-input>
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
      formLabelWidth: "88px",
      dialogFormVisible: false,
      registerForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      registerRules: {
        username: [{ required: true, trigger: "change" }],
        email: [{ required: true, trigger: "change" }],
        phone: [{ required: true, trigger: "change" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }],
        status: [{ message: "请选择状态", trigger: "change" }]
      }
    };
  }
};
</script>

<style>
</style>
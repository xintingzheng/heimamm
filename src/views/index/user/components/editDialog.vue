<template>
  <!-- 新增模块 -->
  <el-dialog center width="600px" title="编辑用户" :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="editForm" class="register" :model="editForm" :rules="editRules">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="editForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
        <el-select v-model="editForm.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
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
import { userEdit } from "@/api/user.js";

// 手机号验证方法
const validatePhone = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("手机号不能为空"));
  } else {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    // 验证
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("手机号格式不对哦~"));
    }
  }
};

// 邮箱验证方法
const validateEmail = (rule, value, callback) => {
  // 如果为空则提示用户
  if (value === "") {
    callback(new Error("邮箱不能为空哦~"));
  } else {
    //如果不为空则判断邮箱是否正确
    // 正则对象
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 判断
    if (reg.test(value) == true) {
      // 正确
      callback();
    } else {
      // 不正确
      callback(new Error("邮箱格式不对哦~"));
    }
  }
};

export default {
  data() {
    return {
      // 新增
      formLabelWidth: "88px",
      dialogFormVisible: false,
      // 表格数据
      editForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      // 校验规则
      editRules: {
        username: [
          { required: true, message: "用户名不能为空哦~", trigger: "change" }
        ],
        email: [
          {
            validator: validateEmail,
            required: true,
            message: "邮箱不能为空哦~",
            trigger: "change"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            required: true,
            message: "电话不能为空哦~",
            trigger: "change"
          }
        ],
        role_id: [
          {
            required: true,
            message: "角色不能为空哦~",
            trigger: "change"
          }
        ],
      }
    };
  },
  methods: {
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          userEdit(this.editForm).then(res => {
            if (res.code === 200) {
              this.$message.success("编辑成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 获取获取数据
              this.$parent.getList();
            } else if (res.code === 201) {
              this.$message.warning(res.message);
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
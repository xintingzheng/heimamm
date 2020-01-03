<template>
  <div class="login-con">
    <!-- 左侧盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单 -->
      <div class="nr-container">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="43px"
          class="demo-ruleForm login-form"
        >
          <!-- 手机号 -->
          <el-form-item label prop="phone">
            <el-input
              class="high-input"
              prefix-icon="el-icon-user"
              v-model="ruleForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label prop="password">
            <el-input
            show-password
              class="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-row>
              <!-- 验证码 -->
              <el-col :span="18">
                <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col class="code-col" :span="6">
                <!-- 验证码 -->
                <img @click="changeCode" :src="codeUrl" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="ruleForm.checked">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <!-- 登录与注册按钮 -->
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="primary" class="login-btn reset-btn" @click="resetForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import axios from "axios";
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

export default {
  name: "login",
  data() {
    return {
      // 验证码图片
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        // 是否勾选
        checked: false
      },
      rules: {
        phone: [{ validator: validatePhone, required: true, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空!", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度必须为4位",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 登录的点击事件
    submitForm(formName) {
      // 判断是否勾选
      if (this.ruleForm.checked == false) {
        this.$message.warning("请先勾选条款哦~");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: process.env.VUE_APP_BASEURL + "/login",
            method: "post",
            //跨域 是否携带 cookie
            withCredentials: true,
            data: {
              phone: this.ruleForm.phone,
              password: this.ruleForm.password,
              code: this.ruleForm.code,
            }
          }).then(res => {
            //成功回调
            if (res.data.code === 202) {
              // 错误
              this.$message.error(res.data.message)
            } else if (res.data.code === 200) {
              // 正确
              this.$message.success('欢迎回来~')
            }
          });
        } else {
              this.$message.error('格式不对哦, 请重新登录');
              return false;
            }
      });
    },
    // 注册事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换验证码
    changeCode() {
      // 必须要有分隔符
      // /captcha?type=login 后面加一个随机事件解决跨域问题
      this.codeUrl = process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login-con {
  display: flex;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  justify-content: space-around;
  align-items: center;

  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        font-weight: 400px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400px;
      }
    }
    .login-form {
      padding-right: 41px;
      margin-top: 27px;
      .code-col {
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          // 移入小手
          cursor: pointer;
        }
      }
      // 更高的文本框
      .high-input > input {
        height: 45px;
        line-height: 45px;
      }
    }
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn {
      margin-top: 28px;
    }
  }
}
</style>
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
            <el-button
              type="primary"
              class="login-btn reset-btn"
              @click="dialogFormVisible = true"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img class="bg" src="../../assets/login_banner_ele.png" alt />

    <!-- 注册模块 -->
    <el-dialog center width="603px" title="用户注册" :visible.sync="dialogFormVisible">
      <!-- 注册表单 -->
      <el-form ref="registerForm" class="register" :model="registerForm" :rules="registerRules">
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input show-password v-model="registerForm.password"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="7" :offset="1">
              <img @click="changeRegCode" :src="regCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <!-- 如果 delayTime不等于0 返回的是 false -->
              <el-button :disabled="delayTime != 0" @click="getMessage">{{ btnMessage }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, sendsms, register } from "../../api/login.js";
// 导入token
import {saveToken} from '../../utils/token.js'

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
  name: "login",
  data() {
    return {
      // formLabelWidth: "120px",
      // 登录验证码图片
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        // 是否勾选
        checked: false
      },
      // 登录表单验证
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
      },
      //注册模块
      dialogFormVisible: false,
      registerForm: {
        avatar: "",
        username: "",
        phone: "",
        code: "",
        email: "",
        password: "",
        rcode: ""
      },
      // 注册表单验证
      registerRules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        username: [
          { required: true, message: "昵称不能为空", trigger: "change" }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: "change" }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 6, max: 12, message: "密码的长度是6~12位", trigger: "change" }
        ]
      },
      // 头像上传地址
      uploadURL: process.env.VUE_APP_BASEURL + "/uploads",
      // 获取验证码按钮文本
      btnMessage: "获取用户验证码",
      // 定义倒计时的时间
      delayTime: 0,
      // 头像上传
      imageUrl: "",
      // 左侧间隙
      formLabelWidth: "56px",
      // 注册验证码图片
      regCodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms"
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
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            //成功回调
            if (res.data.code === 202) {
              // 错误
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              // 正确
              this.$message.success("欢迎回来~");
              // 存token
              // window.localStorage.setItem("heimammtoken", res.data.data.token);
              saveToken(res.data.data.token)
              // 登录成功  跳转首页
              this.$router.push("/index");
            }
          });
        } else {
          this.$message.error("格式不对哦, 请重新登录");
          return false;
        }
      });
    },
    // 注册事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换登录验证码
    changeCode() {
      // 必须要有分隔符
      // /captcha?type=login 后面加一个随机事件解决跨域问题
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    // 切换注册验证码
    changeRegCode() {
      this.regCodeUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&t=${Date.now()}`;
    },
    // 获取短信
    getMessage() {
      // 验证手机号
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      // 判断手机号是否正确
      if (reg.test(this.registerForm.phone) == false) {
        return this.$message.error("嘿! 兄die,手机号不正确哦~");
      }
      // 判断图片验证码是否正确
      if (this.registerForm.code.length != 4) {
        return this.$message.error("输入的与图形码不一致哦~");
      }

      // 如果手机号正确开启倒计时
      if (this.delayTime === 0) {
        // 改为60
        this.delayTime = 60;
        // 判断
        const interId = setInterval(() => {
          // 递减
          this.delayTime--;
          // 修改显示文本
          this.btnMessage = `还剩下${this.delayTime}秒哇~`;
          if (this.delayTime === 0) {
            // 倒计时结束,清除定时器
            clearInterval(interId);
            // 清除定时器后,还原文本
            this.btnMessage = "获取用户验证码";
          }
        }, 100);
      } else {
        return;
      }

      // 调用短信验证码
      sendsms({
        code: this.registerForm.code,
        phone: this.registerForm.phone
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("短信验证码是:" + res.data.data.captcha);
        }
      });
    },

    //头像
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 保存到注册表单的头像中
      this.registerForm.avatar = res.data.file_path;
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //提交注册
    submitRegister() {
      // 验证表单
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          register({
            username: this.registerForm.username,
            phone: this.registerForm.phone,
            email: this.registerForm.email,
            avatar: this.registerForm.avatar,
            password: this.registerForm.password,
            rcode: this.registerForm.rcode
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success("注册成功,请登录");
              // 关闭注册对话框
              this.dialogFormVisible = false;
            } else if (res.data.code === 201) {
              this.$message.warning(res.data.message);
            }
          });
        } else {
          this.$message.error("格式不对哦,检查一下呗~");
          return false;
        }
      });
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
  //主轴方向 平均分布
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
    .imgUrl {
      width: 143px;
      height: 41px;
    }
  }

  .el-dialog__header {
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
  }

  .el-dialog__title {
    color: rgba(254, 254, 254, 1);
  }
  // 栅格验证码 通用
  .code-col {
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      // 移入小手
      cursor: pointer;
    }
  }
  // 上传组件的样式
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
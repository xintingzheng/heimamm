<template>
  <el-container class="index-container">
      <el-header class="my-header">
        <!-- 头部左侧标签 -->
        <div class="left">
          <i class="icon el-icon-s-fold"></i>
          <img class="logo" src="../../assets/index-logo.png" alt="">
          <span class="title">黑马面面</span>
        </div>
        <!-- 头部右侧标签 -->
        <div class="right">
          <img class="avatar" :src="userInfo.avatar" alt="">
          <span class="userName">{{ userInfo.userName }},您好</span>
          <el-button @click="logout" size="small" type="primary">退出</el-button>
        </div>
      </el-header>
    <el-container>
    <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from '../../api/login.js';
import { removeToken } from '../../utils/token.js';

export default {
  name: "index",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    info().then(res => {
      // 保存数据
      this.userInfo = res.data.data;
      // 头像没有基地址 自己拼接
      this.userInfo.avatar = process.env.VUE_APP_BASEURL + '/' + this.userInfo.avatar;
    })
  },
  methods: {
    logout() {
      this.$confirm('您确认要退出吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定按钮
          logout().then(res => {
            if (res.data.code === 200) {
              // 退出成功
              removeToken();
              // 跳转登录页
              this.$router.push('/login');
            }
          })
        }).catch(() => {

        });
    }
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
      font-size: 24px;
      margin-right: 22px;
      }
      .logo {
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49A1FF;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .userName {
        font-size: 14px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }
}
</style>
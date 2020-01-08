<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 头部左侧标签 -->
      <div class="left">
        <i @click="collapse =! collapse" class="icon el-icon-s-fold"></i>
        <img class="logo" src="../../assets/index-logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <!-- 头部右侧标签 -->
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="userName">{{ userInfo.userName }},您好</span>
        <el-button @click="logout" size="small" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width="auto">
        <el-menu router :collapse="collapse" :default-active="$route.path" class="el-menu-vertical-demo">
          <!-- @open="handleOpen"
          @close="handleClose"-->
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "../../api/login.js";
import { removeToken } from "../../utils/token.js";

export default {
  name: "index",
  data() {
    return {
      userInfo: {},
      collapse: false
    };
  },
  created() {
    info().then(res => {
      // 保存数据
      this.userInfo = res.data.data;
      // 头像没有基地址 自己拼接
      this.userInfo.avatar =
        process.env.VUE_APP_BASEURL + "/" + this.userInfo.avatar;
    });
  },
  methods: {
    logout() {
      this.$confirm("您确认要退出吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定按钮
          logout().then(res => {
            if (res.data.code === 200) {
              // 退出成功
              removeToken();
              // 跳转登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {});
    }
  }
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
        color: #49a1ff;
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
  .my-main {
    background-color: rgba(232, 233, 236);
  }
  // 点击展开或收起
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
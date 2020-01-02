<template>
  <div class="login-con">
      <div class="left"></div>
      <img class="bg" src="../../assets/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {
    name: 'login',
}
</script>

<style lang: lang="less">
    .login-con {
        display: flex;
        background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
        height: 100%;
        /*  */
        justify-content: space-around;
        align-items: center;
    }
    .left {
        width: 478px;
        height: 550px;
        background-color: #f5f5f5;
    }
</style>
<template>
  <div class="not-found">
    <img src="@/assets/img/404.png" />
    <div class="txt">404! 抱歉，您查看的页面不存在！</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
  }
  .txt {
    margin-top: 30px;
    color: #909090;
  }
}
</style>

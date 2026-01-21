<template>
  <div >
    <el-container>
      <el-header class="el-head"> Header </el-header>
      <el-container>
        <el-aside class="el-aside" width="20vw">
          <el-menu router="true" class="el-menu">
            <el-menu-item route="/clipboard" index="1"> clipboard </el-menu-item>
<!--             <el-menu-item route="/test" index="4"> test </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script setup lang="ts">


</script>

<style scoped>
.el-menu {
  width: 100%;
  background-color: rgb(199.5, 201, 204);
}

.el-aside {
  background-color: rgb(232.8, 233.4, 234.6);
  height: 90vh;
}

.el-main {
  background-color: rgb(216.8, 235.6, 255);
  height: 90vh;
}

.el-head {
  background-color: rgb(179, 224.5, 156.5);
  height: 10vh;
}
</style>

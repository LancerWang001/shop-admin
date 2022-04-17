<template>
  <el-menu
    active-text-color="#3b89da"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="silver"
    :collapse="$store.state.isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><location /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><IconMenu /></el-icon>
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <el-icon><IconMenu /></el-icon>
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><IconMenu /></el-icon>
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <el-icon><IconMenu /></el-icon>
        商品评论
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><location /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <el-icon><IconMenu /></el-icon>
        订单列表
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <el-icon><IconMenu /></el-icon>
        线下订单
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><setting /></el-icon>
      <span>媒体</span>
    </el-menu-item>
    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        <el-icon><IconMenu /></el-icon>
        角色权限
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <el-icon><IconMenu /></el-icon>
        用户权限
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon><IconMenu /></el-icon>
        权限规则
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>

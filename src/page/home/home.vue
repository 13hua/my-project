<template>
  <div class="home-container">
    <el-row class="container">
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
        <el-col :span="10"></el-col>
        <div class="tools" @click.prevent="collapseFun">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
          <!-- 导航菜单 -->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
              <!-- <el-submenu :index="index+''" v-if="!item.leaf"> -->

                <template slot="title">
                  <i :class="item.iconCls"></i>
                  {{item.name}}
                </template>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
          <!-- 导航菜单-折叠后 -->
          <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapse" ref="menuCollapsed">
            <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
              
              <template v-if="!item.leaf">
                <div class="el-submenu__title" style="padding-left:20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                  <i :class="item.iconCls"></i>
                </div>
                <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                  <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left:40px; height:56px;line-height:56px;" :class="$route.path===child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                </ul>
              </template>
              <template v-else>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" style="padding-left:20px;height:56px;line-height:56px;padding:0 20px;" :class="$route.path===item.children[0].path?'is-active':''" @click="$router.push(ite,.children[0].path)">
                    <i :class="item.iconCls"></i>
                  </div>
                </li>
              </template>
            </li>
          </ul>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col></el-col>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>

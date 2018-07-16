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
            <div v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  {{item.name}}
                </template>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
          <!-- 导航菜单-折叠后 -->
          <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapse" ref="menuCollapsed">
            <li v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden" class="el-submenu item">
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
                  <div class="el-submenu__title el-menu-item" style="padding-left:20px;height:56px;line-height:56px;padding:0 20px;" :class="$route.path===item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
                    <i :class="item.iconCls"></i>
                  </div>
                </li>
              </template>
            </li>
          </ul>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
              <el-breadcrumb separator="/" class="breadcrumn-inner">
              <el-breadcrumb-item v-for="item in $route.matched"  :key="item.path">{{item.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <route-view></route-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sysName: 'VueDemo',
      sysUseName: '',
      collapsed: false
    };
  },

  components: {},

  computed: {},

  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysUseName = user.username || '';
    }
  },

  methods: {
    // 折叠导航栏
    collapseFun: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    // 退出登录
    logoutFun: function () {
      let _this = this;
      this.$confirm('确认退出吗？', '提示', {
        // type:'warning'
      })
        .then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #bbdbfb;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>

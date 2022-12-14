import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Main from "../pages/Main.vue";
import MasterUser from "../pages/MasterUser.vue";
import MasterProduct from "../pages/MasterProduct.vue";
import MasterClient from "../pages/MasterClient.vue";
import MasterBad from "../pages/MasterBad.vue";
import MasterProcess from "../pages/MasterProcess.vue";
import MasterLocation from "../pages/MasterLocation.vue";
import StockReceive from "../pages/StockReceive.vue";
import StockUse from "../pages/StockUse.vue";
import StockBad from "../pages/StockBad.vue";
import MonitorStock from "../pages/MonitorStock.vue";
import MonitorBad from "../pages/MonitorBad.vue";
import MonitorSafe from "../pages/MonitorSafe.vue";

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "side-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "side-menu-master-user",
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "side-menu-master-product",
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "side-menu-master-client",
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "side-menu-master-bad",
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "side-menu-master-process",
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "side-menu-master-location",
        component: MasterLocation,
      },
      {
        path: "stock/receive",
        name: "side-menu-stock-receive",
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "side-menu-stock-use",
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "side-menu-stock-bad",
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "side-menu-monitor-stock",
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "side-menu-monitor-bad",
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "side-menu-monitor-safe",
        component: MonitorSafe,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "/",
        name: "simple-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "simple-menu-master-user",
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "simple-menu-master-product",
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "simple-menu-master-client",
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "simple-menu-master-bad",
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "simple-menu-master-process",
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "simple-menu-master-location",
        component: MasterLocation,
      },
      {
        path: "stock/receive",
        name: "simple-menu-stock-receive",
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "simple-menu-stock-use",
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "simple-menu-stock-bad",
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "simple-menu-monitor-stock",
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "simple-menu-monitor-bad",
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "simple-menu-monitor-safe",
        component: MonitorSafe,
      },
    ],
  },
  {
    path: "/top-menu",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "top-menu-master-user",
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "top-menu-master-product",
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "top-menu-master-client",
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "top-menu-master-bad",
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "top-menu-master-process",
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "top-menu-master-location",
        component: MasterLocation,
      },
      {
        path: "stock/receive",
        name: "top-menu-stock-receive",
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "top-menu-stock-use",
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "top-menu-stock-bad",
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "top-menu-monitor-stock",
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "top-menu-monitor-bad",
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "top-menu-monitor-safe",
        component: MonitorSafe,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;

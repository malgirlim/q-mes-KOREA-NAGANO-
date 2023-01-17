import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Main from "../pages/Main.vue";

import MasterUser from "../pages/MasterUser.vue";
import MasterProduct from "../pages/MasterProduct.vue";
import MasterClient from "../pages/MasterClient.vue";
import MasterBad from "../pages/MasterBad.vue";
import StockReceive from "../pages/StockReceive.vue";
import StockUse from "../pages/StockUse.vue";
import StockBad from "../pages/StockBad.vue";
import MonitorStock from "../pages/MonitorStock.vue";
import MonitorBad from "../pages/MonitorBad.vue";
import MonitorSafe from "../pages/MonitorSafe.vue";


const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
         {
        path: "master/user",
        name: "side-menu-master-user",
	meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "side-menu-master-product",
	meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "side-menu-master-client",
	meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "side-menu-master-bad",
	meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "stock/receive",
        name: "side-menu-stock-receive",
	meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "side-menu-stock-use",
	meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "side-menu-stock-bad",
	meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "side-menu-monitor-stock",
	meta: {
          pagename: "원자재 재고 조회",
          category: "재고 조회",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "side-menu-monitor-bad",
	meta: {
          pagename: "원자재 불량 조회",
          category: "재고 조회",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "side-menu-monitor-safe",
	meta: {
          pagename: "안전재고 미달 조회",
          category: "재고 조회",
        },
        component: MonitorSafe,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "/main",
        name: "simple-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "simple-menu-master-user",
	meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "simple-menu-master-product",
	meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "simple-menu-master-client",
	meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "simple-menu-master-bad",
	meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "stock/receive",
        name: "simple-menu-stock-receive",
	meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "simple-menu-stock-use",
	meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "simple-menu-stock-bad",
	meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "simple-menu-monitor-stock",
	meta: {
          pagename: "원자재 재고 조회",
          category: "재고 조회",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "simple-menu-monitor-bad",
	meta: {
          pagename: "원자재 불량 조회",
          category: "재고 조회",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "simple-menu-monitor-safe",
	meta: {
          pagename: "안전재고 미달 조회",
          category: "재고 조회",
        },
        component: MonitorSafe,
      },
    ],
  },
  {
    path: "/",
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
	meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "top-menu-master-product",
	meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "top-menu-master-client",
	meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "top-menu-master-bad",
	meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "stock/receive",
        name: "top-menu-stock-receive",
	meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "top-menu-stock-use",
	meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "top-menu-stock-bad",
	meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "top-menu-monitor-stock",
	meta: {
          pagename: "원자재 재고 조회",
          category: "재고 조회",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "top-menu-monitor-bad",
	meta: {
          pagename: "원자재 불량 조회",
          category: "재고 조회",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "top-menu-monitor-safe",
	meta: {
          pagename: "안전재고 미달 조회",
          category: "재고 조회",
        },
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
import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Main from "../pages/Main.vue";
import SalesAccept from "../pages/SalesAccept.vue";
import ClientShipment from "../pages/ClientShipment.vue";
import RawOrder from "../pages/RawOrder.vue";
import RawReceive from "../pages/RawReceive.vue";
import RawIssue from "../pages/RawIssue.vue";
import RawTake from "../pages/RawTake.vue";
import WorkOrder from "../pages/WorkOrder.vue";
import WarehouseRelease from "../pages/WarehouseRelease.vue";

const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
      {
        path: "/main",
        name: "side-menu-main",
        component: Main,
      },
      {
        path: "sales/accept",
        name: "side-menu-sales-accept",
        component: SalesAccept,
      },
      {
        path: "sales/shipment",
        name: "side-menu-client-shipment",
        component: ClientShipment,
      },
      {
        path: "purchase/order",
        name: "side-menu-raw-order",
        component: RawOrder,
      },
      {
        path: "purchase/receive",
        name: "side-menu-raw-receive",
        component: RawReceive,
      },
      {
        path: "purchase/issue",
        name: "side-menu-raw-issue",
        component: RawIssue,
      },
      {
        path: "product/take",
        name: "side-menu-raw-take",
        component: RawTake,
      },
      {
        path: "product/work",
        name: "side-menu-work-order",
        component: WorkOrder,
      },
      {
        path: "product/warehouse",
        name: "side-menu-warehouse-release",
        component: WarehouseRelease,
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
        path: "sales/accept",
        name: "simple-menu-sales-accept",
        component: SalesAccept,
      },
      {
        path: "sales/shipment",
        name: "simple-menu-client-shipment",
        component: ClientShipment,
      },
      {
        path: "purchase/order",
        name: "simple-menu-raw-order",
        component: RawOrder,
      },
      {
        path: "purchase/receive",
        name: "simple-menu-raw-receive",
        component: RawReceive,
      },
      {
        path: "purchase/issue",
        name: "simple-menu-raw-issue",
        component: RawIssue,
      },
      {
        path: "product/take",
        name: "simple-menu-raw-take",
        component: RawTake,
      },
      {
        path: "product/work",
        name: "simple-menu-work-order",
        component: WorkOrder,
      },
      {
        path: "product/warehouse",
        name: "simple-menu-warehouse-release",
        component: WarehouseRelease,
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
        path: "sales/accept",
        name: "top-menu-sales-accept",
        component: SalesAccept,
      },
      {
        path: "sales/shipment",
        name: "top-menu-client-shipment",
        component: ClientShipment,
      },
      {
        path: "purchase/order",
        name: "top-menu-raw-order",
        component: RawOrder,
      },
      {
        path: "purchase/receive",
        name: "top-menu-raw-receive",
        component: RawReceive,
      },
      {
        path: "purchase/issue",
        name: "top-menu-raw-issue",
        component: RawIssue,
      },
      {
        path: "product/take",
        name: "top-menu-raw-take",
        component: RawTake,
      },
      {
        path: "product/work",
        name: "top-menu-work-order",
        component: WorkOrder,
      },
      {
        path: "product/warehouse",
        name: "top-menu-warehouse-release",
        component: WarehouseRelease,
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

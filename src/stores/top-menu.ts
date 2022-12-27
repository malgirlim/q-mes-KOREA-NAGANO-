import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface TopMenuState {
  menu: Array<Menu>;
}

export const useTopMenuStore = defineStore("topMenu", {
  state: (): TopMenuState => ({
    menu: [
      {
        icon: "LayoutDashboard",
        pageName: "top-menu-main",
        title: "메인",
      },
      {
        icon: "Sheet",
        pageName: "",
        title: "영업 관리",
        subMenu: [
          {
            icon: "FileText",
            pageName: "top-menu-sales-accept",
            title: "수주 접수",
          },
          {
            icon: "Truck",
            pageName: "top-menu-client-shipment",
            title: "고객사 출하",
          },
        ],
      },
      {
        icon: "DollarSign",
        pageName: "",
        title: "구매 관리",
        subMenu: [
          {
            icon: "PackageSearch",
            pageName: "top-menu-raw-order",
            title: "원자재 발주",
          },
          {
            icon: "PackagePlus",
            pageName: "top-menu-raw-receive",
            title: "원자재 입고",
          },
          {
            icon: "PackageMinus",
            pageName: "top-menu-raw-issue",
            title: "원자재 불출",
          },
        ],
      },
      {
        icon: "Factory",
        pageName: "",
        title: "생산 관리",
        subMenu: [
          {
            icon: "PackagePlus",
            pageName: "top-menu-raw-take",
            title: "자재 인수",
          },
          {
            icon: "FileText",
            pageName: "top-menu-work-order",
            title: "작업 지시",
          },
          {
            icon: "ShoppingCart",
            pageName: "top-menu-warehouse-release",
            title: "완제품 창고 출고",
          },
        ],
      },
    ],
  }),
});

import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SimpleMenuState {
  menu: Array<Menu | "devider">;
}

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: (): SimpleMenuState => ({
    menu: [
      {
        icon: "LayoutDashboard",
        pageName: "simple-menu-main",
        title: "메인",
      },
      {
        icon: "Info",
        pageName: "",
        title: "기준 정보",
        subMenu: [
          {
            icon: "Users",
            pageName: "simple-menu-master-user",
            title: "사용자 등록",
          },
          {
            icon: "PackagePlus",
            pageName: "simple-menu-master-product",
            title: "품목 등록",
          },
          {
            icon: "CreditCard",
            pageName: "simple-menu-master-client",
            title: "거래처 등록",
          },
          {
            icon: "PackageX",
            pageName: "simple-menu-master-bad",
            title: "불량 내용 등록",
          },
          {
            icon: "Cpu",
            pageName: "simple-menu-master-process",
            title: "공정 등록",
          },
        ],
      },
      {
        icon: "Package",
        pageName: "",
        title: "재고 관리",
        subMenu: [
          {
            icon: "PackagePlus",
            pageName: "simple-menu-stock-receive",
            title: "원자재 입고 등록",
          },
          {
            icon: "PackageMinus",
            pageName: "simple-menu-stock-use",
            title: "원자재 사용 등록",
          },
          {
            icon: "PackageX",
            pageName: "simple-menu-stock-bad",
            title: "원자재 불량 등록",
          },
        ],
      },
      {
        icon: "Monitor",
        pageName: "",
        title: "재고 조회",
        subMenu: [
          {
            icon: "PackageSearch",
            pageName: "simple-menu-monitor-stock",
            title: "원자재 재고 조회",
          },
          {
            icon: "PackageX",
            pageName: "simple-menu-monitor-bad",
            title: "원자재 불량 조회",
          },
          {
            icon: "Siren",
            pageName: "simple-menu-monitor-safe",
            title: "안전재고 미달 조회",
          },
        ],
      },
    ],
  }),
});

import { DateTime } from "litepicker/dist/types/datetime";

// 재고 관리 - 원자재 입고 등록
export interface StockReceive {
  NO?: Number;
  입고일시?: String;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  입고수?: Number;
  비고?: String;
}

// 재고 관리 - 원자재 사용 등록
export interface StockUse {
  NO?: Number;
  출고일시?: String;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  출고수?: Number;
  비고?: String;
}

// 재고 관리 - 원자재 불량 등록
export interface StockBad {
  NO?: Number;
  불량일시?: String;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  불량수?: Number;
  불량명?: String;
  불량내용?: String;
  비고?: String;
}

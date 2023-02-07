// 재고 조회 - 원자재 재고 조회
export interface MonitorStock {
  NO?: Number;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  재고수?: Number;
  안전재고수?: Number;
  부족재고수?: Number;
  입고수?: Number;
  출고수?: Number;
  불량수?: Number;
  원가?: Number;
  재고금액?: Number;
}

// 재고 조회 - 원자재 불량 조회
export interface MonitorBad {
  NO?: Number;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  불량수?: Number;
  불량명?: String;
  불량내용?: String;
  원가?: Number;
  불량금액?: Number;
}

// 재고 조회 - 안전재고 미달 조회
export interface MonitorSafe {
  NO?: Number;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  재고수?: Number;
  안전재고수?: Number;
  부족재고수?: Number;
  입고수?: Number;
  출고수?: Number;
  불량수?: Number;
  원가?: Number;
  재고금액?: Number;
}

// 재고 조회 - KPI 시간당 생산량
export interface MonitorKpiProd {
  NO?: Number;
  연월?: String;
  목표치?: String;
  측정치?: String;
}

// 재고 조회 - KPI 재고 비용 절감
export interface MonitorKpiStock {
  NO?: Number;
  연월?: String;
  목표치?: String;
  측정치?: String;
}

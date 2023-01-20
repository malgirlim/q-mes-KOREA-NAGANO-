// 재고 조회 - 원자재 재고 조회
export interface MonitorStock {
  NO?: Number;
  품목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  재고수?: Number;
  비고?: String;
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
  비고?: String;
}

// 재고 조회 - 안전재고 미달 조회
export interface MonitorSafe {
  NO?: Number;
  폼목코드?: String;
  거래처명?: String;
  품명?: String;
  규격?: String;
  단위?: String;
  안전재고?: Number;
  재고수?: Number;
  안전재고보유?: String;
  비고?: String;
}

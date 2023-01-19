// 기준정보 - 사용자 등록
export interface MasterUser {
  NO?: Number;
}

// 기준정보 - 품목 등록
export interface MasterProduct {
  NO?: Number;
  품목코드?: String;
  품명?: String;
  거래처명?: String;
  규격?: String;
  단위?: String;
  안전재고?: Number;
  원가?: Number;
  비고?: String;
  등록자?: String;
  등록일시?: String;
}

// 기준정보 - 거래처 등록
export interface MasterClient {
  NO?: Number;
  거래처명?: String;
  대표자?: String;
  사업자번호?: String;
  연락처?: String;
  이메일?: String;
  주소?: String;
  비고?: String;
 }

// 기준정보 - 불량 내용 등록
export interface MasterBad {
  NO?: Number;
  불량명?: String;
  불량내용?: String;
  비고?: String;
}
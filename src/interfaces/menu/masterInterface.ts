// 기준정보 - 사용자 등록
export interface MasterUser {
  NO?: Number;
  이름?: String;
  아이디?: String;
  부서?: String;
  연락처?: String;
  이메일?: String;
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

// 기준정보 - 공정 등록
export interface MasterProcess {
  NO?: Number;
  공정명?: String;
  공정내용?: String;
  비고?: String;
}

// 기준정보 - 원자재 위치 등록
export interface MasterLocation {
  NO?: Number;
  품목코드?: String;
  위치?: String;
  비고?: String;
}

// 기준정보 - BOM 구성 화면 (우측화면)
export interface MasterBom {
  NO?: Number;
  품목NO?: Number; // MasterProduct 기본키
  품목코드?: String;
  원자재코드?: String;
  수량?: Number;
  비고?: String;
}

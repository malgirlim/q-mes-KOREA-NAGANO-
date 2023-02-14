<script setup lang="ts">
import _, { isArguments } from "lodash";
import { ref, Ref } from "vue";
import Button from "../base-components/Button";
import { FormInput, FormSelect, FormCheck } from "../base-components/Form";
import Lucide from "../base-components/Lucide";
import { Dialog, Menu } from "../base-components/Headless";
import Table from "../base-components/Table";
import moment from "moment";
import Tippy from "../base-components/Tippy";
import Progress from "../base-components/Progress";
import * as XLSX from "xlsx";
import { read, utils, writeFileXLSX } from "xlsx";
import printJS from "print-js";
import { Tab } from "../base-components/Headless";

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import { MasterUser } from "../interfaces/menu/MasterInterface";

// 페이징기능
import { onMounted, watch } from "vue";
import PaginationComponent from "../components/Pagination/PaginationComponent.vue"; // 페이징설정
const currentPage = ref(1); // 현재페이지
const rowsPerPage = ref(10); // 한 페이지에 보여질 데이터 갯수

const pageChange = () => {
  // 한 페이지에 보여질 데이터 갯수 변경 시 1페이지로 이동
  currentPage.value = 1;
};

// api 보내기
const url = "/api/master/user";
const {
  datas,
  dataAll,
  dataCount,
  datasAreLoading,
  loadDatas,
  searchDatas,
  insertData,
  editData,
  deleteData,
  insertExcel,
  numberOfPages,
} = useSendApi<MasterUser>(url, currentPage, rowsPerPage);

const searchKey = ref("전체");
const searchInput = ref("");
onMounted(async () => loadDatas()); // 페이지 로딩 시 데이터 불러오기

// 조회
const search = () => {
  // console.log(searchKey.value, searchInput.value);
  searchDatas("", searchKey.value, searchInput.value);
};

//등록 Modal
const insertModal = ref(false);
const setInsertModal = (value: boolean) => {
  insertModal.value = value;
  insertModalData = {}; // 변수 초기화
};
let insertModalData: MasterUser; // 등록할 변수

//수정 Modal
const editModal = ref(false);
const setEditModal = (value: boolean) => {
  editModal.value = value;
  search();
};
let editModalData: MasterUser; // 수정할 변수

//삭제 Modal
const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
const deleteDataFunction = async () => {
  await deleteData(checkDebug.value); // await : 이 함수가 끝나야 다음으로 넘어간다
  resetCheckBox();
  search();
};

// print.js 프린트 기능

const printPage = (data: any) => {
  printJS({
    printable: data,
    properties: ["이름", "아이디", "부서", "연락처", "이메일"],
    type: "json",
    documentTitle: "기준 정보 > 사용자 등록",
    repeatTableHeader: true,
    style: "*{font-size:12px;}",
  });
};

// Print.js  Modal
const printModal = ref(false);
const setPrintModal = (value: boolean) => {
  printModal.value = value;
};

// ########################## 엑셀 다운로드 및 업로드 ##########################
// 엑셀 다운로드 Modal
const excelExportModal = ref(false);
const setExcelExportModal = (value: boolean) => {
  excelExportModal.value = value;
};
// SheetJS(엑셀출력) 용
function exportFile(data: any) {
  console.log(data);
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(
    wb,
    "기준정보_사용등록" + moment().format("YYMMDD_HHmmss") + "_export.xlsx"
  );
}

// 엑셀 업로드 Modal
const excelImportModal = ref(false);
const setExcelImportModal = (value: boolean) => {
  excelImportModal.value = value;
  onFileEvent.value = null;
};
// 엑셀 업로드 용 함수
const onFileImportForm =
  "../../src/assets/xlsx/업로드양식_기준정보_사용자등록.xlsx"; // 엑셀 양식주소
const onFileEvent = ref();
const onFileChangeEvent = (event: any) => {
  onFileEvent.value = event;
};
const onFileImport = (event: any) => {
  if (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const file_data = ref();
      const wb = XLSX.read(e.target?.result, { type: "array" });
      wb.SheetNames.forEach((sheetName) => {
        // wb.Sheets[sheetName].A1.w = "날짜"; // 들어온 데이터 key 값을 바꿀 수 있음
        // console.log(wb.Sheets[sheetName].A1);
        file_data.value = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]); // ,{header: 1} key 값까지 가져옴
      });
      await insertExcel(file_data.value);
      search();
      pageChange();
    };
    reader.readAsArrayBuffer(file);
  }
};
// ########################## 엑셀 다운로드 및 업로드 끝 ##########################

// 날짜 구하기
const now = moment().format("YYYY-MM-DD");
const nowPlus = moment().add(7, "days").format("YYYY-MM-DD");
const max_year = moment().format("YYYY");
const min_year = moment().add(-3, "years").format("YYYY");
const now2 = "전체기간";

// 체크박스 선택으로 데이터 가져오기
const checkDebug: any = ref([]); // 체크박스 선택 데이터 저장변수

const mainCheckBox = ref(true); // 메인 체크박스 상태
const checkAll = (value: boolean) => {
  // 메인 체크박스가 눌릴 때 모두 체크
  const checkboxes = document.querySelectorAll("input[id=checkbox]"); // input의 id가 checkbox인 요소를 가져오기
  // 만약 메인 체크박스가 눌렸다면
  if (value === true) {
    checkDebug.value = []; // 체크박스 선택 데이터 초기화
    checkboxes.forEach((cb: any) => {
      cb.checked = value; // 모든 체크박스를 메인체크박스에 맞춰서 바꿈
      checkDebug.value.push(cb.value); // 모든 체크박스의 value를 가져와 저장
    });
  } else {
    checkboxes.forEach((cb: any) => {
      cb.checked = value;
      checkDebug.value = [];
    });
  }
};

const resetCheckBox = () => {
  // 페이징 넘기면 체크박스 데이터 초기화\
  const mBox = document.querySelector<HTMLElement>(
    "input[id=checkbox_all]"
  ) as HTMLInputElement | null; // 오류 안뜨게 하려고 넣어둔것
  if (!mBox) return; // 오류 안뜨게 하려고 넣어둔것
  mBox.checked = false; // 메인체크박스 체크해제
  mainCheckBox.value = true; // 메인체크박스 데이터 초기화
  checkDebug.value = [];
};

const menu_list = [
  [
    "사용자 등록",
    "품목 등록",
    "거래처 등록",
    "불량 내용 등록",
    "공정 등록",
    "원자재 위치 등록",
    "BOM 등록",
  ],
  ["원자재 입고 등록", "원자재 사용 등록", "원자재 불량 등록"],
  [
    "원자재 재고조회",
    "원자재 불량조회",
    "안전재고 미달통보",
    "KPI 시간당 생산량",
    "KPI 재고비용 절감률",
  ],
];
</script>

<template>
  <!-- style="height: calc(100vh - 250px)" : 브라우저 화면 창크기에 맞게 변경됨 : 100vh - 브라우저 창 크기 -->
  <div class="grid grid-cols-12 gap-1 mt-1">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 mb-2 intro-y sm:flex-nowrap"
    >
      <Button
        class="mr-2 shadow-md"
        as="a"
        variant="primary"
        @click="
          (event) => {
            event.preventDefault();
            setInsertModal(true);
          }
        "
      >
        <Lucide icon="FilePlus" class="w-4 h-4 mr-2" />
        등록
      </Button>
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="mr-2">
        <a href="" class="flex items-center ml-auto text-primary">
          <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
        </a>
      </div>
      <div class="ml-2">
        <FormSelect v-model="searchKey" class="w-30 mt-3 !box sm:mt-0">
          <option>전체</option>
          <option>이름</option>
          <option>부서명</option>
          <option>연락처</option>
          <option>이메일</option>
        </FormSelect>
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-2">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            v-model="searchInput"
            @keyup.enter="
              () => {
                search();
                pageChange();
              }
            "
            placeholder="검색어를 입력해주세요"
          />
          <button
            @click="
              {
                search();
                pageChange();
              }
            "
          >
            <Lucide
              icon="Search"
              class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </button>
        </div>
      </div>
      <div class="ml-2">
        <!-- BEGIN: Pagination Pages-->
        <FormSelect
          class="w-20 mt-3 !box sm:mt-0"
          v-model="rowsPerPage"
          @change="pageChange"
        >
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </FormSelect>
        <!-- END: Pagination Pages-->
      </div>
      <div class="ml-2">
        <Menu>
          <Menu.Button :as="Button" class="px-2 !box">
            <span class="flex items-center justify-center w-5 h-5">
              <Lucide icon="MoreVertical" class="w-4 h-4" />
            </span>
          </Menu.Button>
          <Menu.Items style="width: 170px">
            <Menu.Item @click="setPrintModal(true)">
              <Lucide icon="Printer" class="w-4 h-4 mr-2" />
              Print (PDF출력)
            </Menu.Item>
            <Menu.Item @click="setExcelExportModal(true)">
              <Lucide icon="FileDown" class="w-4 h-4 mr-2" />
              Excel 다운로드
            </Menu.Item>
            <Menu.Item @click="setExcelImportModal(true)">
              <Lucide icon="FileUp" class="w-4 h-4 mr-2" />
              Excel 업로드
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
    <!-- BEGIN: Pagination-->
    <div
      class="flex flex-wrap items-center col-span-12 mt-0 intro-y sm:flex-nowrap"
    >
      <div>
        <PaginationComponent
          class="pagination-component"
          v-model="currentPage"
          :numberOfPages="numberOfPages"
          @click="resetCheckBox()"
        />
      </div>
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div>
        <span class="mr-3">[ {{ dataCount }}개 데이터 조회됨 ] </span>
        <span class="mr-5"
          >[ {{ currentPage }} / {{ numberOfPages }} 페이지 ]</span
        >
        <!-- END: Pagination-->
      </div>
    </div>
    <!-- BEGIN: Users Layout -->

    <div
      v-for="todo in datas"
      :key="todo.NO"
      class="col-span-12 intro-y md:col-span-3 m-1"
    >
      <div class="box">
        <div
          class="flex flex-col items-center p-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
            <span class="font-medium">
              {{ todo.이름 }} ({{ todo.아이디 }})</span
            >
            <div class="text-slate-500 text-xs mt-0.5">
              {{ todo.부서 }}
            </div>
            <div class="text-slate-500 text-xs mt-0.5">
              <span class="mr-3"><b>Mobile.</b> {{ todo.연락처 }}</span>
              <span><b>E-mail.</b> {{ todo.이메일 }}</span>
            </div>
          </div>
          <div
            class="flex mt-3 -ml-2 lg:ml-0 lg:justify-end lg:mt-0"
            style="text-align: right"
          >
            <div><!--네임카드 우측 공간 기입란--></div>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-center p-3 lg:flex-nowrap"
        >
          <div class="w-full mb-4 mr-auto lg:w-1/2 lg:mb-0">
            <div class="flex text-xs text-slate-500">
              <div class="mr-auto">시스템 사용률</div>
              <div>20%</div>
            </div>
            <Progress class="h-1 mt-2">
              <Progress.Bar
                class="w-1/4 bg-primary"
                role="progressbar"
                :aria-valuenow="0"
                :aria-valuemin="0"
                :aria-valuemax="100"
              ></Progress.Bar>
            </Progress>
          </div>
          <Button
            variant="outline-secondary"
            class="px-2 py-1 mr-2"
            @click="
              (event) => {
                event.preventDefault();
                setEditModal(true);
                editModalData = todo;
              }
            "
          >
            수정
          </Button>
          <Button
            variant="outline-danger"
            class="px-2 py-1 mr-2"
            @click="
              () => {
                checkDebug = [todo.NO];
                setDeleteConfirmationModal(true);
              }
            "
          >
            삭제
          </Button>
        </div>
      </div>
    </div>

    <!-- END: Users Layout -->
    <!-- END: Data List -->

    <!-- BEGIN: Insert Modal Content -->
    <Dialog size="md" :open="insertModal" @close="setInsertModal(false)">
      <Dialog.Panel class="p-10 text-center">
        <!--추가 Modal 내용 시작-->
        <div class="mb-5" style="font-weight: bold">사용자 등록</div>
        <div style="text-align: left">
          <div>
            <FormLabel htmlFor="vertical-form-1">이름</FormLabel>
            <FormInput
              id="vertical-form-1"
              type="text"
              v-model="insertModalData.이름"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-2">아이디</FormLabel>
            <FormInput
              id="vertical-form-2"
              type="text"
              v-model="insertModalData.아이디"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-2">비밀번호</FormLabel>
            <FormInput
              id="vertical-form-2"
              type="text"
              v-model="insertModalData.비밀번호"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-3">부서</FormLabel>
            <FormInput
              id="vertical-form-3"
              type="text"
              v-model="insertModalData.부서"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-4">연락처</FormLabel>
            <FormInput
              id="vertical-form-4"
              type="text"
              v-model="insertModalData.연락처"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-5">이메일</FormLabel>
            <FormInput
              id="vertical-form-5"
              type="text"
              v-model="insertModalData.이메일"
              placeholder=""
            />
          </div>
          <div class="mt-5 text-right">
            <Button
              class="mr-2 shadow-md"
              variant="primary"
              @click="
                () => {
                  insertData(insertModalData);
                  setInsertModal(false);
                  search();
                  pageChange();
                }
              "
              >확인</Button
            >
            <Button
              class="mr-2 shadow-md"
              variant="outline-primary"
              @click="
                () => {
                  setInsertModal(false);
                }
              "
              >취소</Button
            >
          </div>
        </div>
        <!--Modal 내용 끝--></Dialog.Panel
      >
    </Dialog>
    <!-- END: Insert Modal Content -->
    <!-- BEGIN: Edit Modal Content -->
    <Dialog
      size="md"
      :open="editModal"
      @close="
        () => {
          setEditModal(false);
        }
      "
    >
      <Dialog.Panel class="p-8 text-center">
        <div class="mb-5" style="font-weight: bold">수정</div>
        <Tab.Group>
          <Tab.List variant="boxed-tabs">
            <Tab>
              <Tab.Button class="w-full py-2" as="button">
                기본 정보
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button class="w-full py-2" as="button">
                메뉴 권한 설정
              </Tab.Button>
            </Tab>
          </Tab.List>
          <Tab.Panels class="mt-5">
            <Tab.Panel class="leading-relaxed">
              <div class="text-left">
                <div>
                  <FormLabel htmlFor="vertical-form-1">이름</FormLabel>
                  <FormInput
                    id="vertical-form-1"
                    type="text"
                    v-model="editModalData.이름"
                    placeholder=""
                  />
                </div>
                <div class="mt-3">
                  <FormLabel htmlFor="vertical-form-2">아이디</FormLabel>
                  <FormInput
                    id="vertical-form-2"
                    type="text"
                    v-model="editModalData.아이디"
                    placeholder=""
                  />
                </div>
                <div class="mt-3">
                  <FormLabel htmlFor="vertical-form-3">비밀번호</FormLabel>
                  <FormInput
                    id="vertical-form-3"
                    type="password"
                    v-model="editModalData.비밀번호"
                    placeholder=""
                  />
                </div>
                <div class="mt-3">
                  <FormLabel htmlFor="vertical-form-4">부서</FormLabel>
                  <FormInput
                    id="vertical-form-4"
                    type="text"
                    v-model="editModalData.부서"
                    placeholder=""
                  />
                </div>
                <div class="mt-3">
                  <FormLabel htmlFor="vertical-form-5">연락처</FormLabel>
                  <FormInput
                    id="vertical-form-5"
                    type="text"
                    v-model="editModalData.연락처"
                    placeholder=""
                  />
                </div>
                <div class="mt-3">
                  <FormLabel htmlFor="vertical-form-6">이메일</FormLabel>
                  <FormInput
                    id="vertical-form-6"
                    type="text"
                    v-model="editModalData.이메일"
                    placeholder=""
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel class="leading-relaxed">
              <div class="text-left mb-5 p-2 border-2">
                <div>Level 1 : 권한 없음 (기본)</div>
                <div>Level 2 : 조회 권한 부여</div>
                <div>Level 3 : 조회, 등록, 수정 권한 부여</div>
                <div>Level 4 : 조회, 등록, 수정, 삭제 권한 부여</div>
              </div>
              <Tab.Group>
                <Tab.List variant="tabs">
                  <Tab>
                    <Tab.Button class="w-full py-2" as="button">
                      기준 정보
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button class="w-full py-2" as="button">
                      재고 관리
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button class="w-full py-2" as="button">
                      모니터링
                    </Tab.Button>
                  </Tab>
                </Tab.List>
                <Tab.Panels class="border-b border-l border-r">
                  <Tab.Panel
                    class="p-5 leading-relaxed"
                    v-for="(menu, index) in menu_list"
                    :key="index"
                  >
                    <div class="text-right mr-3 mb-5 flex">
                      <div></div>
                      <div class="flex" style="margin-left: auto">
                        <div>Level 1</div>
                        <div class="ml-3">Level 2</div>
                        <div class="ml-3">Level 3</div>
                        <div class="ml-3">Level 4</div>
                      </div>
                    </div>
                    <div class="text-left" v-for="e in menu" :key="e">
                      <div class="flex mt-2 mb-2">
                        <div>{{ e }}</div>
                        <div
                          class="flex flex-col sm:flex-row"
                          style="margin-left: auto"
                        >
                          <FormCheck>
                            <FormCheck.Input
                              id="radio-switch-1"
                              type="radio"
                              :name="e"
                              value=""
                            />
                          </FormCheck>
                          <FormCheck class="ml-10 sm:mt-0">
                            <FormCheck.Input
                              id="radio-switch-2"
                              type="radio"
                              :name="e"
                              value=""
                            />
                          </FormCheck>
                          <FormCheck class="ml-10 sm:mt-0">
                            <FormCheck.Input
                              id="radio-switch-3"
                              type="radio"
                              :name="e"
                              value=""
                            />
                          </FormCheck>
                          <FormCheck class="ml-10 mr-6 sm:mt-0">
                            <FormCheck.Input
                              id="radio-switch-4"
                              type="radio"
                              :name="e"
                              value=""
                            />
                          </FormCheck>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div style="text-align: left">
          <div class="mt-5 text-right">
            <Button
              class="mr-2 shadow-md"
              variant="primary"
              @click="
                () => {
                  editData(editModalData);
                  setEditModal(false);
                }
              "
              >확인</Button
            >
            <Button
              class="mr-2 shadow-md"
              variant="outline-primary"
              @click="
                () => {
                  setEditModal(false);
                }
              "
              >취소</Button
            >
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
    <!-- END: Edit Modal Content -->
    <!-- BEGIN: Delete Confirmation Modal -->
    <Dialog
      :open="deleteConfirmationModal"
      @close="
        () => {
          setDeleteConfirmationModal(false);
        }
      "
      :initialFocus="deleteButtonRef"
    >
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
          <div class="mt-5 text-3xl">삭제</div>
          <div class="mt-2 text-slate-500">정말 삭제하시겠습니까?</div>
        </div>
        <div class="px-5 pb-8 text-center">
          <Button
            variant="outline-secondary"
            type="button"
            @click="
              () => {
                setDeleteConfirmationModal(false);
              }
            "
            class="w-24 mr-1"
          >
            취소
          </Button>
          <Button
            variant="danger"
            type="button"
            class="w-24"
            ref="deleteButtonRef"
            @click="
              () => {
                deleteDataFunction();
                setDeleteConfirmationModal(false);
              }
            "
          >
            삭제
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
    <!-- END: Delete Confirmation Modal -->
  </div>
  <div class="text-center mt-20 intro-y" v-if="dataCount == 0">
    저장된 데이터가 없습니다.
  </div>
  <!-- BEGIN: FOOTER(COPYRIGHT) -->
  <div class="intro-y mt-5 mr-5" style="text-align: right">
    <footer>&copy;2023 QInnotek. All rights reserved.</footer>
  </div>
  <!-- END: FOOTER(COPYRIGHT) -->
  <!-- BEGIN: 엑셀 다운로드 Modal -->
  <Dialog :open="excelExportModal" @close="setExcelExportModal(false)">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="FileDown" class="w-16 h-16 mx-auto mt-3 text-primary" />
        <div class="mt-5 text-3xl">Excel 다운로드</div>
      </div>

      <div class="px-5 pb-8 text-center">
        <Button
          variant="primary"
          type="button"
          class="w-38 mr-3"
          @click="
            () => {
              exportFile(datas);
              setExcelExportModal(false);
            }
          "
        >
          다운로드(현재 페이지)
        </Button>
        <Button
          variant="primary"
          type="button"
          class="w-38 mr-3"
          @click="
            () => {
              exportFile(dataAll);
              setExcelExportModal(false);
            }
          "
        >
          다운로드(전체)
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          @click="setExcelExportModal(false)"
          class="w-24 mr-1"
        >
          취소
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: 엑셀 다운로드 Modal -->
  <!-- BEGIN: 엑셀 업로드 Modal -->
  <Dialog :open="excelImportModal" @close="setExcelImportModal(false)">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="FileUp" class="w-16 h-16 mx-auto mt-3 text-primary" />
        <div class="mt-5 text-3xl">Excel 업로드</div>
      </div>
      <div class="text-center mb-5">
        <a :href="onFileImportForm" download>
          <Button variant="outline-primary" size="sm" type="button" as="a"
            >업로드 양식 다운로드</Button
          >
        </a>
      </div>
      <div class="text-center mb-5">
        <input
          class="form-control"
          id="formFile"
          type="file"
          accept="appliction/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="onFileChangeEvent($event)"
        />
      </div>
      <div class="px-5 pb-8 text-center">
        <Button
          variant="primary"
          type="button"
          class="w-24 mr-3"
          @click="
            () => {
              onFileImport(onFileEvent);
              setExcelImportModal(false);
            }
          "
        >
          업로드
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          @click="setExcelImportModal(false)"
          class="w-24 mr-1"
        >
          취소
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: 엑셀 업로드 Modal -->
  <!-- BEGIN: 프린트 출력 Modal -->
  <Dialog :open="printModal" @close="setPrintModal(false)">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="Printer" class="w-16 h-16 mx-auto mt-3 text-primary" />
        <div class="mt-5 text-3xl">Print (PDF출력)</div>
        <div class="mt-5">
          PDF출력은 인쇄 대상을 <strong>PDF 저장</strong>으로 지정하세요.
        </div>
      </div>

      <div class="px-5 pb-8 text-center">
        <Button
          variant="primary"
          type="button"
          class="w-38 mr-3"
          @click="
            () => {
              printPage(datas);
              setPrintModal(false);
            }
          "
        >
          출력(현재 페이지)
        </Button>
        <Button
          variant="primary"
          type="button"
          class="w-38 mr-3"
          @click="
            () => {
              printPage(dataAll);
              setPrintModal(false);
            }
          "
        >
          출력(전체)
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          @click="setPrintModal(false)"
          class="w-24 mr-1"
        >
          취소
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: 프린트 출력 Modal -->
</template>

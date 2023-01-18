<script setup lang="ts">
import _, { isArguments } from "lodash";
import { ref, Ref } from "vue";
import Button from "../base-components/Button";
import { FormInput, FormSelect, FormCheck } from "../base-components/Form";
import Lucide from "../base-components/Lucide";
import { Dialog, Menu } from "../base-components/Headless";
import Table from "../base-components/Table";
import moment from "moment";
import Print from "../components/HtmlToPaper/HtmlToPaper.vue";
import Excel from "../components/MakeExcelFile/MakeExcelFile.vue";

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import { MasterProduct } from "../interfaces/pageInterface";

// 페이징기능
import { onMounted, watch } from "vue";
import PaginationComponent from "../components/Pagination/PaginationComponent.vue"; // 페이징설정
import { NO } from "@vue/shared";
const currentPage = ref(1); // 현재페이지
const rowsPerPage = ref(10); // 한 페이지에 보여질 데이터 갯수

const pageChange = () => {
  // 한 페이지에 보여질 데이터 갯수 변경 시 1페이지로 이동
  currentPage.value = 1;
};

// api 보내기
const url = "/api/master/product";
const {
  datas,
  dataCount,
  datasAreLoading,
  loadDatas,
  searchDatas,
  insertData,
  numberOfPages,
} = useSendApi<MasterProduct>(url, currentPage, rowsPerPage);

const searchKey = ref("전체");
const searchInput = ref("");
onMounted(async () => loadDatas()); // 페이지 로딩 시 데이터 불러오기

// 조회
const search = () => {
  // console.log(searchKey.value, searchInput.value);
  searchDatas(searchKey.value, searchInput.value);
  pageChange();
};

//등록 Modal
const insertModal = ref(false);
const setInsertModal = (value: boolean) => {
  insertModal.value = value;
  console.log(insertModalData);
  insertModalData = {}; // 변수 초기화
};
let insertModalData: MasterProduct; // 등록할 변수

//수정 Modal
const editModal = ref(false);
const setEditModal = (value: boolean) => {
  editModal.value = value;
};

const editModalDataArr = { content: "", name: "", number: Number() };
const setEditModalData = (content: string, name: string, number: Number) => {
  editModalDataArr.content = content;
  editModalDataArr.name = name;
  editModalDataArr.number = Number(number);
};

//삭제 Modal
const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);

// 날짜 구하기
const now = moment().format("YYYY-MM-DD");
const nowPlus = moment().add(7, "days").format("YYYY-MM-DD");
const max_year = moment().format("YYYY");
const min_year = moment().add(-3, "years").format("YYYY");
const now2 = "전체기간";

const checkDebug = ref([]);
</script>

<template>
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
      <Button
        class="mr-2 shadow-md"
        as="a"
        variant="danger"
        @click="
          (event) => {
            event.preventDefault();
            setDeleteConfirmationModal(true);
          }
        "
      >
        <Lucide icon="Trash2" class="w-4 h-4 mr-2" /> 삭제</Button
      >
      <!--디버그 공간-->
      <div>Code : {{ checkDebug }}</div>
      <!--디버그 공간-->
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="ml-2">
        <FormSelect v-model="searchKey" class="w-30 mt-3 !box sm:mt-0">
          <option>전체</option>
          <option>품목코드</option>
          <option>거래처명</option>
          <option>품명</option>
          <option>규격</option>
          <option>비고</option>
        </FormSelect>
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-2">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            v-model="searchInput"
            @keyup.enter="search"
            placeholder="검색어를 입력해주세요"
          />
          <button @click="search">
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
          <Menu.Items class="w-40">
            <Menu.Item>
              <Lucide icon="Printer" class="w-4 h-4 mr-2" />
              <Print />
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="FileText" class="w-4 h-4 mr-2" />
              <Excel />
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
        />
      </div>
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div>
        {{ dataCount }}개 데이터 조회됨. {{ currentPage }} /
        {{ numberOfPages }} 페이지
        <!-- END: Pagination-->
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div
      class="col-span-12 overflow-auto intro-y lg:overflow-visible"
      id="printMe"
    >
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap"
              id="checkbox"
            >
              <FormCheck.Input
                id="checkbox-switch-1"
                type="checkbox"
                value=""
              />
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              순번
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              품목코드
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              거래처명
            </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 품명 </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 규격 </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              단위
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              안전재고
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              원가
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              비고
            </Table.Th>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap"
              id="edit"
            >
              편집
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <!-- <Table.Tr
          <Table.Tr
            v-for="(faker, fakerKey) in _.take(fakerData, 10)"
            :key="fakerKey"
            class="intro-x"
          > -->
          <Table.Tr
            v-for="(todo, index) in datas"
            :key="todo.NO"
            class="intro-x"
          >
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              id="checkbox"
              style="width: 50px"
            >
              <input
                class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 checked:bg-primary checked:border-primary checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50"
                id="checkbox-switch-1"
                type="checkbox"
                :value="todo.NO"
                v-model="checkDebug"
              />
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 50px"
            >
              <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 150px"
            >
              <div>{{ todo.품목코드 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 200px"
            >
              <div>{{ todo.거래처명 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 300px"
            >
              <div>{{ todo.품명 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-50 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 300px"
            >
              <div>{{ todo.규격 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 50px"
            >
              <div>{{ todo.단위 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 50px"
            >
              <div>{{ todo.안전재고 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 50px"
            >
              <div>{{ todo.원가 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 200px"
            >
              <div>{{ todo.비고 }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
              style="width: 100px"
              id="edit"
            >
              <div class="flex items-center justify-center">
                <a
                  class="flex items-center mr-3"
                  href="#"
                  @click="
                    (event) => {
                      event.preventDefault();
                      setEditModal(true);
                      // setEditModalData();
                    }
                  "
                >
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  수정
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: FOOTER(COPYRIGHT) -->
  <div style="text-align: right">
    <footer>&copy;2023 QInnotek. All rights reserved.</footer>
  </div>
  <!-- END: FOOTER(COPYRIGHT) -->
  <!-- BEGIN: Insert Modal Content -->
  <Dialog size="md" :open="insertModal" @close="setInsertModal(false)">
    <Dialog.Panel class="p-10 text-center">
      <!--추가 Modal 내용 시작-->
      <div class="mb-5" style="font-weight: bold">품목 등록</div>
      <div style="text-align: left">
        <div>
          <FormLabel htmlFor="vertical-form-1">품목코드</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            v-model="insertModalData.품목코드"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            v-model="insertModalData.거래처명"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">품명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            v-model="insertModalData.품명"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">규격</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            v-model="insertModalData.규격"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">단위</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            v-model="insertModalData.단위"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">안전재고</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            v-model="insertModalData.안전재고"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">원가</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            v-model="insertModalData.원가"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">비고</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            v-model="insertModalData.비고"
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
    <Dialog.Panel class="p-10 text-center">
      <div class="mb-5" style="font-weight: bold">수정</div>
      <div style="text-align: left">
        <div>
          <FormLabel htmlFor="vertical-form-1">품목코드</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            :modelValue="editModalDataArr.content"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            :modelValue="editModalDataArr.name"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">품명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            :modelValue="editModalDataArr.name"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">규격</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="200mm"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">단위</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="EA"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">안전재고</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            modelValue="300"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">원가</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            modelValue="168,000"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">비고</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            modelValue="비고란 입니다."
            placeholder=""
          />
        </div>
        <div class="mt-5 text-right">
          <Button class="mr-2 shadow-md" variant="primary">확인</Button>
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
        >
          삭제
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Delete Confirmation Modal -->
</template>

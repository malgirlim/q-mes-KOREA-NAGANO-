<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
import fakerData from "../utils/faker";
import Button from "../base-components/Button";
import Pagination from "../base-components/Pagination";
import { FormInput, FormSelect } from "../base-components/Form";
import Lucide from "../base-components/Lucide";
import Tippy from "../base-components/Tippy";
import { Dialog, Menu } from "../base-components/Headless";
import Table from "../base-components/Table";
import Popover from "../base-components/Headless/Popover";
import moment from "moment";
import Print from "../components/HtmlToPaper/HtmlToPaper.vue";
import Excel from "../components/MakeExcelFile/MakeExcelFile.vue";

// 페이징기능
import { onMounted, watch } from "vue";
import PaginationComponent from "../components/Pagination/PaginationComponent.vue"; // 페이징설정
import { useTodosApi } from "../composables/useTodosApi"; // 여기서 데이터 가져옴
const currentPage = ref(1); // 현재페이지
const rowsPerPage = ref(10); // 한 페이지에 보여질 데이터 갯수

const { todos, todosAreLoading, loadTodos, numberOfPages } = useTodosApi(
  currentPage,
  rowsPerPage
);

onMounted(async () => loadTodos());

const pageChange = () => {
  // 한 페이지에 보여질 데이터 갯수 변경 시 1페이지로 이동
  currentPage.value = 1;
};

//등록 Modal
const insertModal = ref(false);
const setInsertModal = (value: boolean) => {
  insertModal.value = value;
};

//수정 Modal
const editModal = ref(false);
const setEditModal = (value: boolean) => {
  editModal.value = value;
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

const print = () => {
  // Pass the element id here
  console.log("print");
};
</script>

<template>
  <div class="grid grid-cols-12 gap-1 mt-1">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap"
    >
      <Button
        class="mr-2 shadow-md"
        as="a"
        variant="primary"
        @click="
          () => {
            setInsertModal(true);
          }
        "
      >
        등록
      </Button>

      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="text-center">
        <Popover class="inline-block" v-slot="{}">
          <Popover.Button :as="Button" class="!box">
            <Lucide icon="Calendar" class="w-4 h-4 mr-2" />기간설정
            <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
          </Popover.Button>
          <Popover.Panel placement="bottom-start">
            <div class="p-2">
              <div>
                <div class="text-xs text-left">From</div>
                <FormInput
                  type="text"
                  class="flex-1 mt-2"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="mt-3">
                <div class="text-xs text-left">To</div>
                <FormInput
                  type="text"
                  class="flex-1 mt-2"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="flex items-center mt-3">
                <Button
                  variant="secondary"
                  @click="() => {}"
                  class="w-32 ml-auto"
                >
                  Close
                </Button>
                <Button variant="primary" class="w-32 ml-2"> Search </Button>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      <div class="ml-2">
        <FormSelect modelValue="전체기간" class="w-30 mt-3 !box sm:mt-0">
          <option>전체기간</option>
          <option>1일</option>
          <option>1주</option>
          <option>1개월</option>
        </FormSelect>
      </div>
      <div class="ml-2">
        <FormSelect modelValue="수주번호" class="w-30 mt-3 !box sm:mt-0">
          <option>수주번호</option>
          <option>품목명</option>
          <option>거래처명</option>
        </FormSelect>
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-2">
        <div class="relative w-56 text-slate-500">
          <FormInput type="text" class="w-56 pr-10 !box" placeholder="검색" />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
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
              <Lucide icon="Plus" class="w-4 h-4" />
            </span>
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item @click="print">
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
        {{ todos.length }}개 데이터 조회됨. {{ currentPage }} /
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
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              수주일자
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              수주번호
            </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 거래처명 </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 품목명 </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              수량
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              납기일
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
          <Table.Tr v-for="todo in todos" :key="todo.content" class="intro-x">
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div>2022.12.21(수)</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-15 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div>{{ todo.content }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-15 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              컴퓨존
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-30 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div>{{ todo.name }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div>{{ todo.number }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              2023.1.11(수)
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
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
                    }
                  "
                >
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Edit
                </a>
                <a
                  class="flex items-center text-danger"
                  href="#"
                  @click="
                    (event) => {
                      event.preventDefault();
                      setDeleteConfirmationModal(true);
                    }
                  "
                >
                  <Lucide icon="Trash2" class="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: Insert Modal Content -->
  <Dialog
    size="md"
    :open="insertModal"
    @close="
      () => {
        setInsertModal(false);
      }
    "
  >
    <Dialog.Panel class="p-10 text-center">
      <!--추가 Modal 내용 시작-->
      <div class="mb-5" style="font-weight: bold">등록</div>
      <div style="text-align: left">
        <div>
          <FormLabel htmlFor="vertical-form-1">수주일자</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="date"
            :modelValue="now"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">수주번호</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">품목명</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">수량</FormLabel>
          <FormInput id="vertical-form-2" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">납기일</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="date"
            :modelValue="nowPlus"
            placeholder=""
          />
        </div>
        <div class="mt-5 text-right">
          <Button class="mr-2 shadow-md" variant="primary">확인</Button>
          <Button
            class="mr-2 shadow-md"
            variant="primary"
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
          <FormLabel htmlFor="vertical-form-1">수주일자</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="date"
            modelValue="2022-12-21"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">수주번호</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="A20201221-001"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="컴퓨존"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">품목명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="품목명"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">수량</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            modelValue="100"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">납기일</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="date"
            modelValue="2023-01-11"
            placeholder=""
          />
        </div>
        <div class="mt-5 text-right">
          <Button class="mr-2 shadow-md" variant="primary">확인</Button>
          <Button
            class="mr-2 shadow-md"
            variant="primary"
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

function $htmlToPaper(arg0: string) { throw new Error("Function not
implemented."); } function $htmlToPaper(arg0: string) { throw new
Error("Function not implemented."); }

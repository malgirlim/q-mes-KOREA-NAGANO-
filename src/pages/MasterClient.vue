<script setup lang="ts">
import _, { isArguments } from "lodash";
import { ref } from "vue";
import Button from "../base-components/Button";
import { FormInput, FormSelect, FormCheck } from "../base-components/Form";
import Lucide from "../base-components/Lucide";
import { Dialog, Menu } from "../base-components/Headless";
import Table from "../base-components/Table";
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

const print = () => {
  // Pass the element id here
  console.log("print");
};
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
          () => {
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
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="ml-2">
        <FormSelect modelValue="전체" class="w-30 mt-3 !box sm:mt-0">
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
            placeholder="검색어를 입력해주세요"
          />
          <button>
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
              거래처명
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              대표자
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              사업자 번호
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              연락처
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              이메일
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              주소
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
            v-for="(todo, index) in todos"
            :key="todo.content"
            class="intro-x"
          >
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              id="checkbox"
              style="width: 50px"
            >
              <FormCheck>
                <FormCheck.Input
                  id="checkbox-switch-1"
                  type="checkbox"
                  value=""
                />
              </FormCheck>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 50px"
            >
              <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 100px"
            >
              <div>(주)큐이노텍</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 100px"
            >
              <div>최순우</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md bg-white text-center border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 150px"
            >
              <div>315-81-37335</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-50 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 150px"
            >
              <div>041-553-1569</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 150px"
            >
              <div>qinnotek@gmail.com</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 400px"
            >
              <div>충남 천안시 서북구 직산읍 4산단5길 28, 2층</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
              style="width: 200px"
            >
              <div>비고란 입니다.</div>
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
                      setEditModalData(todo.content, todo.name, todo.number);
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
  <!-- BEGIN: Insert Modal Content -->
  <!-- BEGIN: FOOTER(COPYRIGHT) -->
  <div style="text-align: right">
    <footer>&copy;2023 QInnotek. All rights reserved.</footer>
  </div>
  <!-- END: FOOTER(COPYRIGHT) -->
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
      <div class="mb-5" style="font-weight: bold">거래처 등록</div>
      <div style="text-align: left">
        <div>
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">대표자</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">사업자 번호</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">연락처</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">이메일</FormLabel>
          <FormInput id="vertical-form-1" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">주소</FormLabel>
          <FormInput id="vertical-form-2" type="text" placeholder="" />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">비고</FormLabel>
          <FormInput id="vertical-form-2" type="text" placeholder="" />
        </div>
        <div class="mt-5 text-right">
          <Button class="mr-2 shadow-md" variant="primary">확인</Button>
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
          <FormLabel htmlFor="vertical-form-1">거래처명</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="(주)큐이노텍"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">대표자</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="최순우"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">사업자 번호</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="315-81-37335"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">연락처</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="041-553-1569"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-1">이메일</FormLabel>
          <FormInput
            id="vertical-form-1"
            type="text"
            modelValue="qinnotek@gmail.com"
            placeholder=""
          />
        </div>
        <div class="mt-3">
          <FormLabel htmlFor="vertical-form-2">주소</FormLabel>
          <FormInput
            id="vertical-form-2"
            type="text"
            modelValue="충남 천안시 서북구 직산읍 4산단5길 28, 2층"
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

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
import Print from "../components/HtmlToPaper/HtmlToPaper.vue";
const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
</script>

<template>
  <div class="grid grid-cols-12 gap-1 mt-1">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap"
    >
      <Button variant="primary" class="mr-2 shadow-md"> 등록 </Button>
      <div class="hidden mx-auto md:block text-slate-500">
        총 150개 중 10개 항목 조회됨
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
        <div class="relative w-56 text-slate-500">
          <FormInput type="text" class="w-56 pr-10 !box" placeholder="검색" />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
      <div class="m-2">
        <Menu>
          <Menu.Button :as="Button" class="px-2 !box">
            <span class="flex items-center justify-center w-5 h-5">
              <Lucide icon="Plus" class="w-4 h-4" />
            </span>
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item>
              <Lucide icon="Printer" class="w-4 h-4 mr-2" /> <Print/>
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Excel 다운로드
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="FileText" class="w-4 h-4 mr-2" /> PDF 다운로드
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="col-span-12 overflow-auto intro-y lg:overflow-visible" id="printMe">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              발주일자
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              발주코드
            </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 거래처명 </Table.Th>
            <Table.Th class="border-b-0 whitespace-nowrap"> 품목명 </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              수량
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              예상입고일
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              입고여부
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap">
              편집
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr
            v-for="(faker, fakerKey) in _.take(fakerData, 9)"
            :key="fakerKey"
            class="intro-x"
          >
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div>2022.12.21(수)</div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-15 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              B20201221-001
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-15 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              컴퓨존
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-30 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              bt2042 bluetooth module v10.11
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              100
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              2023.1.11(수)
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
            >
              <div
                :class="[
                  'flex items-center justify-center',
                  { 'text-success': faker.trueFalse[0] },
                  { 'text-danger': !faker.trueFalse[0] },
                ]"
              >
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ faker.trueFalse[0] ? "입고" : "미입고" }}
              </div>
            </Table.Td>
            <Table.Td
              class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
            >
              <div class="flex items-center justify-center">
                <a class="flex items-center mr-3" href="#">
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
    <!-- BEGIN: Pagination -->
    <div
      class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap"
    >
      <Pagination class="w-full sm:w-auto sm:mr-auto">
        <Pagination.Link>
          <Lucide icon="ChevronsLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link active>1</Pagination.Link>
        <Pagination.Link>2</Pagination.Link>
        <Pagination.Link>3</Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronRight" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronsRight" class="w-4 h-4" />
        </Pagination.Link>
      </Pagination>
      <FormSelect class="w-20 mt-3 !box sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </FormSelect>
    </div>
    <!-- END: Pagination -->
  </div>
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
        <div class="mt-5 text-3xl">Are you sure?</div>
        <div class="mt-2 text-slate-500">
          Do you really want to delete these records? <br />
          This process cannot be undone.
        </div>
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
          Cancel
        </Button>
        <Button
          variant="danger"
          type="button"
          class="w-24"
          ref="deleteButtonRef"
        >
          Delete
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Delete Confirmation Modal -->
</template>
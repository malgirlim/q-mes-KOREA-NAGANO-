<script setup lang="ts">
import _ from "lodash";
import fakerData from "../utils/faker";
import Button from "../base-components/Button";
import Pagination from "../base-components/Pagination";
import { FormInput, FormSelect } from "../base-components/Form";
import Progress from "../base-components/Progress";
import Lucide from "../base-components/Lucide";
import Tippy from "../base-components/Tippy";
import { Menu, Dialog } from "../base-components/Headless";
import { ref } from "vue";

const basicModalPreview = ref(false);
const setBasicModalPreview = (value: boolean) => {
  basicModalPreview.value = value;
};
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">사용자 등록</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap"
    >
      <!-- BEGIN: Modal Toggle -->
      <div class="text-center">
        <Button
          class="mr-2 shadow-md"
          as="a"
          variant="primary"
          @click="
            () => {
              setBasicModalPreview(true);
            }
          "
        >
          추가
        </Button>
      </div>
      <!-- END: Modal Toggle -->
      <!-- BEGIN: Modal Content -->
      <Dialog
        size="md"
        :open="basicModalPreview"
        @close="
          () => {
            setBasicModalPreview(false);
          }
        "
      >
        <Dialog.Panel class="p-10 text-center">
          <!--Modal 내용 시작-->
          <div style="text-align: left">
            <div>
              <FormLabel htmlFor="vertical-form-1">ID</FormLabel>
              <FormInput id="vertical-form-1" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-1">패스워드</FormLabel>
              <FormInput id="vertical-form-1" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-1">패스워드 확인</FormLabel>
              <FormInput id="vertical-form-1" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-1">이름</FormLabel>
              <FormInput id="vertical-form-1" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">부서</FormLabel>
              <FormInput id="vertical-form-2" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">직책</FormLabel>
              <FormInput id="vertical-form-2" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">연락처</FormLabel>
              <FormInput id="vertical-form-2" type="text" placeholder="" />
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">이메일</FormLabel>
              <FormInput id="vertical-form-2" type="text" placeholder="" />
            </div>

            <Button variant="primary" class="mt-5"> 완료 </Button>
          </div>
          <!--Modal 내용 끝--></Dialog.Panel
        >
      </Dialog>
      <!-- END: Modal Content -->
      <Menu>
        <Menu.Button :as="Button" class="px-2 !box">
          <span class="flex items-center justify-center w-5 h-5">
            <Lucide icon="Plus" class="w-4 h-4" />
          </span>
        </Menu.Button>
        <Menu.Items class="w-40">
          <Menu.Item>
            <Lucide icon="Users" class="w-4 h-4 mr-2" /> Add Group
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="MessageCircle" class="w-4 h-4 mr-2" /> Send Message
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <div class="hidden mx-auto md:block text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            placeholder="Search..."
          />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
    </div>
    <!-- BEGIN: Users Layout -->
    <div
      v-for="(faker, fakerKey) in _.take(fakerData, 10)"
      :key="fakerKey"
      class="col-span-12 intro-y md:col-span-6"
    >
      <div class="box">
        <div
          class="flex flex-col items-center p-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
            <a href="" class="font-medium">
              {{ faker.users[0].name }} (userID)
            </a>
            <div class="text-slate-500 text-xs mt-0.5">
              스마트사업부 / {{ faker.jobs[0] }}
            </div>
            <div class="text-slate-500 text-xs mt-0.5">010-3258-2466</div>
            <div class="text-slate-500 text-xs mt-0.5">pica001@naver.com</div>
          </div>
          <div
            class="flex mt-3 -ml-2 lg:ml-0 lg:justify-end lg:mt-0"
            style="text-align: right"
          >
            <div><!--네임카드 우측 공간 기입란--></div>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-center p-5 lg:flex-nowrap"
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
          <Button variant="outline-secondary" class="px-2 py-1 mr-2">
            수정
          </Button>
          <Button variant="outline-danger" class="px-2 py-1"> 삭제 </Button>
        </div>
      </div>
    </div>
    <!-- END: Users Layout -->
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
</template>

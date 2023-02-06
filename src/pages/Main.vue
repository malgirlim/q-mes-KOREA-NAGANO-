<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import _ from "lodash";
import Lucide from "../base-components/Lucide";
import Tippy from "../base-components/Tippy";
import LineChart1 from "../components/LineChart1";
import LineChart2 from "../components/LineChart2";
import moment from "moment";
import { toast } from "vue3-toastify";

// #####  페이지 로딩 시 데이터 불러오기 및 5초마다 데이터 다시 불러오기  #####
onMounted(async () => {
  setInterval(() => {
    now.value = moment().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
});

// 날짜 구하기
const now = ref(moment().format("YYYY-MM-DD HH:mm:ss"));

// 하단 표시
const bottom_list = ["시간당 생산량", "재고비용 절감률", "안전재고 미달"];
const bottom = ref("시간당 생산량"); // 처음 표시할 것
const changeBottom = (cb: string) => {
  bottom.value = cb;
};
</script>

<template>
  <div>
    <div class="grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-8">
            <div class="flex items-center h-10 intro-y">
              <h2 class="mr-5 text-lg font-medium truncate">{{ now }} 현재</h2>

              <a href="" class="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
              </a>
            </div>
            <div class="grid grid-cols-9 gap-6 mt-5">
              <div class="col-span-9 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  :class="[
                    'relative zoom-in',
                    'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                  ]"
                >
                  <div class="p-5 box" @click="changeBottom(bottom_list[0])">
                    <div class="flex">
                      <Lucide
                        icon="Factory"
                        class="w-[28px] h-[28px] text-primary"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="어제보다 2개 감소"
                        >
                          2개
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">12</div>
                    <div class="mt-1 text-base text-slate-500">
                      KPI / 시간당 생산량
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  :class="[
                    'relative zoom-in',
                    'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                  ]"
                >
                  <div class="p-5 box" @click="changeBottom(bottom_list[1])">
                    <div class="flex">
                      <Lucide
                        icon="Wallet"
                        class="w-[28px] h-[28px] text-primary"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="어제보다 12% 상승"
                        >
                          12%
                          <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">92%</div>
                    <div class="mt-1 text-base text-slate-500">
                      KPI / 재고 비용 절감률
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  :class="[
                    'relative zoom-in',
                    'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                  ]"
                >
                  <div class="p-5 box" @click="changeBottom(bottom_list[2])">
                    <div class="flex">
                      <Lucide
                        icon="Siren"
                        class="w-[28px] h-[28px] text-danger"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="어제보다 3건 상승"
                        >
                          3건
                          <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">1</div>
                    <div class="mt-1 text-base text-slate-500">
                      안전재고 미달
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: General Report -->
        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN: Chart -->
  <div>
    <div class="mt-10 intro-y"></div>

    <!--KPI 시간당 생산량 차트-->
    <div v-if="bottom == bottom_list[0]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            >
              4,710개
            </div>
            <div class="mt-0.5 text-slate-500">이번 달</div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl">
              2,130개
            </div>
            <div class="mt-0.5 text-slate-500">지난 달</div>
          </div>
        </div>
      </div>
      <div
        :class="[
          'relative',
          'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
          'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
        ]"
      >
        <div><LineChart1 :height="275" class="mt-6 -mb-6" /></div>
      </div>
    </div>
    <!--KPI 재고비용 차트-->
    <div v-if="bottom == bottom_list[1]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            >
              310개
            </div>
            <div class="mt-0.5 text-slate-500">이번 달</div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl">
              320개
            </div>
            <div class="mt-0.5 text-slate-500">지난 달</div>
          </div>
        </div>
      </div>
      <div
        :class="[
          'relative',
          'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
          'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
        ]"
      >
        <div><LineChart2 :height="275" class="mt-6 -mb-6" /></div>
      </div>
    </div>
    <!-- END: Chart -->
    <!--안전재고 미달 리스트-->
    <div v-if="bottom == bottom_list[2]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            >
              4,710개
            </div>
            <div class="mt-0.5 text-slate-500">이번 달</div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl">
              2,130개
            </div>
            <div class="mt-0.5 text-slate-500">지난 달</div>
          </div>
        </div>
      </div>
    </div>
    <!-- BEGIN: FOOTER(COPYRIGHT) -->
    <div class="intro-y mt-3" style="text-align: right">
      <footer>&copy;2023 QInnotek. All rights reserved.</footer>
    </div>
    <!-- END: FOOTER(COPYRIGHT) -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import _ from "lodash";
import Lucide from "../base-components/Lucide";
import Tippy from "../base-components/Tippy";
import LineChart from "../components/LineChart";
import moment from "moment";
import Table from "../base-components/Table";

import PaginationComponent from "../components/Pagination/PaginationComponent.vue"; // 페이징설정

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import {
  MonitorKpiProd,
  MonitorKpiStock,
  MonitorSafe,
  MonitorStock,
  Monitor압력계조립,
} from "../interfaces/menu/monitorInterface";

// 페이징기능
const currentPage = ref(1); // 현재페이지
const rowsPerPage = ref(10); // 한 페이지에 보여질 데이터 갯수

const pageChange = () => {
  // 한 페이지에 보여질 데이터 갯수 변경 시 1페이지로 이동
  currentPage.value = 1;
};

// api 보내기 - 실시간 생산량
const monitor_압력계조립_url = "/api/monitor/press";
const monitor_압력계조립 = useSendApi<Monitor압력계조립>(
  monitor_압력계조립_url,
  currentPage,
  rowsPerPage
);
const monitor_압력계조립_data_calculate = ref(0); // 어제대비 수량
const monitor_압력계조립_data_일자 = ref();
const monitor_압력계조립_data_생산수 = ref();

// api 보내기 - 월 평균 시간당 생산량
const monitor_kpi_prod_url = "/api/monitor/kpi-prod";
const monitor_kpi_prod = useSendApi<MonitorKpiProd>(
  monitor_kpi_prod_url,
  currentPage,
  rowsPerPage
);
const monitor_kpi_prod_data_calculate = ref(0); // 전 월 대비 수량
const monitor_kpi_prod_data_연월 = ref();
const monitor_kpi_prod_data_측정치 = ref();
const monitor_kpi_prod_data_목표치 = ref();

// api 보내기 - 월간 재고비용 절감률
const monitor_kpi_stock_url = "/api/monitor/kpi-stock";
const monitor_kpi_stock = useSendApi<MonitorKpiStock>(
  monitor_kpi_stock_url,
  currentPage,
  rowsPerPage
);
const monitor_kpi_stock_data_calculate = ref(0); // 전 월 대비 달성율
const monitor_kpi_stock_data_연월 = ref();
const monitor_kpi_stock_data_측정치 = ref();
const monitor_kpi_stock_data_목표치 = ref();
const monitor_kpi_stock_data_절감률 = ref();

// api 보내기 - 안전재고 미달
const monitor_safe_url = "/api/monitor/safe";
const monitor_safe = useSendApi<MonitorSafe>(
  monitor_safe_url,
  currentPage,
  rowsPerPage
);

// api 보내기 - 안전재고 미달 어제 대비 수량 구하기
const monitor_stock_url = "/api/monitor/stock";
const monitor_stock = useSendApi<MonitorStock>(
  monitor_stock_url,
  currentPage,
  rowsPerPage
);
const monitor_stock_data_calculate = ref(0); // 안전재고 미달 어제 대비 수량

// #####  페이지 로딩 시 데이터 불러오기 및 5초마다 데이터 다시 불러오기  #####
onMounted(async () => {
  await loadData(); // ##### 가져올 데이터 참고
  setInterval(async () => {
    loadData();
  }, 60000);

  setInterval(() => {
    now.value = moment().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
});
// ###########  가져올 데이터 ##########
const loadData = async () => {
  await monitor_압력계조립.loadDatas();
  monitor_압력계조립_data_calculate.value = Number(
    Number(
      monitor_압력계조립.dataAll.value
        .filter((v) => v.일자 == moment().format("YYYY-MM-DD"))
        .map(({ 생산수 }) => 생산수)
    ) -
      Number(
        monitor_압력계조립.dataAll.value
          .filter(
            (v) => v.일자 == moment().add(-1, "days").format("YYYY-MM-DD")
          )
          .map(({ 생산수 }) => 생산수)
      )
  );
  monitor_압력계조립_data_일자.value = monitor_압력계조립.datas.value
    ?.map(({ 일자 }) => 일자)
    .reverse();
  monitor_압력계조립_data_생산수.value = monitor_압력계조립.datas.value
    ?.map(({ 생산수 }) => 생산수)
    .reverse();

  await monitor_kpi_prod.loadDatas();
  monitor_kpi_prod_data_calculate.value = Number(
    Number(
      monitor_kpi_prod.dataAll.value
        .filter((v) => v.연월 == moment().format("YYYY-MM"))
        .map(({ 측정치 }) => 측정치)
    ) -
      Number(
        monitor_kpi_prod.dataAll.value
          .filter((v) => v.연월 == moment().add(-1, "month").format("YYYY-MM"))
          .map(({ 측정치 }) => 측정치)
      )
  );
  monitor_kpi_prod_data_연월.value = monitor_kpi_prod.dataAll.value
    ?.map(({ 연월 }) => 연월)
    .reverse();
  monitor_kpi_prod_data_측정치.value = monitor_kpi_prod.dataAll.value
    ?.map(({ 측정치 }) => 측정치)
    .reverse();
  monitor_kpi_prod_data_목표치.value = monitor_kpi_prod.dataAll.value
    ?.map(({ 목표치 }) => 목표치)
    .reverse();

  await monitor_kpi_stock.loadDatas();
  monitor_kpi_stock_data_calculate.value =
    ((Number(
      monitor_kpi_stock.dataAll.value
        .filter((v) => v.연월 == moment().format("YYYY-MM"))
        .map(({ 목표치 }) => 목표치)[0]
    ) -
      Number(
        monitor_kpi_stock.dataAll.value
          .filter((v) => v.연월 == moment().format("YYYY-MM"))
          .map(({ 측정치 }) => 측정치)[0]
      )) /
      Number(
        monitor_kpi_stock.dataAll.value
          .filter((v) => v.연월 == moment().format("YYYY-MM"))
          .map(({ 목표치 }) => 목표치)[0]
      ) -
      (Number(
        monitor_kpi_stock.dataAll.value
          .filter((v) => v.연월 == moment().add(-1, "month").format("YYYY-MM"))
          .map(({ 목표치 }) => 목표치)[0]
      ) -
        Number(
          monitor_kpi_stock.dataAll.value
            .filter(
              (v) => v.연월 == moment().add(-1, "month").format("YYYY-MM")
            )
            .map(({ 측정치 }) => 측정치)[0]
        )) /
        Number(
          monitor_kpi_stock.dataAll.value
            .filter(
              (v) => v.연월 == moment().add(-1, "month").format("YYYY-MM")
            )
            .map(({ 목표치 }) => 목표치)[0]
        )) *
    100;
  monitor_kpi_stock_data_연월.value = monitor_kpi_stock.dataAll.value
    ?.map(({ 연월 }) => 연월)
    .reverse();
  monitor_kpi_stock_data_측정치.value = monitor_kpi_stock.dataAll.value
    ?.map(({ 측정치 }) => 측정치)
    .reverse();
  monitor_kpi_stock_data_목표치.value = monitor_kpi_stock.dataAll.value
    ?.map(({ 목표치 }) => 목표치)
    .reverse();
  monitor_kpi_stock_data_절감률.value = monitor_kpi_stock.dataAll.value
    ?.map(
      ({ 목표치, 측정치 }) =>
        ((Number(목표치) - Number(측정치)) / Number(목표치)) * 100
    )
    .reverse();

  await monitor_safe.loadDatas();
  await monitor_stock.searchDatas(
    "22/01/01 - " + moment().add(-1, "days").format("YY/MM/DD"),
    "전체",
    ""
  );
  const monitor_stock_data_past = monitor_stock.datas.value.filter(
    (v) => (v.부족재고수 ? v.부족재고수 : 0) > 0
  );
  await monitor_stock.searchDatas(
    "22/01/01 - " + moment().format("YY/MM/DD"),
    "전체",
    ""
  );
  const monitor_stock_data_current = monitor_stock.datas.value.filter(
    (v) => (v.부족재고수 ? v.부족재고수 : 0) > 0
  );
  monitor_stock_data_calculate.value =
    monitor_stock_data_current.length - monitor_stock_data_past.length;
};

// 날짜 구하기
const now = ref(moment().format("YYYY-MM-DD HH:mm:ss"));

// 하단 표시
const bottom_list = [
  "실시간 생산량",
  "시간당 생산량",
  "재고비용 절감률",
  "안전재고 미달",
];
const bottom = ref("실시간 생산량"); // 처음 표시할 것
const changeBottom = (cb: string) => {
  bottom.value = cb;
};

// 테이블 열 크기 조정 (안전재고 미달)
const table_width = [
  "width: 50px", // 순번
  "width: 50px", // 품목코드
  "width: 150px", // 거래처명
  "width: 300px", // 품명
  "width: 100px", // 규격
  "width: 100px", // 단위
  "width: 50px", // 재고수
  "width: 50px", // 안전재고수
  "width: 50px", // 부족재고수
  "width: 150px", // 링크
];

const lineChartMonth = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
</script>

<template>
  <div>
    <div class="grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-8">
            <div class="flex items-center h-10 intro-y">
              <h2 class="mr-5 text-lg font-medium truncate" :key="now">
                {{ now }} 현재
              </h2>

              <a href="" class="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
              </a>
            </div>
            <div class="grid grid-cols-9 gap-6 mt-5">
              <!--<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  :class="[
                    'relative zoom-in',
                    'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                  ]"
                >
                  <div class="p-5 box" @click="changeBottom(bottom_list[0])">
                    <div class="flex">
                      <Lucide
                        icon="Clock"
                        class="w-[28px] h-[28px] text-primary"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          :content="
                            '어제보다 ' +
                            monitor_압력계조립_data_calculate +
                            '개' +
                            (monitor_압력계조립_data_calculate >= 0
                              ? ' 상승'
                              : ' 하강')
                          "
                          :key="monitor_압력계조립_data_calculate"
                        >
                          {{ monitor_압력계조립_data_calculate }}개
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">
                      {{
                        monitor_압력계조립.datas.value
                          .filter(
                            (v) => v.일자 == moment().format("YYYY-MM-DD")
                          )
                          .map(({ 생산수 }) => 생산수)[0]
                      }}
                    </div>
                    <div class="mt-1 text-base text-slate-500">
                      금일 생산 현황
                    </div>
                  </div>
                </div>
              </div>-->
              <div class="col-span-9 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  :class="[
                    'relative zoom-in',
                    'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                  ]"
                >
                  <div class="p-5 box" @click="changeBottom(bottom_list[1])">
                    <div class="flex">
                      <Lucide
                        icon="Factory"
                        class="w-[28px] h-[28px] text-primary"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          :class="[
                            'cursor-pointer py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium',
                            {
                              'bg-success':
                                monitor_kpi_prod_data_calculate >= 0,
                            },
                            {
                              'bg-danger': monitor_kpi_prod_data_calculate < 0,
                            },
                          ]"
                          :content="
                            '전 월보다 ' +
                            monitor_kpi_prod_data_calculate +
                            '개' +
                            (monitor_kpi_prod_data_calculate >= 0
                              ? ' 상승'
                              : ' 하강')
                          "
                          :key="monitor_kpi_prod_data_calculate"
                        >
                          {{ monitor_kpi_prod_data_calculate }}개
                          <Lucide
                            :icon="
                              monitor_kpi_prod_data_calculate >= 0
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            "
                            class="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">
                      {{
                        monitor_kpi_prod.dataAll.value
                          .filter((v) => v.연월 == moment().format("YYYY-MM"))
                          .map(({ 측정치 }) => 측정치)[0]
                      }}

                      <span class="ml-2"
                        >&raquo;{{
                          monitor_kpi_prod.dataAll.value
                            .filter((v) => v.연월 == moment().format("YYYY-MM"))
                            .map(({ 목표치 }) => 목표치)[0]
                        }}</span
                      >
                    </div>
                    <div class="mt-1 text-base text-slate-500">
                      KPI / 월 평균 시간당 생산량 &raquo; 목표량
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
                        icon="Wallet"
                        class="w-[28px] h-[28px] text-primary"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          :class="[
                            'cursor-pointer py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium',
                            {
                              'bg-success':
                                monitor_kpi_stock_data_calculate >= 0,
                            },
                            {
                              'bg-danger': monitor_kpi_stock_data_calculate < 0,
                            },
                          ]"
                          :content="
                            '전 월보다 ' +
                            monitor_kpi_stock_data_calculate.toFixed(2) +
                            '%' +
                            (monitor_kpi_stock_data_calculate >= 0
                              ? ' 상승'
                              : ' 하강')
                          "
                          :key="monitor_kpi_stock_data_calculate"
                        >
                          {{ monitor_kpi_stock_data_calculate.toFixed(2) }}%
                          <Lucide
                            :icon="
                              monitor_kpi_stock_data_calculate >= 0
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            "
                            class="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">
                      {{
                        (
                          ((Number(
                            monitor_kpi_stock.dataAll.value
                              .filter(
                                (v) => v.연월 == moment().format("YYYY-MM")
                              )
                              .map(({ 목표치 }) => 목표치)[0]
                          ) -
                            Number(
                              monitor_kpi_stock.dataAll.value
                                .filter(
                                  (v) => v.연월 == moment().format("YYYY-MM")
                                )
                                .map(({ 측정치 }) => 측정치)[0]
                            )) /
                            Number(
                              monitor_kpi_stock.dataAll.value
                                .filter(
                                  (v) => v.연월 == moment().format("YYYY-MM")
                                )
                                .map(({ 목표치 }) => 목표치)[0]
                            )) *
                          100
                        ).toFixed(2)
                      }}%
                    </div>
                    <div class="mt-1 text-base text-slate-500">
                      KPI / 월간 재고 비용 절감률
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
                  <div class="p-5 box" @click="changeBottom(bottom_list[3])">
                    <div class="flex">
                      <Lucide
                        icon="Siren"
                        class="w-[28px] h-[28px] text-danger"
                      />
                      <div class="ml-auto">
                        <Tippy
                          as="div"
                          :class="[
                            'cursor-pointer py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium',
                            {
                              'bg-success': monitor_stock_data_calculate <= 0,
                            },
                            {
                              'bg-danger': monitor_stock_data_calculate > 0,
                            },
                          ]"
                          :content="
                            '어제보다 ' +
                            monitor_stock_data_calculate +
                            '건' +
                            (monitor_stock_data_calculate >= 0
                              ? ' 상승'
                              : ' 하강')
                          "
                          :key="monitor_stock_data_calculate"
                        >
                          {{ monitor_stock_data_calculate }}건
                          <Lucide
                            :icon="
                              monitor_stock_data_calculate <= 0
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            "
                            class="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div class="mt-6 text-3xl font-medium leading-8">
                      {{ monitor_safe.dataCount }}
                    </div>
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
    <!--실시간 생산량 차트
    <div v-if="bottom == bottom_list[0]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            >
              2개
            </div>
            <div class="mt-0.5 text-slate-500">1시간</div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl">
              10개
            </div>
            <div class="mt-0.5 text-slate-500">누적</div>
          </div>
        </div>
      </div>
      <div class="text-lg font-medium text-center -mt-10">실시간 생산 현황</div>
      <div
        v-memo="[
          monitor_압력계조립_data_생산수,
          monitor_압력계조립_data_생산수,
        ]"
      >
        <LineChart
          :height="300"
          :data_labels="monitor_압력계조립_data_일자"
          :data_set="{
            target_label: '생산수',
            target_data: monitor_압력계조립_data_생산수,
            output_label: '생산수',
            output_data: monitor_압력계조립_data_생산수,
          }"
          class="mt-5 -mb-6"
        />
      </div>
     
    </div>
    KPI 시간당 생산량 차트-->
    <div v-if="bottom == bottom_list[1]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            >
              {{ monitor_kpi_prod.datas.value[0]?.측정치 }} 개
            </div>
            <div class="mt-0.5 text-slate-500">이번 달</div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl">
              {{ monitor_kpi_prod.datas.value[1]?.측정치 }} 개
            </div>
            <div class="mt-0.5 text-slate-500">지난 달</div>
          </div>
        </div>
      </div>
      <div class="text-lg font-medium text-center -mt-10">
        KPI - 월 평균 시간당 생산량(UPH)
      </div>

      <div
        v-memo="[monitor_kpi_prod_data_측정치, monitor_kpi_prod_data_측정치]"
      >
        <LineChart
          :height="300"
          :data_labels="monitor_kpi_prod_data_연월"
          :data_set="{
            target_label: '시간당 생산량(UPH)',
            target_data: monitor_kpi_prod_data_측정치,
            output_label: '목표치',
            output_data: monitor_kpi_prod_data_목표치,
          }"
          class="mt-5 -mb-6"
        />
      </div>
      <!-- div><LineChart2 :height="300" class="mt-5 -mb-6" /></div -->
    </div>
    <!--KPI 재고비용 차트-->
    <div v-if="bottom == bottom_list[2]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            ></div>
            <div class="mt-0.5 text-slate-500"></div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl"></div>
            <div class="mt-0.5 text-slate-500"></div>
          </div>
        </div>
      </div>
      <div class="text-lg font-medium text-center -mt-10">
        KPI / 월간 재고 비용 절감률(%)
      </div>
      <div
        v-memo="[monitor_kpi_stock_data_절감률, monitor_kpi_stock_data_절감률]"
      >
        <LineChart
          :height="300"
          :data_labels="monitor_kpi_stock_data_연월"
          :data_set="{
            target_label: '절감률(%)',
            target_data: monitor_kpi_stock_data_절감률,
            output_label: '목표치',
            output_data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          }"
          class="mt-5 -mb-6"
        />
      </div>
      <!-- div><LineChart3 :height="300" class="mt-5 -mb-6" /></div -->
    </div>
    <!-- END: Chart -->
    <!--안전재고 미달 리스트-->
    <div v-if="bottom == bottom_list[3]" class="p-5 mt-12 intro-y box sm:mt-5">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <div>
            <div
              class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
            ></div>
            <div class="mt-0.5 text-slate-500"></div>
          </div>
          <div
            class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
          ></div>
          <div>
            <div class="text-lg font-medium text-slate-500 xl:text-xl"></div>
            <div class="mt-0.5 text-slate-500"></div>
          </div>
        </div>
      </div>
      <div class="text-lg font-medium text-center -mt-10">
        안전재고 미달 리스트
      </div>

      <!-- BEGIN: Data List -->
      <!-- style="height: calc(100vh - 350px)" : 브라우저 화면 창크기에 맞게 변경됨 -->
      <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
        <div
          class="mt-5"
          style="overflow-y: scroll; overflow-x: hidden; height: 300px"
        >
          <Table class="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead
              class="bg-slate-100"
              style="position: sticky; top: 0px; z-index: 2"
            >
              <Table.Tr>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[0]"
                >
                  순번
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[1]"
                >
                  품목코드
                </Table.Th>
                <Table.Th
                  class="border-b-0 whitespace-nowrap"
                  :style="table_width[2]"
                >
                  거래처명
                </Table.Th>
                <Table.Th
                  class="border-b-0 whitespace-nowrap"
                  :style="table_width[3]"
                >
                  품명
                </Table.Th>
                <Table.Th
                  class="border-b-0 whitespace-nowrap"
                  :style="table_width[4]"
                >
                  규격
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[5]"
                >
                  단위
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[6]"
                >
                  재고수
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[7]"
                >
                  안전재고수
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[8]"
                >
                  부족재고수
                </Table.Th>
                <Table.Th
                  class="text-center border-b-0 whitespace-nowrap"
                  :style="table_width[9]"
                >
                  링크
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody style="position: relative; z-index: 1">
              <Table.Tr
                v-for="(todo, index) in monitor_safe.dataAll.value"
                :key="todo.NO"
                class="intro-x"
              >
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[0]"
                >
                  <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[1]"
                >
                  <div>{{ todo.품목코드 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[2]"
                >
                  <div>{{ todo.거래처명 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-50 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[3]"
                >
                  <div>{{ todo.품명 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[4]"
                >
                  <div>{{ todo.규격 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[5]"
                >
                  <div>{{ todo.단위 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-10 text-center text-danger bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[6]"
                >
                  <div>{{ todo.재고수 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[7]"
                >
                  <div>{{ todo.안전재고수 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white text-danger border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[8]"
                >
                  <div>{{ todo.부족재고수 }}</div>
                </Table.Td>
                <Table.Td
                  class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  :style="table_width[9]"
                >
                  <div class="flex items-center justify-center">
                    <Lucide icon="Link" class="w-4 h-4 mr-2" />
                    <a href="/monitor/safe">바로가기</a>
                  </div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <div
            class="text-center mt-20"
            v-if="monitor_safe.dataCount.value == 0"
          >
            저장된 데이터가 없습니다.
          </div>
        </div>
      </div>
      <!-- END: Data List -->
    </div>

    <!-- BEGIN: FOOTER(COPYRIGHT) -->
    <div class="intro-y mt-3" style="text-align: right">
      <footer>&copy;2023 QInnotek. All rights reserved.</footer>
    </div>
    <!-- END: FOOTER(COPYRIGHT) -->
  </div>
</template>

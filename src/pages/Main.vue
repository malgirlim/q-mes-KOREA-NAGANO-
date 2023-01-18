<script setup lang="ts">
import _ from "lodash";
import Lucide from "../base-components/Lucide";
import Tippy from "../base-components/Tippy";
import LineChart from "../components/LineChart";


</script>

<template>
  <div><div class="grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">실시간 재고 현황</h2>
            <a href="" class="flex items-center ml-auto text-primary">
              <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div
                :class="[
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="PackagePlus"
                      class="w-[28px] h-[28px] text-primary"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="어제보다 33% 상승"
                      >
                        33%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">4,710</div>
                  <div class="mt-1 text-base text-slate-500">입고수</div>
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
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="PackageMinus"
                      class="w-[28px] h-[28px] text-primary"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="어제보다 2% 감소"
                      >
                        2%
                        <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">310</div>
                  <div class="mt-1 text-base text-slate-500">출고수</div>
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
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="PackageX"
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
                  <div class="mt-6 text-3xl font-medium leading-8">10</div>
                  <div class="mt-1 text-base text-slate-500">
                    불량 재고수
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
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="Siren"
                      class="w-[28px] h-[28px] text-danger"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="어제보다 22% 상승"
                      >
                        22%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">32</div>
                  <div class="mt-1 text-base text-slate-500">
                    안전재고 미달
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->
      </div></div></div></div>
      <div><div class="mt-10 intro-y"><h2 class="mr-5 text-lg font-medium truncate">재고 통계</h2></div>
      <div class="p-5 mt-12 intro-y box sm:mt-5">
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
              <LineChart :height="275" class="mt-6 -mb-6" />
            </div>
          </div>

    </div>
</template>

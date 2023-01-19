import { ref, Ref } from "@vue/reactivity";
import axios from "axios";
import { usePagination } from "../components/Pagination/useClientSidePagination";

export function useSendApi<T>(
  url: string,
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) {
  const datas: Ref<T[]> = ref([]); // 인터페이스 T 형식에 맞는 데이터를 가져올 공간
  const datasAreLoading = ref(false); // 데이터를 가져오면서 로딩하고 있는지 확인하는 변수
  const dataCount = ref(0); // 가져온 데이터의 갯수

  // 페이지 첫 로딩 시 데이터 가져오기
  const loadDatas = async () => {
    datasAreLoading.value = true;
    try {
      await axios.get(url).then((res) => {
        datas.value = res.data;
        dataCount.value = datas.value.length;
      });
    } catch (err) {
      console.log(err);
    } finally {
      datasAreLoading.value = false;
    }
  };

  // 조건 조회
  const searchDatas = async (key: String, input: String) => {
    datasAreLoading.value = true;
    try {
      await axios.post(url, { key, input }).then((res) => {
        datas.value = res.data;
        dataCount.value = datas.value.length;
      });
    } catch (err) {
      console.log(err);
    } finally {
      datasAreLoading.value = false;
    }
  };

  // 등록
  const insertData = async (data: T) => {
    try {
      await axios.post(url + "/receive", { data });
    } catch (err) {
      console.log(err);
    }
  };

  // 수정
  const editData = async (data: T) => {
    try {
      await axios.post(url + "/edit", { data });
    } catch (err) {
      console.log(err);
    }
  };

  // 페이징 기능
  const { paginatedArray, numberOfPages } = usePagination<T>({
    rowsPerPage,
    arrayToPaginate: datas,
    currentPage,
  });

  return {
    datas: paginatedArray,
    dataCount,
    datasAreLoading,
    loadDatas,
    searchDatas,
    insertData,
    editData,
    numberOfPages,
  };
}

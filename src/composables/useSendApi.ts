import { ref, Ref } from "@vue/reactivity";
import axios from "axios";
import { usePagination } from "../components/Pagination/useClientSidePagination";

export function useSendApi<T>(
  url: string,
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) {
  const datas: Ref<T[]> = ref([]);
  const datasAreLoading = ref(false);

  const loadDatas = async () => {
    datasAreLoading.value = true;
    try {
      await axios.get(url).then((res) => {
        datas.value = res.data;
      });
    } catch (err) {
      console.log(err);
    } finally {
      datasAreLoading.value = false;
    }
  };

  const searchDatas = async (key: String, input: String) => {
    datasAreLoading.value = true;
    try {
      await axios.post(url, { key, input }).then((res) => {
        datas.value = res.data;
      });
    } catch (err) {
      console.log(err);
    } finally {
      datasAreLoading.value = false;
    }
  };

  const { paginatedArray, numberOfPages } = usePagination<T>({
    rowsPerPage,
    arrayToPaginate: datas,
    currentPage,
  });

  return {
    datas: paginatedArray,
    datasAreLoading,
    loadDatas,
    searchDatas,
    numberOfPages,
  };
}

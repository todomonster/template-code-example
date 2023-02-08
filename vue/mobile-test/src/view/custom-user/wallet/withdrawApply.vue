<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { apiUserReportStore } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { Toast } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const { query } = useRoute();
    const form = ref(null);
    const inputData = ref({});

    onMounted(async () => {});

    const handleSubmit = async (e) => {
      e.preventDefault();
    };

    return {
      form,
      handleSubmit,

      inputData,
    };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="navbar-container">
      <div class="gooddetail-container">
        <div class="image-container">
          <div class="image">
            <img src="https://fakeimg.pl/340x200/?text=提領申請&font=noto" />
          </div>
        </div>
        <div class="item-container"></div>
        <div class="form-container">
          <form ref="form">
            <div class="mb-2">
              <label class="form-label">
                銀行代碼
                <span class="must">必填</span>
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="ex: 017"
                v-model="inputData.name"
              />
            </div>
            <div class="mb-2">
              <label class="form-label">
                匯款帳戶
                <span class="must">必填</span>
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="ex: 0123456789(10-14碼)"
                v-model="inputData.name"
              />
            </div>
            <div class="mb-2">
              <label class="form-label"
                >姓名<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="ex: 王小明"
                v-model="inputData.contact"
                required
              />
            </div>
            <div class="mb-2">
              <label class="form-label"
                >提領額度(NTD)<span class="must">必填</span></label
              >
              <input
                type="number"
                class="form-control"
                placeholder="ex: 1000"
                v-model="inputData.contact"
                required
              />
            </div>
            <div class="mb-2">
              <label class="form-label"
                >密碼<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="請輸入密碼"
                v-model="inputData.contact"
                required
              />
            </div>
            <div class="btn-container mt-5">
              <button
                class="btn btn-welfare"
                type="submit"
                @click="handleSubmit"
              >
                確認提領
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

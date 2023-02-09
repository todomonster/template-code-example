<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { apiUserApplyWithdraw } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { Toast, ToastHtml } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const { query } = useRoute();
    const form = ref(null);
    const inputData = ref({
      bankPrefix: "",
      bankAccount: "",
      name: "",
      amount: 0,
      password: "",
    });

    onMounted(async () => {});

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (form.value.reportValidity()) {
          // swal 細節確認再送請求
          const { bankPrefix, bankAccount, name, amount } = inputData.value;
          const swal = await ToastHtml(
            "資訊核對",
            `
<ul class="text-start" style="white-space:pre">
  <li>銀行代碼:&#9;${bankPrefix}</li>
  <li>匯款帳戶:&#9;${bankAccount}</li>
  <li>帳戶姓名:&#9;${name}</li>
  <li>提領額度(NTD):&#9;${amount}</li>
</ul>`
          );
          if (swal.isConfirmed) {
            const response = await apiUserApplyWithdraw(inputData.value);
            if (response.result) {
              Toast("申請成功");
              goto("back");
            } else {
              errorHandle(response);
            }
          }
        }
      } catch (error) {
        errorHandle(error);
      }
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
          <div class="image border-grey">
            <img src="@/assets/images/img_myfree_apply_reward.png" />
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
                v-model="inputData.bankPrefix"
                required
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
                v-model="inputData.bankAccount"
                required
              />
            </div>
            <div class="mb-2">
              <label class="form-label"
                >帳戶姓名<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="ex: 王小明"
                v-model="inputData.name"
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
                v-model="inputData.amount"
                required
              />
            </div>
            <!-- <div class="mb-2">
              <label class="form-label"
                >密碼<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="請輸入密碼"
                v-model="inputData.password"
                required
              />
            </div> -->
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
<style lang="scss" scoped>
.border-grey {
  border: 1rem solid #eaeaea;
}
</style>

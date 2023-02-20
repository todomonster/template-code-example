<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { apiUserApplyWithdraw } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { Toast, ToastHtml } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

import { ExtCallAppStorage } from "@/utils/extCall";

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
      amount: 1000,
      password: "",
      saveToPhone: false,
    });

    onMounted(async () => {
      // 取值
      ExtGetDataByKey();
    });

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
              // 將表單資料存到手機
              ExtSaveDataByKey();
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

    const ExtSaveDataByKey = () => {
      try {
        const value = JSON.stringify(inputData.value);
        window.ExtCallSaveDataByKey = (val) => console.log(`${val}`);
        ExtCallAppStorage.saveDataByKey({
          keyword: "bankAccountInfo",
          value,
          windowFunctionName: "ExtCallSaveDataByKey",
        });
      } catch (error) {
        errorHandle(error);
      }
    };

    const ExtGetDataByKey = () => {
      try {
        window.ExtCallGetDataByKey = (val) => {
          if (val && typeof val === "string") {
            const formData = JSON.parse(val);
            // 自動載入
            if (formData.saveToPhone) {
              inputData.value = formData;
            }
          }
        };
        ExtCallAppStorage.getDataByKey({
          keyword: "bankAccountInfo",
          windowFunctionName: "ExtCallGetDataByKey",
        });
      } catch (error) {
        errorHandle(error);
      }
    };
    // const ExtGetEncryptDataByKey = () => {
    //   try {
    //     window.ExtCallGetEncryptDataByKey = (val) => Toast(val);
    //     ExtCallAppStorage.getEncryptDataByKey({
    //       keyword: "bankAccountInfo",
    //       windowFunctionName: "ExtCallGetEncryptDataByKey",
    //     });
    //   } catch (error) {
    //     errorHandle(error);
    //   }
    // };

    return {
      form,
      handleSubmit,
      inputData,
      // ExtSaveDataByKey,
      // ExtGetDataByKey,
      // ExtGetEncryptDataByKey,
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
            <div class="mb-3">
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
            <div class="d-flex justify-content-center align-item-center">
              <div class="form-check">
                <input
                  v-model="inputData.saveToPhone"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  :checked="inputData.saveToPhone"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  儲存帳戶資訊
                </label>
              </div>
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
        <!-- <button @click="ExtSaveDataByKey">存到App</button> -->
        <!-- <button @click="ExtGetDataByKey">取值</button> -->
        <!-- <button @click="ExtGetEncryptDataByKey">取值 加密</button> -->
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.border-grey {
  border: 1rem solid #eaeaea;
}
</style>

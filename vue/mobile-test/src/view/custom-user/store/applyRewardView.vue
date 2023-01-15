<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { apiRefreshPoint, apiUserApplyReward } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { Toast } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const max = 9999999;
    const form = ref(null);
    const inputData = ref({
      amountOfMoney: 0,
    });
    const { query } = useRoute();
    const storeName = ref("");
    const storeImages = ref("");
    const userRewardRange = ref(0);
    const money = ref(0);
    const point = ref(0);

    const useAmount = computed(() => {
      return Math.floor(
        inputData.value.amountOfMoney * userRewardRange.value * 0.01
      );
    });
    const amountCrossPercent = computed(() => {
      const amount =
        Math.floor(inputData.value.amountOfMoney * userRewardRange.value) *
        0.01;
      return amount.toFixed(2);
    });
    const notAllow = computed(() => {
      return point.value - useAmount.value < 0;
    });

    const handleChange = (e) => {
      const len = e.target.value.length;
      const maxLength = String(max);
      if (len >= maxLength.length) {
        inputData.value.amountOfMoney = e.target.value.slice(0, -1);
      }
    };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const id = Number(query.id);
        if (form.value.reportValidity()) {
          // 處理
          const response = await apiUserApplyReward({
            amount: Number(inputData.value.amountOfMoney),
            storeId: id,
          });
          if (response.result) {
            Toast("申請成功!");
            // 踢回上一頁
            goto("back");
          } else {
            Toast(`${response.message} 請確認最低回饋金額!`);
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    onMounted(async () => {
      try {
        // 取名稱和圖片

        const { name, images, rewardRange } = query;
        storeName.value = name;
        storeImages.value = images;
        userRewardRange.value = Number(rewardRange) || 0;

        // 打API
        const response = await apiRefreshPoint();
        if (response.result) {
          money.value = Number(response.balance) || 0;
          point.value = Number(response.point) || 0;
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
      form,
      handleSubmit,
      storeName,
      storeImages,
      money,
      point,
      inputData,
      userRewardRange,
      useAmount,
      amountCrossPercent,
      notAllow,
      max,
      handleChange,
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
          <div class="image"><img :src="storeImages" /></div>
        </div>
        <div class="item-container">
          <div class="item-title mb-2">
            {{ `${storeName}&nbsp;&nbsp;` }}
            <span class="text-danger">{{ `${userRewardRange}%` }}</span>
          </div>
        </div>
        <div class="form-container">
          <form ref="form">
            <div class="mb-4">
              <label class="form-label mb-1">消費金額</label>
              <input
                type="number"
                name="cost"
                class="form-control"
                placeholder="請輸入消費金額"
                min="0"
                @input="handleChange"
                :max="max"
                v-model="inputData.amountOfMoney"
                required
              />
            </div>
            <div class="item-container item-container-4">
              <div class="d-flex">
                <div class="col-left pb-2">
                  {{
                    `${
                      inputData.amountOfMoney ? inputData.amountOfMoney : 0
                    } * ${userRewardRange}% = ${amountCrossPercent}`
                  }}
                </div>
                <div class="col-right pb-2">
                  *小數點第二位後<br />
                  無條件捨去
                </div>
              </div>
              <div class="d-flex">
                <div class="col-left pb-2">超級點</div>
                <div class="col-right pb-2">
                  <div class="orange">
                    {{ `${point} → ${point - useAmount}` }}
                  </div>
                </div>
              </div>
              <div class="d-flex border-0">
                <div class="col-left pt-0">福利金</div>
                <div class="col-right pt-0">
                  <div class="green">
                    {{ `${money} → ${money + useAmount}` }}
                  </div>
                </div>
              </div>
              <!-- <div class="d-flex">
                <div class="col-left">超級點餘額</div>
                <div class="col-right">{{  }}</div>
              </div> -->
            </div>
            <div class="btn-container mt-4">
              <button
                class="btn btn-welfare"
                type="submit"
                @click="handleSubmit"
                :disabled="notAllow"
              >
                索取福利金
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

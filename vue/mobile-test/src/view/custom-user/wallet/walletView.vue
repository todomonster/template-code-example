<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { apiRefreshPoint } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const walletData = ref({});

    const handleData = (wallet = {}) => {
      let { balance, point } = wallet;

      balance = balance ? balance.slice(0, balance.indexOf(".")) : "0";
      point = point ? point : "0";

      return {
        balance,
        point,
      };
    };

    onMounted(async () => {
      try {
        const response = await apiRefreshPoint();
        if (response.result) {
          walletData.value = handleData(response);
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    return { goto, walletData };
  },
  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="navbar-container">
      <div class="cash-container">
        <div class="image-container">
          <div class="image"><img src="@/assets/images/img_myfree.png" /></div>
        </div>
        <div class="list-container list-container-2">
          <div class="list-link list-no">
            <div class="image"><i class="icon icon-money"></i></div>
            <div class="title">錢包餘額</div>
            <div class="cash">
              超集點：{{ walletData.point }} 點
              <br />
              福利金：{{ walletData.balance }}元
            </div>
            <!-- <div class="reset"><i class="icon icon-reset"></i></div> -->
          </div>
          <!-- <a class="list-link">
                        <div class="image"><i class="icon icon-coupon"></i></div>
                        <div class="title">優惠收納箱</div>
                    </a> -->
          <a @click="goto('router', '/wallet/record')" class="list-link">
            <div class="image"><i class="icon icon-record"></i></div>
            <div class="title">交易紀錄</div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

import img_06 from "@/assets/icon/member06.svg";
// call api
import { apiGetProductList } from "@/api/myfree";

export default {
  name: "ProductList",
  setup() {
    const productList = ref([]);
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const getData = async () => {
      let response = await apiGetProductList();
      if (response.result) {
        console.log(response);
        // productList.value = response;
      }
    };

    onMounted(async () => {
      try {
        await getData();
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
      goto,
      img_06,
    };
  },

  components: {},
};
</script>

<template>
  <div class="main-content">
    <div class="main2">
      <ul class="list-group list-group-flush">
        <div class="listItem">
          {{ "商品" }}
        </div>
        <button
          class="btn btn-primary"
          type="button"
          @click="goto('router', '/product/detail')"
        >
          {{ "新增商品" }}
        </button>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member {
  margin-bottom: calc($footer-height + 15px);
  display: flex;
  flex-direction: column;

  .main {
    background-image: url("@/assets/image/member_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .mainblur {
    backdrop-filter: blur(3px);
    height: 12.875rem;
  }

  .topArea {
    .headShot {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100vw;
      height: 12.875rem;

      img {
        width: 6.625rem;
        height: 6.625rem;
        border-radius: 50%;
      }

      p {
        margin: 0.75rem auto;
        font-size: 1.25rem;
        font-weight: 700;
      }
    }
  }

  .listItem {
    border-bottom: 1px solid #e8e8e8;

    button {
      height: 50px;
      font-size: 1rem;
      font-weight: 400;
      border: none;
      color: #333333;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 2rem;
        margin-right: 0.75rem;
      }
    }
  }
}
</style>

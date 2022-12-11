<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

// call api
// import { apiGetProductList } from "@/api/myfree";

export default {
  name: "ProductList",
  setup() {
    const productList = ref({});
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const getData = async () => {
      //   let response = await apiGetProductList();
      //   if (response.result) {
      //     productList.value = response;
      //   }
    };

    const name = ["上架", "圖片", "商品名稱*", "商品描述", "價格*", "庫存*"];
    const link = ["", "", "", "", "", ""];

    onMounted(async () => {
      try {
        await getData();
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
      name,
      link,
      goto,
      productList,
    };
  },

  components: {},
};
</script>

<template>
  <div class="main-content">
    <div class="main2">
      <ul class="list-group list-group-flush">
        <div class="listItem">{{ name[0] }}</div>
        <div class="listItem">{{ name[1] }}</div>
        <div>
          {{ name[2] }}
          <button @click="goto('router', link[2])">尚未設定</button>
        </div>
        <div>
          {{ name[3] }}
          <button @click="goto('router', link[3])">尚未設定</button>
        </div>
        <div>
          {{ name[4] }}
          <button @click="goto('router', link[4])">尚未設定</button>
        </div>
        <div>
          {{ name[5] }}
          <button @click="goto('router', link[5])">尚未設定</button>
        </div>
      </ul>
      <div class="listItem">
        <button class="btn btn-primary" type="button">新增</button>
      </div>
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

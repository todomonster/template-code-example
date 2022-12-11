<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

// call api
import { apiGetProductList } from "@/api/myfree";

export default {
  name: "ProductList",
  setup() {
    const productList = ref([]);
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const getProductList = async () => {
      let response = await apiGetProductList();
      if (response.result) handleListData(response);
    };

    const handleListData = async (response) => {
      const { products } = response.data;
      console.log(products);

      // 處理空值
      if (response.total === 0) {
        productList.value = [{ content: "尚未新增商品" }];
      }

      let newData = products.map((item) => {
        item.price = `$ ${item.price}`;
        item.stock = `庫存(${item.stock})`;
        item.status = item.status ? "上架中" : "下架中";
        return item;
      });

      // 處理有值
      productList.value = productList.value.concat(newData);
      //   total.value = response.total;
      //   APIparams.value.page++;
    };

    onMounted(async () => {
      try {
        await getProductList();
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
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
      <ul
        v-for="item in productList"
        :key="item.id"
        class="list-group list-group-flush"
      >
        <div class="border my-3">
          <img :src="item.image[0]" style="width: 150px" />
          <div>{{ item.name }}</div>
          <div>{{ item.price }}</div>
          <div>{{ item.status }}</div>
          <div>{{ item.stock }}</div>
        </div>
      </ul>
      <button
        class="btn btn-primary"
        type="button"
        @click="goto('router', '/product/detail')"
      >
        {{ "新增商品" }}
      </button>
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

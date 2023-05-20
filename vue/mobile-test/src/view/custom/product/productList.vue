<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

// call api
import { apiGetProductList } from "@/api/myfree";
import NoData from "@/components/global/NoData.vue";

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

  components: { NoData },
};
</script>

<template>
  <NoData v-if="productList.length == 0" />
  <div class="main c-product">
    <section class="c-main">
      <div class="product-container">
        <div
          class="card"
          v-for="item in productList"
          :key="item.id"
          @click="
            goto('routerQuery', '/product/detail', {
              query: { mode: 'view', id: item.id },
            })
          "
        >
          <div class="card-body">
            <div class="row">
              <div class="col-left">
                <img
                  :src="item.image[0]"
                  class="card-img"
                  v-if="item.image[0]"
                  onerror="this.onerror=null; this.src='https://fakeimg.pl/110x110/?text=商品&font=noto'"
                />
                <img
                  src="https://fakeimg.pl/110x110/?text=商品&font=noto"
                  class="card-img"
                  v-if="!item.image[0]"
                />
              </div>
              <div class="col-right">
                <div class="card-title">{{ item.name }}</div>
                <div class="card-price">{{ item.price }}</div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
              <div class="card-shelf">
                <span :class="item.status === '上架中' ? 'green' : 'red'">{{
                  item.status
                }}</span>
              </div>
              <div class="card-stock">{{ item.stock }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-container">
        <button
          class="btn btn-add"
          type="button"
          @click="
            goto('routerQuery', '/product/detail', { query: { mode: 'add' } })
          "
        >
          新增商品
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.c-product {
  background-color: #eee;
}
.main {
  margin-top: $header-height;
  padding: 0rem;
}
</style>

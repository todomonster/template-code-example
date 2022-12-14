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

    const getData = async () => {};

    onMounted(async () => {
      try {
        await getData();
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
  <div class="main c-product">
    <section class="c-main">
      <div class="form-container form-container-3">
        <form>
          <div class="mb-2">
            <div class="form-check form-switch">
              <label class="form-check-label" for="SwitchCheck">上架</label>
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="SwitchCheck"
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">圖片</label>
            <div class="plus-container">
              <label class="form-file-label">
                <i class="icon icon-plus-grey"></i>
              </label>
              <input type="file" class="form-file-input" />
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >商店名稱<span class="must">必填</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商店名稱"
              value=""
            />
          </div>
          <div class="mb-2">
            <label class="form-label">商品描述</label>
            <textarea
              class="form-control"
              rows="5"
              placeholder="請輸入商品描述"
            ></textarea>
          </div>
          <div class="mb-2">
            <label class="form-label">價格<span class="must">必填</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入價格"
              value=""
            />
          </div>
          <div class="mb-2">
            <label class="form-label">庫存<span class="must">必填</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入庫存"
              value=""
            />
          </div>
        </form>
      </div>
      <div class="add-container">
        <button class="btn btn-add" type="button">新增</button>
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
  padding-top: 0.125rem;
}
</style>

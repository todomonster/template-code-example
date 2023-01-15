<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { errorHandle } from "@/utils/errorHandle";
import { apiUserGetProductList } from "@/api/myfree";
import { handleStoreProfile } from "@/utils/handleData";

export default {
  name: "StoreProduct",
  setup() {
    const { query } = useRoute();
    const id = ref(null);
    const productList = ref([]);

    const handleData = (products = []) => {
      const ans = [];
      products.forEach((product) => {
        const { id = 0, name = "", description = "", price1 = 0 } = product;
        const image = handleStoreProfile.storeImages(product.image);
        ans.push({
          id,
          name,
          description,
          price1,
          image,
        });
      });
      return ans;
    };

    onMounted(async () => {
      try {
        if (id.value === Number(query.id)) {
          return;
        }
        id.value = Number(query.id);
        const response = await apiUserGetProductList(id.value);
        if (response.result) {
          // const count = response?.data?.count
          productList.value = handleData(response?.data?.products);
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    const handleClick = (index, itemIsActive) => {
      if (!itemIsActive) {
        productList.value[index].isActive = false;
      }
      productList.value[index].isActive = !productList.value[index].isActive;
    };
    const cardBodyCss = (itemIsActive) => {
      if (itemIsActive === true) {
        return "card-body active";
      } else {
        return "card-body";
      }
    };

    return { cardBodyCss, productList, handleClick };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="navbar-container">
      <div class="product-container-2">
        <div class="row">
          <div
            class="col-6"
            v-for="(item, index) in productList"
            :key="item.id"
          >
            <div class="card" @click="handleClick(index, item.isActive)">
              <div class="card-header">
                <a class="card-link">
                  <img :src="item.image" class="card-img" />
                  <div class="card-title">{{ item.name }}</div>
                  <div class="card-price">{{ item.price1 }}</div>
                </a>
              </div>
              <div :class="cardBodyCss(item.isActive)">
                <div class="card-text">{{ item.description }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <a  class="card-link">
                                    <img src="@/assets/images/img_shop_s2.png" class="card-img">
                                    <div class="card-title">沙拉</div>
                                    <div class="card-price">$ 100</div>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="card-text">本店不動人氣NO.1、牛肝菇特有的 香氣+粒粒分明的飯粒，讓人一口接一口。</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <a  class="card-link">
                                    <img src="@/assets/images/img_shop_s3.png" class="card-img">
                                    <div class="card-title">沙拉</div>
                                    <div class="card-price">$ 100</div>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="card-text">各式各樣青菜，好吃又美味！</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <a  class="card-link">
                                    <img src="@/assets/images/img_shop_s.png" class="card-img">
                                    <div class="card-title">沙拉</div>
                                    <div class="card-price">$ 100</div>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="card-text">本店必吃NO.1前菜！</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <a  class="card-link">
                                    <img src="@/assets/images/img_shop_s2.png" class="card-img">
                                    <div class="card-title">沙拉</div>
                                    <div class="card-price">$ 100</div>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="card-text">本店不動人氣NO.1、牛肝菇特有的 香氣+粒粒分明的飯粒，讓人一口接一口。</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <a  class="card-link">
                                    <img src="@/assets/images/img_shop_s3.png" class="card-img">
                                    <div class="card-title">沙拉</div>
                                    <div class="card-price">$ 100</div>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="card-text">各式各樣青菜，好吃又美味！</div>
                            </div>
                        </div>
                    </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

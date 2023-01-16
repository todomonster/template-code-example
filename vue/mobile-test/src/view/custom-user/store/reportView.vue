<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { apiUserReportStore } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { Toast } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const { query } = useRoute();
    const form = ref(null);
    // const inputData = ref({});

    const storeName = ref("");
    const storeImages = ref("");
    const option = ref("1");
    const message = ref("");

    onMounted(async () => {
      const { name, images } = query;
      storeName.value = name;
      storeImages.value = images;
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (option.value == "0" && !message.value) {
        Toast("選擇其他時，請輸入理由");
      }
      const id = Number(query.id);
      const response = await apiUserReportStore({
        store_id: id,
        //回報種類, 0:其他 1:店家已停業 2:無法使用優惠 3:款項有爭議(必填,string),
        option: option.value,
        message: message.value,
      });
      if (response.result) {
        Toast("回報成功!")
        goto("back");
      } else {
        errorHandle(response);
      }
    };

    return { form, handleSubmit, storeName, storeImages, option, message };
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
          <div class="image">
            <img
              :src="storeImages"
              v-if="storeImages"
              onerror="this.onerror=null; this.src='https://fakeimg.pl/340x200/'"
            />
            <img
              src="https://fakeimg.pl/340x200/"
              v-if="!storeImages"
            />            
          </div>
        </div>
        <div class="item-container">
          <div class="item-title mb-2">{{ `${storeName}` }}</div>
        </div>
        <div class="form-container">
          <form ref="form">
            <div class="mb-2">
              <label class="form-label mb-2">回報</label>
              <div class="input-list">
                <div class="form-check mb-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="welfare"
                    id="welfare1"
                    v-model="option"
                    value="1"
                  />
                  <label class="form-check-label" for="welfare1"
                    >店家已停業</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="welfare"
                    id="welfare2"
                    v-model="option"
                    value="2"
                  />
                  <label class="form-check-label" for="welfare2"
                    >無法使用優惠</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="welfare"
                    id="welfare3"
                    v-model="option"
                    value="3"
                  />
                  <label class="form-check-label" for="welfare3"
                    >帳款有爭議</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="welfare"
                    id="welfare4"
                    v-model="option"
                    value="0"
                  />
                  <label class="form-check-label" for="welfare4">其他</label>
                </div>
                <div class="mb-2">
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="請輸入其他理由"
                    v-model.trim="message"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="btn-container mt-5">
              <button
                class="btn btn-welfare"
                type="submit"
                @click="handleSubmit"
              >
                我要回報
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

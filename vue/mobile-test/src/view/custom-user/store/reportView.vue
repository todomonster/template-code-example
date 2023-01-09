<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const form = ref(null);
    const inputData = ref({});
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (form.value.reportValidity()) {
        // 處理
      }
    };

    return { form, handleSubmit };
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
          <div class="image"><img src="@/assets/images/img_shop.png" /></div>
        </div>
        <div class="item-container">
          <div class="item-title mb-2">心居酒屋大連店</div>
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
                    checked
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
                  />
                  <label class="form-check-label" for="welfare4">其他</label>
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

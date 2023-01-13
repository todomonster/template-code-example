<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { query } = useRoute();
    const form = ref(null);
    const inputData = ref({});

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const id = Number(query.id);
      if (form.value.reportValidity()) {
        // 處理
      }
    };
    
    onMounted(() => {});

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
            <div class="mb-3">
              <label class="form-label mb-1">消費金額</label>
              <input
                type="text"
                class="form-control"
                placeholder="請輸入消費金額"
                value="100"
              />
            </div>
            <div class="item-container item-container-4">
              <div class="d-flex">
                <div class="col-left pb-2">超級點</div>
                <div class="col-right pb-2"><div class="orange">240</div></div>
              </div>
              <div class="d-flex border-0">
                <div class="col-left pt-0">福利金</div>
                <div class="col-right pt-0"><div class="green">0</div></div>
              </div>
              <div class="d-flex">
                <div class="col-left">超級點餘額</div>
                <div class="col-right">240</div>
              </div>
            </div>
            <div class="btn-container mt-4">
              <button
                class="btn btn-welfare"
                type="submit"
                @click="handleSubmit"
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

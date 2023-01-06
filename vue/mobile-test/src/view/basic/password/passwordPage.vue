<script>
import { ref, reactive } from "vue";
import Header from "@/components/global/header/HeaderArea.vue";
import Footer from "@/components/global/footer/FooterArea.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// call api
// import { apiPostPassword } from "@/api/api";

export default {
  setup() {
    const router = useRouter();
    const Swal = require("sweetalert2");
    const inputData = reactive({
      oldPassword: "",
      newPassword: "",
    });
    const newPassword2 = ref("");
    const msg = ref("");

    const form = ref(null);
    const save = async (e) => {
      e.preventDefault();
      if (form.value.reportValidity()) {
        if (inputData.oldPassword == inputData.newPassword) {
          Swal.fire("新密碼與舊密碼不可相同");
        } else if (inputData.newPassword != newPassword2.value) {
          Swal.fire("新密碼不相符，請重新輸入");
        } else {
          //post API
          // msg.value = await apiPostPassword(inputData);
          // if (msg.value.message) {
          //   Swal.fire("密碼錯誤，請重新輸入");
          // }
          // if (!msg.value.message) {
          //   Swal.fire("密碼已修改");
          //   router.push({ path: "/member" });
          // }
          inputData.oldPassword = "";
          inputData.newPassword = "";
          newPassword2.value = "";
        }
      }
    };
    return { inputData, save, form, newPassword2 };
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header title="變更密碼" />
  <div class="main-content">
    <form ref="form">
      <div class="mb-3">
        <label class="form-label">舊密碼<span class="star">*</span></label>
        <input
          type="password"
          class="form-control"
          placeholder="請輸入舊密碼"
          v-model="inputData.oldPassword"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">新密碼<span class="star">*</span></label>
        <input
          type="password"
          class="form-control"
          placeholder="請輸入新密碼"
          v-model="inputData.newPassword"
          pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
          title="最少6個字元，需有英文及數字"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">確認密碼<span class="star">*</span></label>
        <input
          type="password"
          class="form-control"
          placeholder="請再次輸入新密碼"
          v-model="newPassword2"
          required
        />
      </div>
      <div class="mt-4b btn-container">
        <div class="row">
          <div class="col">
            <button class="btn btn-outline-primary" type="button" @click="save">
              儲存資料
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="$router.push({ path: '/member' })"
            >
              取消返回
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
</style>

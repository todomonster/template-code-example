<script>
import { ref, onMounted } from "vue";
// import { apiPrintStoreQRcode } from "@/api/myfree"

export default {
  setup() {
    let recommenderData = ref();

    onMounted(async () => {
      try {
        // 
      } catch (error) {
        console.log(error);
      }
    });

    return { recommenderData };
  },
  components: {},
};
</script>

<template>
  <div class="recommender">
    <section class="c-main">
      <div class="list-container">
        <div class="mb-3 kind-container">
          <div class="title"><i class="fas fa-user"></i>直推</div>
        </div>
        <div class="recommender-container">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-around align-center"
            >
              <span> richard</span>
              <span class="ms-1">09xxxxxx999</span>
              <span class="ms-1">2022-10-10</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-container">
        <div class="mb-3 kind-container">
          <div class="title"><i class="fas fa-user"></i>間推</div>
        </div>
        <div class="recommender-container">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-around align-center"
            >
              <span> richard2</span>
              <span class="ms-1">09xxxxxx999</span>
              <span class="ms-1">2022-10-10</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.recommender {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
}
.addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-container {
  padding: 1rem;
}
.kind-container {
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    i {
      margin-right: 0.625rem;
      width: 2.125rem;
      height: 2.125rem;
      text-align: center;
      color: white;
      line-height: 2.125rem;
      background-color: rgba(nth($primary-color, $style), 0.75);
      border-radius: 50%;
    }
  }
}
</style>

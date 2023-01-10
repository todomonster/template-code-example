<script>
export default {
  setup() {
    return {};
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="form-container">
      <form>
        <div class="avatar-container">
          <div class="image"><img src="@/assets/images/noavatar.png" /></div>
          <div class="camera-container">
            <label class="form-file-label">
              <i class="icon icon-camera"></i>
            </label>
            <input type="file" class="form-file-input" />
          </div>
        </div>
        <div class="mobile-container">
          <div class="title">手機號碼<span>0900000000</span></div>
        </div>
        <div class="mb-2">
          <label class="form-label">暱稱</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入暱稱"
            value=""
          />
        </div>
        <div class="mb-2">
          <label class="form-label">性別</label>
          <div class="input-pill-2">
            <div class="row">
              <div class="col form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="male"
                  checked
                />
                <label class="form-check-label" for="male"
                  ><i class="icon icon-male"></i
                ></label>
              </div>
              <div class="col form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="female"
                />
                <label class="form-check-label" for="female"
                  ><i class="icon icon-female"></i
                ></label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">年齡層</label>
          <select class="form-control form-select">
            <option selected>請選擇年齡層</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="form-label">預設好康店範圍</label>
          <div class="row">
            <div class="col">
              <select class="form-control form-select">
                <option selected>請選擇縣市</option>
                <option>臺北市</option>
                <option>新北市</option>
                <option>桃園市</option>
                <option>臺中市</option>
                <option>臺南市</option>
                <option>高雄市</option>
              </select>
            </div>
            <div class="col">
              <select class="form-control form-select">
                <option selected>請選擇鄉鎮市區</option>
                <option>中區</option>
                <option>東區</option>
                <option>西區</option>
                <option>南區</option>
                <option>北區</option>
                <option>西屯區</option>
                <option>南屯區</option>
                <option>北屯區</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="form-word-2 text-center">
            請填寫完整資料才能享有myFrees優惠喔
          </div>
        </div>
        <div class="btn-container mt-5 d-flex justify-content-between">
          <button class="btn btn-skip" type="button">Skip</button>
          <button class="btn btn-next-grey" type="submit">
            <i class="icon icon-next"></i>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

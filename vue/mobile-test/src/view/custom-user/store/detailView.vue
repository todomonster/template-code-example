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
    <div class="navbar-container">
      <div class="gooddetail-container">
        <div class="image-container">
          <div class="image"><img src="@/assets/images/img_shop.png" /></div>
          <div class="row">
            <div class="col">
              <a href="javascript:void(0);" class="btn btn-link active"
                ><i class="icon icon-favorite"></i>收藏</a
              >
            </div>
            <div class="col">
              <a href="javascript:void(0);" class="btn btn-link"
                ><i class="icon icon-navigation"></i>帶路</a
              >
            </div>
          </div>
        </div>
        <div class="item-container">
          <div class="item-title">
            心居酒屋大連店<a href="info.html" class="item-link"
              ><i class="icon icon-info"></i
            ></a>
          </div>
          <div class="item-text">$$・餐廳,日式料理,定食,丼飯</div>
          <div class="d-flex">
            <div class="col-left">商店地址</div>
            <div class="col-right">台中市北屯區大連路二段101號</div>
          </div>
          <div class="d-flex">
            <div class="col-left">電話</div>
            <div class="col-right">04-22471162</div>
          </div>
          <div class="d-flex">
            <div class="col-left">營業時間</div>
            <div class="col-right">
              星期一18:00–01:00<br />
              星期二18:00–01:00<br />
              星期三18:00–01:00<br />
              星期四18:00–01:00<br />
              星期五18:00–01:00<br />
              星期六18:00–01:00<br />
              星期日18:00–01:00
            </div>
          </div>
        </div>
        <div class="btn-container mt-5">
          <button
            class="btn btn-welfare"
            type="button"
            onclick="javascript:location.href='welfare.html'"
          >
            索取福利金
          </button>
          <button
            class="btn btn-good"
            type="button"
            onclick="javascript:location.href='good.html'"
          >
            商品清單
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

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
    <div class="swiper-container ui-tab">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><span>申請紀錄</span></div>
        <div class="swiper-slide"><span>超集點</span></div>
        <div class="swiper-slide"><span>福利金</span></div>
      </div>
    </div>
    <div class="swiper-container ui-page">
      <div class="filter-containter">
        <div class="row">
          <div class="col">
            <a href="javascript:void(0);" class="filter-link active">今日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">3日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">7日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">1個月</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">3個月</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">1年</a>
          </div>
        </div>
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $246</div>
                <div class="date">2022-11-28 14:45:41</div>
              </div>
              <div class="col-right">
                <div class="green">核準</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $215</div>
                <div class="date">2022-11-28 14:45:32</div>
                <div class="note">不想給</div>
              </div>
              <div class="col-right">
                <div class="red">取消</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $354</div>
                <div class="date">2022-11-28 14:45:28</div>
              </div>
              <div class="col-right">
                <div class="black">待確認</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $425</div>
                <div class="date">2022-11-28 14:45:22</div>
                <div class="note">暱稱</div>
              </div>
              <div class="col-right">
                <div class="green">核準</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $324</div>
                <div class="date">2022-11-28 14:45:17</div>
                <div class="note">心情不好</div>
              </div>
              <div class="col-right">
                <div class="red">取消</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $205</div>
                <div class="date">2022-11-28 14:45:13</div>
              </div>
              <div class="col-right">
                <div class="green">核準</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">myfree社 福利金回饋 $109</div>
                <div class="date">2022-11-28 14:44:57</div>
                <div class="note">備註</div>
              </div>
              <div class="col-right">
                <div class="red">取消</div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div class="d-flex">
              <div class="col-left">
                <div class="title">扣除超集點17</div>
                <div class="date">2022-11-28 14:47:57</div>
              </div>
              <div class="col-right">
                <div class="red">-17</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">扣除超集點29</div>
                <div class="date">2022-11-28 14:47:49</div>
              </div>
              <div class="col-right">
                <div class="red">-29</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">扣除超集點14</div>
                <div class="date">2022-11-28 14:47:32</div>
              </div>
              <div class="col-right">
                <div class="red">-14</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">註冊發送300超級點</div>
                <div class="date">2022-11-25 09:11:09</div>
              </div>
              <div class="col-right">
                <div class="green">300</div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div class="d-flex">
              <div class="col-left">
                <div class="title">取得店家10%回饋金17</div>
                <div class="date">2022-11-28 14:47:57</div>
              </div>
              <div class="col-right">
                <div class="green">17</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">取得店家10%回饋金29</div>
                <div class="date">2022-11-28 14:47:49</div>
              </div>
              <div class="col-right">
                <div class="green">29</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-left">
                <div class="title">取得店家10%回饋金14</div>
                <div class="date">2022-11-28 14:47:32</div>
              </div>
              <div class="col-right">
                <div class="green">14</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

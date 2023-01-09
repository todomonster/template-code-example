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
      <div class="form-container form-container-4 pb-0">
        <form>
          <div class="search-container">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入關鍵字"
              value=""
            />
            <div class="btn-container">
              <button class="btn btn-search" type="submit">
                <i class="icon icon-search"></i>
              </button>
              <button
                class="btn btn-analytics collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
              >
                <i class="icon icon-analytics"></i>
              </button>
            </div>
            <div class="analytics-container collapse" id="collapse1">
              <div class="mb-3">
                <label class="form-label">搜尋範圍</label>
                <div class="row mb-3">
                  <div class="col">
                    <select class="form-control form-select">
                      <option selected>縣市</option>
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
                      <option selected>鄉鎮市區</option>
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
              <div class="mb-3">
                <label class="form-label">大分類</label>
                <div class="input-pill">
                  <div class="row">
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="kind"
                        id="kind1"
                        checked
                      />
                      <label class="form-check-label" for="kind1">食</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="kind"
                        id="kind2"
                      />
                      <label class="form-check-label" for="kind2">衣</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="kind"
                        id="kind3"
                      />
                      <label class="form-check-label" for="kind3">住</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="kind"
                        id="kind4"
                      />
                      <label class="form-check-label" for="kind4">行</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="kind"
                        id="kind4"
                      />
                      <label class="form-check-label" for="kind4">樂</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">價格範圍</label>
                <div class="input-pill">
                  <div class="row">
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="price"
                        id="price1"
                        checked
                      />
                      <label class="form-check-label" for="price1">$</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="price"
                        id="price2"
                      />
                      <label class="form-check-label" for="price2">$$</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="price"
                        id="price3"
                      />
                      <label class="form-check-label" for="price3">$$$</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="price"
                        id="price4"
                      />
                      <label class="form-check-label" for="price4">$$$$</label>
                    </div>
                    <div class="col form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="price"
                        id="price4"
                      />
                      <label class="form-check-label" for="price4">$$$$$</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="good-container pb-1">
        <div class="card">
          <div class="card-header">
            <a href="shop.html" class="card-link">
              <img src="@/assets/images/img_shop.png" class="card-img" />
            </a>
          </div>
          <div class="card-body">
            <a href="shop.html" class="card-link">
              <div class="card-title">春日山 食事処</div>
              <div class="card-text">$$・餐廳,日式料理,定食,丼飯</div>
            </a>
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
        </div>
        <div class="card">
          <div class="card-header">
            <a href="shop.html" class="card-link">
              <img src="@/assets/images/img_shop.png" class="card-img" />
            </a>
          </div>
          <div class="card-body">
            <a href="shop.html" class="card-link">
              <div class="card-title">心居酒屋大連店</div>
              <div class="card-text">$$・餐廳,日式料理,定食,丼飯</div>
            </a>
            <div class="row">
              <div class="col">
                <a href="javascript:void(0);" class="btn btn-link"
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
        </div>
      </div>
    </div>
  </section>
</template>

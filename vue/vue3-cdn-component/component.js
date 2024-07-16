const filmYoutube = {
  template: `<div class="film">
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/_sWKNKFJ9eA"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>`,
  props: ["prop"],
  data: () => ({ item: "test" }),
};
const chooseM = {
  template: `<div class="choose">
                  <div class="title" style="color: #ffffff; font-weight: bold;">目前職務類型為：</div>
                  <div class="card-group">
                      <div class="card active">
                          <div class="card-number">A</div>
                          <div class="card-title">非管理職</div>
                      </div>
                      <div class="card">
                          <div class="card-number">B</div>
                          <div class="card-title">中階主管</div>
                      </div>
                      <div class="card">
                          <div class="card-number">C</div>
                          <div class="card-title">高階主管</div>
                      </div>
                  </div>
              </div>`,
  props: ["prop"],
  data: () => ({ item: "test" }),
};

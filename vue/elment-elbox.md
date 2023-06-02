```js
 ElMessageBox.alert(
          `
     <input type="radio" id="html" name="fav_language" value="HTML">
     <label for="html">HTML</label>
     <input type="radio" id="css" name="fav_language" value="CSS">
     <label for="css">CSS</label>
     <input type="radio" id="javascript" name="fav_language" value="JavaScript">
     <label for="javascript">JavaScript</label>
     `,
          "是否變更審核狀態?",
          {
            dangerouslyUseHTMLString: true,
            inputPattern: /.{2,}/,
            inputPlaceholder: "請輸入理由(至少2個字)",
            inputErrorMessage: "至少2個字"
          }
        );

    // 元素名稱 style 文字(節點[])

    const options = [
      { label: "通過", value: 1 },
      { label: "不通過", value: 0 },
      { label: "待審核", value: "" }
    ];

    const selectOptions = options.map(option => {
      return h("option", { value: option.value }, option.label);
    });

    const vnode_ex = h(
      "select",
      { id: "fav_language", name: "fav_language" },
      selectOptions
    );
    const textarea = h("div", {}, [
      vnode_ex,
      h("br"),
      h("textarea", {
        attrs: {
          placeholder: "请输入回复内容",
          autocomplete: "off",
          rows: 2,
          id: "commentContent"
        },
        style: {
          color: "blue",
          border: "1px solid grey",
          borderRadius: "var(--el-messagebox-border-radius)"
        },
        value: "",
        on: { input: () => {} } // 這裡需要指定一個回調函數處理 input 事件
      })
    ]);
    ElMessageBox({
      title: "是否變更審核狀態?",
      message: textarea
    });

    const copyRow = JSON.parse(JSON.stringify(row));

    const statusChangeTxt =
      copyRow.IsReview == "1" ? `(通過=>待審核)` : `(待審核=>通過)`;
    const isReview = copyRow.IsReview == "1" ? 0 : 1;

    ElMessageBox.prompt(`是否變更審核狀態?${statusChangeTxt}`, "", {
      inputPattern: /.{2,}/,
      inputPlaceholder: "請輸入理由(至少2個字)",
      inputErrorMessage: "至少2個字"
    })
      .then(async ({ value }) => {
        // 刷新畫面
        const response = await apiReviewResume(copyRow.AreaId, {
          isReview,
          reason: value
        });
        // 不加延遲無法執行
        setTimeout(() => {
          if (response.result == true) {
            onSearch({});
            message(`${t("cPublic.success")}`, { type: "success" });
          } else {
            message(response.msg, { type: "error" });
          }
        }, 300);
      })
      .catch(_error => {
        // console.log(error);
      });
```

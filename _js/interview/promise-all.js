/**範例1 */
const submitUpload = async () => {
  const okArrId = [];
  const confirmImg = async (file, index) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append(apiKey, file);
      formDataObj.append("path", "xxx");

      const onUploadProgress = (progressEvent) => {
        // 重點在此
        // console.log(progressEvent);
        if (progressEvent?.progress && tableQueue.value?.[index]) {
          tableQueue.value[index].status = Math.floor(
            progressEvent.progress * 100
          );
          if (progressEvent?.progress === 1) {
            successTimes.value++;
            okArrId.push(tableQueue.value[index].id);
          }
        }
      };

      const res = await apiUploadImg(formDataObj, { onUploadProgress });
      if (res?.result) {
        message(res?.msg, { type: "success" });
        tableUploaded.value.push(res.data);
      }
    } catch (error) {
      console.log(error.message);
      tableQueue.value[index].msg = `圖片上傳失敗__${error.message}`;
      // message(`圖片上傳失敗__${error.message}`, { type: "error" });
    }
  };

  if (tableQueue.value.length === 0) {
    message("請先拖曳檔案", { type: "warning" });
    return;
  }

  hideUpload.value = true;
  // 使用Promise.all等待所有文件上傳完成
  const uploadPromises = tableQueue.value.map((item, index) =>
    confirmImg(item.file, index)
  );
  try {
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error("文件上傳失敗 ", error);
    message(`出現例外狀況__${error.message}`, { type: "error" });
  }
  // 移除上傳成功的
  tableQueue.value = tableQueue.value.filter(
    (item) => !okArrId.includes(item.id)
  );
  setTimeout(() => {
    hideUpload.value = false;
  }, 500);
};
/**範例2 */
await Promise.all(
  data.map(async (item) => {
    // call api 通知後台
    await fetch(
      `${baseUrl}/api/game/bingo/period/${item["gameBingoPeriodId"]}/draw`, // fetch(`${useRuntimeConfig().ADMIN_BINGO_DRAW_URL}`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
        body: JSON.stringify({}),
      }
    )
      .then((response) => {
        if (!response.ok) {
          //   throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((body) => {
        // Do something ...
        console.log(body);
        callBackData.push(body);
      })
      .catch((error) => {
        console.log(error);
        callBackData.push(error);
        //   throw new Error(`HTTP error! Status: ${response.status}`);
      });
  })
);

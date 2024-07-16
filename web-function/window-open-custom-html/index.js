function openNewWindow() {
  // 创建新窗口
  const windowFeatures = "left=100,top=100,width=320,height=320";
  const newWindow = window.open("", "_blank", windowFeatures);

  // 动态生成 HTML 内容
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Window</title>
<style>
body {
  font-family: Arial, sans-serif;
}
</style>
</head>
<body>
<h1>Hello, this is a new window!</h1>
<p>This content is dynamically generated.</p>
</body>
</html>
`;

  // 将 HTML 内容写入新窗口
  newWindow.document.write(htmlContent);
  newWindow.document.close();
}

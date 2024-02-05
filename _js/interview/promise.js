function fetchUrl(url, func) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // return response.text();
        return response.json();
      })
      .then((body) => {
        func(body);
        resolve(body);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

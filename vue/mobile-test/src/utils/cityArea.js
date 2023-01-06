const findAreaWithCityId = (data, cityId) => {
    if (cityId) {
      let city = JSON.parse(JSON.stringify(data));
      let targetCity = city.filter((item) => item.id === cityId);
      if (targetCity.length > 0) {
        return targetCity[0].areas;
      }
    }
    return [];
  };
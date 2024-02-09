const fetchCitiesApi = async () => {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/CitiesMorocco_List_of_Morroco_cities?keys=asciiname',
    {
      headers: {
        'X-Parse-Application-Id': 'JQP50sJNANQYdayZ8jPVkrXV73ehOZhxNDoNwe9N',
        'X-Parse-REST-API-Key': 'PX5HfpEXOkC7oVHv4GuxkBo60D75AU8g0TP2FAIc',
      },
    },
  );
  const data = await response.json();
  return data;
};

module.exports = fetchCitiesApi;

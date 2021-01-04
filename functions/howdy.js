const Axios = require("axios");
exports.handler = async function (event, context) {
  const data = await Axios.get(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/12-31-2020.csv"
  );
  return {
    statusCode: 200,
    body: JSON.stringify(data.data),
  };
};

const cheerio = require("cheerio");
const axios = require("axios");

exports.getPriceFeed = async function() {
  try {
    const siteUrl = "https://coinmarketcap.com/";

    const keys = [
      "name",
      "price",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply",
    ]

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });
    const $ = cheerio.load(data);
    elementSelector =
      "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr";

    $(elementSelector).each((parentIdx, parentElem) => {
      let keyIdx = 0
      const coinObj= {}
      
      if (parentIdx <= 18){
        $(parentElem)
          .children()
          .each((childIdx, childElem) => {
            const tdValue = $(childElem).text()
            if(tdValue.length>1){
              coinObj[keys[keyIdx]] = tdValue
              keyIdx++
            }
          })
          console.log(coinObj)
    }})
  } catch (err) {
    console.error(err);
  }
}


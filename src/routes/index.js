const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const Router = express.Router();

//const tokenGenerate = getToken();
const token = "eyJraWQiOiIyMDIwMTAyMjE4MzMiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01NTAwMDlEVEtIIiwiaWQiOiJJQk1pZC01NTAwMDlEVEtIIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiOTdlMjgxYjUtZTRkYS00M2U3LThmMWQtZjVlNzM0YThlOWE5IiwiaWRlbnRpZmllciI6IjU1MDAwOURUS0giLCJnaXZlbl9uYW1lIjoiRGllZ28gTm9yZWwiLCJmYW1pbHlfbmFtZSI6IlZlZ2EgTWVqaWEiLCJuYW1lIjoiRGllZ28gTm9yZWwgVmVnYSBNZWppYSIsImVtYWlsIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIiwic3ViIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIiwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiODkyZTM0NGNhNGIxNDdhMTg2MWNkMjhlYTEwYjBhOWYiLCJmcm96ZW4iOnRydWV9LCJpYXQiOjE2MDU3Njg3MzMsImV4cCI6MTYwNTc3MjMzMywiaXNzIjoiaHR0cHM6Ly9pYW0uYmx1ZW1peC5uZXQvaWRlbnRpdHkiLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTphcGlrZXkiLCJzY29wZSI6ImlibSBvcGVuaWQiLCJjbGllbnRfaWQiOiJkZWZhdWx0IiwiYWNyIjoxLCJhbXIiOlsicHdkIl19.ackV-TX_T4ysckBOduU3tOoXfWqFsYDe6RZsYO2omi3BqEahbowwf5x4eAylnjg9j8KOSxMQVYly1ArqOQglyi-ewAfnHRx9HbSV1IdiZzIXWYfQddWaoFf_yfYDWI-C8yIhvTnosMHBEk5QC4xxMdcCATX92JC9NOVCLDJ8xnFn_hoeRq2Gpj4IrEny357U7Ud2Pqth0oC5ykeRIlKsojixyLMJOjhM5BhnQOHzVBWYjCwhoZtFQgWHVONCbzMtshbLyPvWwsufU2kn4goOrhHpec5E-2SFHQAh-rrfiJgOSIdQQbFUdLzqhId3_FYeq6J-HoTBEYydI1MJysjKNA";


Router.get("/", (req, res) => {
  res.render("index.ejs");
});
Router.post("/", (req, res) => {
  //const usuario = req.body;
  const consultaMoroso = JSON.stringify({
    input_data: [
      {
        fields: [
          "CustomerID",
          "Age",
          "Months as a Customer",
          "Number of Products",
          "Average Balance Feed Index",
          "Personal Debt to Equity Ratio",
          "Has Bad Payment Record",
          "Marital Status",
          "Age Youngest Child",
          "Number of Workers in Household",
          "Income",
        ],
        values: [
          [
            JSON.parse(req.body.CustomerID),
            JSON.parse(req.body.Age),
            JSON.parse(req.body.MonthsCustomer),
            JSON.parse(req.body.NumberProducts),
            JSON.parse(req.body.Average),
            JSON.parse(req.body.EquityRatio),
            JSON.parse(req.body.HasBadPayment),
            req.body.MaritalStatus,
            JSON.parse(req.body.YoungestChild),
            JSON.parse(req.body.WorkersHousehold),
            JSON.parse(req.body.Income),
          ],
        ],
      },
    ],
  });

  const myHeaders = new fetch.Headers();
  myHeaders.append("authorization", `Bearer ${token}`);
  fetch(
    "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/e9e6b04b-c69c-4a11-843a-30ddfca8d844/predictions?version=2020-10-29",
    {
      method: "POST",
      headers: myHeaders,
      body: consultaMoroso,
    }
  )
    .then((res) => res.json())
    .then((json) => {
      //console.log(json)
      const valores = JSON.stringify(json);
      

      formatDataJS = JSON.parse(valores)
      const element = formatDataJS.predictions[0].values[0];
      //formatElement = JSON.parse(element);

      if (element[0] == "F") {
        res.render('noCalifica',formatDataJS)

      }else{
        res.render('califica',formatDataJS)
        console.log(element)
      }
      

      


    });
});

function getToken() {

    const APIKEY = "m_FEQp3-6dJRAN5qZc_QjxtEQHQlzXn3K9OcUvDPOAEL&grant_type=urn%3Aibm%3Aparams%3Aoauth%3Agrant-type%3Aapikey"
    const tokenHeaders = new fetch.Headers();
    //tokenHeaders.append({
       // Content-Type: "application/x-www-form-urlencoded",
        //Accept:" application/json"
   // })

    fetch("https://iam.ng.bluemix.net/identity/token",{
        method: "POST",
       // headers: {Content-Type: "application/x-www-form-urlencoded"},
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        api_key: APIKEY,

    })
    .then((res) => res.json())
    .then((json) => {
        const token = JSON.stringify(json)
        console.log(token)
    })
}
module.exports = Router;

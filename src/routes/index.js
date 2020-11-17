const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const Router = express.Router();

//const tokenGenerate = getToken();
const token = "eyJraWQiOiIyMDIwMTAyMjE4MzMiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01NTAwMDZHUTQwIiwiaWQiOiJJQk1pZC01NTAwMDZHUTQwIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiMmY2MWZhZmItNGQ1Ny00ZDI4LWFkMGEtYTBmZmViYjRjZTc5IiwiaWRlbnRpZmllciI6IjU1MDAwNkdRNDAiLCJnaXZlbl9uYW1lIjoiRGllZ28gTm9yZWwiLCJmYW1pbHlfbmFtZSI6IlZlZ2EgTWVqaWEiLCJuYW1lIjoiRGllZ28gTm9yZWwgVmVnYSBNZWppYSIsImVtYWlsIjoiZGllZ28udmVnYUB1bmFzLmVkdS5wZSIsInN1YiI6ImRpZWdvLnZlZ2FAdW5hcy5lZHUucGUiLCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiIyNmFhOTYzOTBhMTI0NWU4OWNhY2I4MzI2NDJjN2M2YyIsImZyb3plbiI6dHJ1ZX0sImlhdCI6MTYwNTU2MzA3OSwiZXhwIjoxNjA1NTY2Njc5LCJpc3MiOiJodHRwczovL2lhbS5ibHVlbWl4Lm5ldC9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.fsk0YPv4Kd9BByHVL2pO_YUEg62CCcBSFmepAr4gpMmMdbBx9j0iEdRZPvPhkYZwVIJrZR0W6sZUynuE-76Zdbbf5kDSWtjevLe9IhNfxBSDzeM3gAMyiu0ZXzvy7w5EQIPmacfc1B3quJvzKX2BjK8_dD6E6uZGDyP5gt6Nx8iM7W4ZRAYAdKcJNq-2VcHgPwIKP3nVkfe__QZLkllyfgqa8tuSCKPo6m9H-gah6Gt6WkIMenimJVnO-JAb8EhtvYwvEc0wPAAdbKoabX8LeaPqrB8XNssHSpO6ugQXhfJdPZqfLQzUpCx-qqhNHgiD1cGH8wu2PZkPd_LFoAetfg";


Router.get("/", (req, res) => {
  res.render("prediction");
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
    "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/1f9bb8db-3bfc-4b99-9cfa-92dff6945279/predictions?version=2020-11-11",
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
      console.log(valores);
      res.send(valores)
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

const express = require("express");
const app = express();
const port = 3003;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Pass to next layer of middleware
  next();
});

app.get("/api/Enums/StateTypes/", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Washington",
      description: "Washington",
    },
    {
      id: 2,
      name: "Illinois",
      description: "Illinois",
    },
    {
      id: 3,
      name: "Arizona",
      description: "Arizona",
    },
    {
      id: 4,
      name: "Colorado",
      description: "Colorado",
    },
    {
      id: 5,
      name: "Connecticut",
      description: "Connecticut",
    },
    {
      id: 6,
      name: "Delaware",
      description: "Delaware",
    },
    {
      id: 7,
      name: "Florida",
      description: "Florida",
    },
    {
      id: 8,
      name: "Indiana",
      description: "Indiana",
    },
    {
      id: 9,
      name: "Louisiana",
      description: "Louisiana",
    },
    {
      id: 10,
      name: "Maine",
      description: "Maine",
    },
    {
      id: 11,
      name: "Maryland",
      description: "Maryland",
    },
    {
      id: 12,
      name: "Massachusetts",
      description: "Massachusetts",
    },
  ]);
});

app.get("/api/Reports/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token)
  console.log(req.query["filter.filterType"] === "2");

  if (req.query["filter.filterType"] === "2") {
    //if(token !== "GOOD_TOKEN") {
    res.status(401).send({ details: { message: "Something goes wrong" } })
    //}
    // else {
    //   res.send({
    //     data: {
    //       details: [],
    //       message: "Your request was successful.",
    //     },
    //     success: true,
    //   });
    // }
    return;
  }
  res.send({
    data: {
      details: {
        data: [
          {
            grade: "0-0-0.6",
            index: 0,
            weight_pounds: 16582.8,
            weight_tonns: 8.29,
          },
          {
            grade: "0-1-0",
            index: 1,
            weight_pounds: 123.98,
            weight_tonns: 0.06,
          },
          {
            grade: "0-1-1",
            index: 2,
            weight_pounds: 24543.98,
            weight_tonns: 12.27,
          },
          {
            grade: "0-10-11",
            index: 3,
            weight_pounds: 5673.34,
            weight_tonns: 2.84,
          },
          {
            grade: "0-2-1",
            index: 4,
            weight_pounds: 47847.03,
            weight_tonns: 23.92,
          },
          {
            grade: "0-3-2",
            index: 5,
            weight_pounds: 1748.6,
            weight_tonns: 0.87,
          },
          {
            grade: "0-3-4",
            index: 6,
            weight_pounds: 172.28,
            weight_tonns: 0.09,
          },
          {
            grade: "0-4-3",
            index: 7,
            weight_pounds: 3137.4,
            weight_tonns: 1.57,
          },
          {
            grade: "1-0-0",
            index: 8,
            weight_pounds: 7760.46,
            weight_tonns: 3.88,
          },
          {
            grade: "1-1-2",
            index: 9,
            weight_pounds: 52.3,
            weight_tonns: 0.03,
          },
          {
            grade: "1-2-4",
            index: 10,
            weight_pounds: 2658.55,
            weight_tonns: 1.33,
          },
          {
            grade: "1-3-5",
            index: 11,
            weight_pounds: 7608.89,
            weight_tonns: 3.8,
          },
          {
            grade: "1-3-6",
            index: 12,
            weight_pounds: 64.03,
            weight_tonns: 0.03,
          },
          {
            grade: "1-4-2",
            index: 13,
            weight_pounds: 74153.24,
            weight_tonns: 37.08,
          },
          {
            grade: "2-1-3",
            index: 14,
            weight_pounds: 25466.88,
            weight_tonns: 12.73,
          },
          {
            grade: "2-2-4",
            index: 15,
            weight_pounds: 58197.7,
            weight_tonns: 29.1,
          },
          {
            grade: "2-2-5",
            index: 16,
            weight_pounds: 367.92,
            weight_tonns: 0.18,
          },
          {
            grade: "3-0-0",
            index: 17,
            weight_pounds: 1886.26,
            weight_tonns: 0.94,
          },
          {
            grade: "3-0-3",
            index: 18,
            weight_pounds: 7588.06,
            weight_tonns: 3.79,
          },
          {
            grade: "3-0-5",
            index: 19,
            weight_pounds: 1350.7,
            weight_tonns: 0.68,
          },
          {
            grade: "3-0-6",
            index: 20,
            weight_pounds: 3183.2,
            weight_tonns: 1.59,
          },
          {
            grade: "3-1-5",
            index: 21,
            weight_pounds: 395.84,
            weight_tonns: 0.2,
          },
          {
            grade: "4-0-1",
            index: 22,
            weight_pounds: 78079.54,
            weight_tonns: 39.04,
          },
          {
            grade: "4-0-2",
            index: 23,
            weight_pounds: 814.92,
            weight_tonns: 0.41,
          },
          {
            grade: "4-0-3",
            index: 24,
            weight_pounds: 65.4,
            weight_tonns: 0.03,
          },
          {
            grade: "5-0-2",
            index: 25,
            weight_pounds: 186.19,
            weight_tonns: 0.09,
          },
          {
            grade: null,
            index: 26,
            weight_pounds: 369709.49,
            weight_tonns: 184.84,
          },
        ],
        schema: {
          fields: [
            {
              name: "index",
              type: "integer",
            },
            {
              name: "grade",
              type: "string",
            },
            {
              name: "weight_pounds",
              type: "number",
            },
            {
              name: "weight_tonns",
              type: "number",
            },
          ],
          pandas_version: "1.4.0",
          primaryKey: ["index"],
        },
      },
      message: "Your request was successful.",
    },
    success: true,
  });
});

app.get("/api/Enums/States/", (req, res) => {
  const datas = {
    1: {
      id: 1,
      name: "Washington",
      filters: [
        {
          filterType: {
            id: 1,
            name: "ByGrade",
            description: "By Grade",
          },
          scheme: {
            row: 0,
            grade: null,
            weight: null,
          },
        },
        {
          filterType: {
            id: 2,
            name: "ByComapnyAndCity",
            description: "By company and city",
          },
          scheme: {
            row: 0,
            company: null,
            city: null,
            weight: null,
          },
        },
      ],
    },
    2: {
      id: 2,
      name: "Illinois",
      filters: [
        {
          filterType: {
            id: 7,
            name: "ByGrade",
            description: "By Grade",
          },
          scheme: {
            row: 0,
            grade: null,
            weight: null,
          },
        },
        {
          filterType: {
            id: 13,
            name: "ByComapnyAndCity",
            description: "By company and city",
          },
          scheme: {
            row: 0,
            company: null,
            city: null,
            weight: null,
          },
        },
        {
          filterType: {
            id: 9,
            name: "RANDOMINZE",
            description: "By company and city",
          },
          scheme: {
            row: 0,
            company: null,
            city: null,
            weight: null,
          },
        },
      ],
    },
  };

  res.send(datas[req.query.id || 1]);
});

app.post("/api/login", (req, res) => {
  const data = {
    data: {
      details: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MjUwOTI1NiwianRpIjoiMGNkYTY3ZDAtMDAzZi00MTY2LWEwZTEtNDM3MmRkM2U2OWUzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJtYWlsIjoia2lyeWwubGlhdm9uYXVAa2FuZGFzb2Z0LmNvbSIsImRpc3BsYXlOYW1lIjoiS2lyeWwgTGlhdm9uYXUifSwibmJmIjoxNjgyNTA5MjU2LCJleHAiOjE2ODI1OTU2NTZ9.NtoMA4SoTBs997ySz0Ml708MJA85xKg6Z82WE85BDXA",

        displayName: "Kiryl Liavonau",

        mail: "kiryl.liavonau@xxxxxx.com",

        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MjUwOTI1NiwianRpIjoiZDVmMjNmMTItMGNiNC00ZDIzLTlmMjItYmJkYjZhZGNmMzUyIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOnsibWFpbCI6ImtpcnlsLmxpYXZvbmF1QGthbmRhc29mdC5jb20iLCJkaXNwbGF5TmFtZSI6IktpcnlsIExpYXZvbmF1In0sIm5iZiI6MTY4MjUwOTI1NiwiZXhwIjoxNjgzMTE0MDU2fQ.r-ocDMKtDhPk1ziu_Ufbcty8FmOFVg09gD6KYoqJYGc",
      },

      message: "Your request was successful.",
    },

    success: true,
  };

  res.send(data);
});


app.get('/api/protected', (req, res) => {
  const data = {
    'displayName': "john doe",
    'mail': "johndoe@gmail.com",
    'accessToken': "access_token",
    'refreshToken': "refresh_token"
  }
  //res.status(401).send({})
  res.send(data);
})

app.get('/api/refresh', (req, res) => {
  const data = {
    data: {
      details: {
        accessToken: "accessToken",
        displayName: "Kiryl Liavonau",
        mail: "kiryl.liavonau@xxxxxx.com",
        refreshToken: "access_token"
      },
      message: "Your request was successful.",
    },
    success: true,
  };
  //res.status(401).send({})
  res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
// const requestAgent = require("superagent");

const app = express();

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//**** Using SuperAgent */

// let mailchimpInstance = "us20",
//   listUniqueId = "226cf91ad1",
//   mailchimpApiKey = "ea723a8af5b3fbcafc4a46bb5ef856c8-us20";

// app.post("/", function (req, res) {
//   requestAgent
//     .post(
//       "https://" +
//         mailchimpInstance +
//         ".api.mailchimp.com/3.0/lists/" +
//         listUniqueId +
//         "/members/"
//     )
//     .set("Content-Type", "application/json;charset=utf-8")
//     .set(
//       "Authorization",
//       "Basic " +
//         new Buffer.from("anystring:" + mailchimpApiKey).toString("base64")
//     )
//     .send({
//       email_address: req.body.email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: req.body.fName,
//         LNAME: req.body.lName,
//       },
//     })
//     .end(function (err, response) {
//       if (response.status < 300 || response.status === 400) {
//         res.send("Signed Up!");
//       } else {
//         res.send("Sign Up Failed :(");
//       }
//     });
// });

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/226cf91ad1";

  const options = {
    method: "POST",
    auth: "pamela:ea723a8af5b3fbcafc4a46bb5ef856c8-us20",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("server is listening right now on port 3000");
});

// curl -X POST \
//   https://server.api.mailchimp.com/3.0/lists \
//   -H 'authorization: Basic <USERNAME:PASSWORD>' \
//   -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'

// MailChimp API key ea723a8af5b3fbcafc4a46bb5ef856c8-us20

// ListID 226cf91ad1

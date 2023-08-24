const request = require('supertest')
const app = require("../../../app");
const payloadData = require("./payload.json");

const responseData = {
  data: {
    success: true
  }
};

const axios = require("axios");

const MockAdapter = require("axios-mock-adapter");

// const url = 'https://cpea-innovapost-inc-development-dn6yj4ti-devspace-cmjso57580409.cfapps.ca10.hana.ondemand.com';
const url = "/cmss_request";
const mock = new MockAdapter(axios);

beforeAll(async () => {
  process.env.CDS_ENV = "test"
  mock.reset();
});



describe("Test CMSS API", () => {
  it("Should Throw 500 error with empty payload in Service cmss request", async () => {
    // var oNoPalylodReq = {
    //   url: url,
    var oNoPaylloadReq = {
      data: undefined 
    };
    var oNoPayloadExpected = { error: "Payload is empty" };
    mock.onPost("/cmss_request").reply(() => { return [500, oNoPayloadExpected] });
    const res = await request(app).post("/cmss_request").send(oNoPaylloadReq);
    console.log("mock res", res);
    expect(res._body.data).toMatchObject(oNoPayloadExpected);
    expect(res._body.status).toBe(500);
  });


  it("should create a cmss REQUEST in POST With Success Message", async () => {
    // console.log("mockdata Payload: before test execute");

    mock.onPost("/cmss_request").reply(() => {
      return [
        200,
        {
          success: true,
        },
      ];
    });
    const res = await request(app).post("/cmss_request").send(payloadData);
    expect(res._body).toMatchObject(responseData.data);
    expect(res.statusCode).toBe(200);
  });

});

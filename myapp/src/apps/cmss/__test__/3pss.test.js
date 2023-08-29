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
const url = "/3pss_request";
const mock = new MockAdapter(axios);

beforeAll(async () => {
  process.env.CDS_ENV = "test"
  mock.reset();
});



describe("Test 3pss API", () => {


  it("should create a 3pss REQUEST in POST With Success Message", async () => {
    // console.log("mockdata Payload: before test execute");

    mock.onPost("/3pss_request").reply(() => {
      return [
        200,
        {
          success: true,
        },
      ];
    });
    const res = await request(app).post("/3pss_request").send(payloadData);
    console.log ("myres", res)
    expect(res._body).toMatchObject(responseData.data);
    
    expect(res.statusCode).toBe(200);
  });

});

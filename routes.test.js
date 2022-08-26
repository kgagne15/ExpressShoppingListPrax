process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let pickles = { itemName: "Pickles", price: 2.00 };

beforeEach(function() {
    items.length=0;
    items.push(pickles)
});

afterEach(function() {
    items.length = 0;
});

describe('GET route', function() {
    test("Get list of all items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [pickles]})
    });
    test("Get specific item that exists", async function() {
        const resp = await request(app).get('/items/Pickles');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {"itemName": "Pickles", "price": 2.00}})
    });
    test("Get request for item that doesn't exist", async function() {
        const resp = await request(app).get('/items/popsicle');
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({error: {"message": "Item not found", "status": 404}})
    })
});

describe('POST route', function() {
    test("Post new item", async function() {
        const resp = await request(app).post('/items').send({"itemName": "peanuts", "price": 3.00});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: {"itemName": "peanuts", "price": 3.00}})
    });
});

describe('PATCH route', function() {
    test("Patch existing item", async function() {
        const resp = await request(app).patch('/items/Pickles').send({"itemName": "pickles", "price": 2.50});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: {"itemName": "pickles", "price": 2.50}})
    });
    test("Patch item that doesn't exist", async function() {
        const resp = await request(app).patch('/items/Picdkles').send({"itemName": "pickles", "price": 2.50});
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({error: {"message": "Item not found", "status": 404}})
    });
});

describe('DELETE route', function() {
    test("Delete existing item", async function() {
        const resp = await request(app).delete('/items/pickles');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"message": "Deleted"})
    });
    test("Delete nonexistent item", async function() {
        const resp = await request(app).patch('/items/Picdkles')
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({error: {"message": "Item not found", "status": 404}})
    });
});


import express, { Application } from 'express';
import { Axios } from 'axios';

const app: Application = express();

//module.exports = class Router {
export class Router {

  app: any;

  constructor () {
    this.app = app;
    web3Staking = new Web3Staking();
    // console.log('Router init');
  }

  routes () {

    this.app.get('/', async function (req: any, res: any) {
      const endpoint = "<br>\
        <a href='/'>/</a><br>\
        <a href='/staking'>/staking</a><br>\
        <a href='/unStaking'>/unStaking</a><br>\
        <a href='/wallets'>/wallet/address</a><br>\
        <a href='/wallet/address'>/wallet/address</a><br>\
        <a href='/active'>/active</a><br>\
        <a href='/activate'>/activate</a><br>\
        <a href='/deActivate'>/deActivate</a><br>\
        ";
      res.send('Staking API 0.0.1<br> <h3>' + endpoint + '</h3>');
    })

    this.app.get('/staking', async function (req: any, res: any) {
// console.log(this);
// console.log(await web3Staking.getUnStakedStakingEvents());
      const events = await web3Staking.getStakedStakingEvents();
//console.log(web3Staking.getUnStakedStakingEvents());
      res.setHeader('Content-Type', 'application/json');
      res.json({
        staking: 'events',
        events,
      });
    });

    this.app.get('/unStaking', async function (req: any, res: any) {
      const events = await web3Staking.getUnStakedStakingEvents();
      res.setHeader('Content-Type', 'application/json');
      res.json({
        unStaking: 'events',
        events,
      });
    });

    this.app.get('/wallets', async function (req: any, res: any) {
      const wallets = await web3Staking.getWallets();
      const address = req.params.address;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        wallets
      });
    });

    this.app.get('/wallet/:address', async function (req: any, res: any) {
      const wallets = await web3Staking.getWallets();
      const address = req.params.address;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        wallet: 'info',
	address,
        wallets
      });
    });

    this.app.get('/active', async function (req: any, res: any) {
      const active: any = await web3Staking.active();
      res.setHeader('Content-Type', 'application/json');
      res.json({
        active,
      });
    });

    this.app.get('/activate', async function (req: any, res: any) {
      const activate = await web3Staking.activate();
      res.setHeader('Content-Type', 'application/json');
      res.json({
        activate,
      });
    });

    this.app.get('/deActivate', async function (req: any, res: any) {
      res.setHeader('Content-Type', 'application/json');
      res.json({
        active: 'status'
      });
    });

/*
    this.app.get('/', async function (req, res) {
      const endpoint = "<br>\
        <a href='/properties'>/properties</a><br>\
        <a href='/property/1'>/property/:id</a><br>\
        <a href='/bookings'>/bookings</a><br>\
        <a href='/bookings/1'>/bookings/:propertyId</a><br>\
        <a href='/booking/2'>/booking/:id</a><br>\
        <a href='/properties/owner/0x4086f4c8d405c8fD576F80a1f84b067E864F7082'>/properties/owner/:id</a><br>\
        <a href='/bookings/renter/0xE34D29abaA500dd7582f407cA01CC365ca188E90'>/bookings/renter/:id</a>\
        <a href='/bookings/renter/0xF143Ca2024898260d57bcD33E4A18eFb3A1C9E3d'>/bookings/renter/:id</a>\
        ";
      res.send('Properties API 0.0.1<br> <h3>' + endpoint + '</h3>');
    })

    this.app.get('/properties', async function (req, res) {
      let properties = await database.getProperties();
      res.setHeader('Content-Type', 'application/json');
      res.json(properties);
    })

    this.app.get('/property/:id', async function (req, res) {
      const property = await database.getProperty(req.params.id);
      res.json(property);
    })

    this.app.get('/bookings', async function (req, res) {
      const bookings = await database.getBookings();
      res.json(bookings);
    })

    this.app.get('/bookings/:propertyId', async function (req, res) {
      const bookings = await database.getBookingsForProperty(req.params.propertyId);
      res.json(bookings);
    })

    this.app.get('/booking/:id', async function (req, res) {
      const booking = await database.getBooking(req.params.id);
      res.json(booking);
    })

    // getPropertiesForOwner
    this.app.get('/properties/owner/:id', async function (req, res) {
      const properties = await database.getPropertiesForOwner(req.params.id);
      res.json(properties);
    })

    // getBookingsForRenter
    this.app.get('/bookings/renter/:id', async function (req, res) {
      const bookings = await database.getBookingsForRenter(req.params.id);
      res.json(bookings);
    })

    this.app.get('/a/:id', function (req, res) {
      console.log('uri str -> /a/' + req.params.id);
      res.send('properties /a/:id id = ' + req.params.id);
    })
*/
  }

  listen() {
    this.routes();
    const server = app.listen(8081, function () {
      const host = "localhost";
      const port = 8081;// server.address().port;
      console.log("\n\nExpress router app listening at http://%s:%s\n\n", host, port)
      console.table({
        Info: `Express router app listening`,
        URL: `http://${host}:${port}`
      })
    })
  }

}

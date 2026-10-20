import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import db from "./config/firebase.js";
import { error } from 'node:console';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyparser.json());

// Object array
const myShop = [
    {
      shopId: 100,
      shopName: "Adidas",
      shopContact: "admin.adidas@mail.com",
      shopAddress: "Dindaeng, Bangkok, 10400",
      shopOpen: true
    },
    {
      shopId: 200,
      shopName: "H&M",
      shopContact: "admin.h&m@mail.com",
      shopAddress: "Bangna, Bangkok, 10260",
      shopOpen: true
    },
    {
      shopId: 300,
      shopName: "KFC",
      shopContact: "admin.kfc@mail.com",
      shopAddress: "Mueang, Nonthaburi, 11000",
      shopOpen: true
    }
];

//http://localhost:8000/
app.get('/', (req, res) => {
    res.send('Hello, Miss Siripong Thianmanee.');
});

// http://localhost:8000/shops/200
async function getShops() {
  const result = [];
  const shopDocs = db.collection('shops_new').get();
shopDocs.forEach(doc => {
  result.push({
     id: doc.id,
     ...doc.data()
  });
});

return result;
}

// http://localhost:xxxx/api/shops
app.get('/api/shops', async(req,res) => {
   try {
    const snapshot = await db
      .collection("shops_new")
      .orderBy("shopName", "desc")
      .get();

    const shops = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(shops);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch shops",
      error: error.message,
    });
  }
});

app.get('/shops{/:shopId}', (req, res, next) => {
  //res.set('Content-type', 'application/json')
  try {
    let shid = Number(req.params.shopId);
    if(isNaN(shid)){
      getShops().then((jsonData) => {
       return res.send(jsonData);
      }
    ).catch((error) => {
    return res.send({
      message: error
    });
  })
      //res.end();
      //res.json(myShop); 
      // res.send("Please provide the specific shop ID, please try again.");
      //  throw new Error('Please provide the specific shop ID, please try again.');
    }
    const myRes = myShop.filter(
        myObj => { return (myObj.shopId === shid) }
    );

    const isEmptyArray = Array.isArray(myRes) && myRes.length === 0;
    if(isEmptyArray){
      res.send("Please provide the specific shop ID, please try again.");
      throw new Error("Shop ID not found, please try again.");
    }
    
    // let myText = '';
    // myText+= `<h1>Shop information:</h1><hr/>`;
    // myText+= `<b>Shop ID:</b> ${myRes[0].shopId}<br/>`;
    // myText+= `<b>Name:</b> ${myRes[0].shopName}<br/>`;
    // myText+= `<b>Contact:</b> ${myRes[0].shopContact}<br/>`;
    // myText+= `<b>Address:</b> ${myRes[0].shopAddress}<br/>`;
    // myText+= `<b>Shop Status:</b> ${myRes[0].shopOpen}<br/>`;
    // res.send(myText);
    res.json(myRes[0]); // {..}
  }catch (error){
    next(error);
  }
    
});

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});

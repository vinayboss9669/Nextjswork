const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '../../models/Order';
import connectDb from '../../middleware/db';

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate required fields
    if (!req.body.email || !req.body.oid || !req.body.cart || !req.body.subtotal) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Connect to database
    await connectDb();

    // Create new order
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      // paymentInfo: "pending",
      products: req.body.cart,
      address: req.body.address,
      amount: req.body.subtotal,
      // status: "pending"
    });
    await order.save();

    // Validate PayTM credentials
    if (!process.env.PAYTM_MID || !process.env.PAYTM_KEY) {
      throw new Error("PayTM credentials missing");
    }

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: process.env.PAYTM_MID,
        websiteName: "WEBSTAGING",
        orderId: req.body.oid,
        callbackUrl: `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}/api/posttransaction`,
        txnAmount: {
          value: req.body.subtotal.toString(),
          currency: "INR",
        },
        userInfo: {
          custId: req.body.email,
        },
      }
    };

    try {
      // Generate checksum
      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        process.env.PAYTM_KEY
      );

      paytmParams.head = {
        signature: checksum
      };
    } catch (checksumError) {
      console.error('Checksum Error:', checksumError);
      throw new Error('Failed to generate checksum');
    }

    const requestData = JSON.stringify(paytmParams);

    // Make request to PayTM with proper error handling
    try {
      const response = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'securegw-stage.paytm.in',
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${req.body.oid}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData.length
          }
        };

        const request = https.request(options, (response) => {
          response.setEncoding('utf8');
          let data = '';

          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            try {
              // Check if response is JSON
              if (response.headers['content-type']?.includes('application/json')) {
                const result = JSON.parse(data);
                resolve(result);
              } else {
                reject(new Error('Invalid response format from PayTM'));
              }
            } catch (err) {
              reject(new Error('Failed to parse PayTM response'));
            }
          });
        });

        request.on('error', (error) => {
          reject(error);
        });

        // Set timeout
        request.setTimeout(30000, () => {
          request.destroy();
          reject(new Error('Request timeout'));
        });

        request.write(requestData);
        request.end();
      });

      if (!response.body?.txnToken) {
        throw new Error('Transaction token not received');
      }

      return res.status(200).json({
        success: true,
        ...response,
        mid: process.env.PAYTM_MID,
        orderId: req.body.oid
      });

    } catch (requestError) {
      console.error('PayTM Request Error:', requestError);
      throw new Error('Failed to communicate with PayTM');
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: "Transaction failed",
      message: error.message
    });
  }
};

export default connectDb(handler);



/*
  This code handles pre-transaction processing for PayTM payments.
  //tempering the cart code to validate price and subtotal
  let product;
  let subtotal=0;

  for(let item of req.body.cart){
    console.log(item);
    subtotal+=item.price*item.qty;
     product=await Product.findOne({slug:item.slug});
     if(product.price!=item.price){
       return res.status(200).json({success:false, error:"Price of some items have been changed. Please try again."});
     }
    }

    if(subtotal!=req.body.subtotal){
      return res.status(200).json({success:false, error:"Subtotal amount is incorrect. Please try again."});
    }
*/
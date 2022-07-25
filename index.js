// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/* eslint-disable no-unused-vars */

// [START functions_helloworld_http]
// [START functions_helloworld_get]
const functions = require('@google-cloud/functions-framework');
// [END functions_helloworld_get]
const escapeHtml = require('escape-html');
// [END functions_helloworld_http]

// [START functions_helloworld_get]

var AWS = require('aws-sdk');

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('helloGET', (req, res) => {
  AWS.config.update({ accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SPACES_SECRET, region: "us-east-1" })
  var s3Bucket = new AWS.S3({ params: { Bucket: 'testBucket' } });
  var buf = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  let today = new Date();
  let ms = today.getMilliseconds();
  var data = {
    Key: ms.toString(),
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };
  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
      res.send(data)
    } else {
      console.log('successfully uploaded the image!');
      res.send(data)
    }
  });
});
// [END functions_helloworld_get]


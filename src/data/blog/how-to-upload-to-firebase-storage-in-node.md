---
author: Mehdi Zonjy
pubDatetime: 2016-11-13T16:32:00Z
title: "How To Upload To Firebase Storage in Node"
slug: how-to-upload-to-firebase-storage-in-node
featured: false
draft: false
tags:
  - firebase
  - javascript
  - nodejs
description: "A guide on uploading files to Firebase Storage using Node.js."
---

Hello there.

So let's say you are making a small NodeJS powered website or a demo, and you have created an upload page. If you are using services such as [Heroku](https://www.heroku.com/) or [OpenShift](https://www.openshift.com/), then you already  know you can't have a page upload files directly to your website, as these files will be removed after each PUSH you make to the live server repository. The solution is to use some file cloud storage service. One of the free options you have is [Firebase Storage](https://firebase.google.com/docs/storage/). For a demo or small website their [free plan](https://firebase.google.com/pricing/) should work fine 

At the time of writing this article, Firebase sdk for Node doesn't have support for Firebase Storage. However worry not my friend, as there is away to get your files uploaded to Firebase Storage from your Node code.

In case you didn't already know, Firebase Storage uses [Google Cloud Storage](https://cloud.google.com/storage) under the hood. It creates a free bucket there and every file you upload will end up in this bucket. What this means for us is that we can simply use the Google Cloud Storage Node SDK to upload and manage our files.

I'm going to assume that you have already created an app in Firebase console.

The steps are rather simple, they can be summered to

1.  [get a private key](#get-private-key)
2.  [install @google-cloud/storage module](#install-npm-module)
3.  [setup and call the google cloud storage api](#set-google-cloud-storage-api)

#### 1. Get a Private Key

in order to call Google Cloud Storage API, we need to get an API Key first. This is quite simple

1.  from your Firebase application console page go to Project Settings
2.  open Service Accounts tab and select Firebase Admin SDK
3.  you should find a Generate Private Key button which will download the API Key as a JSON file.
4.  copy this file to the root of your Node project

#### 2\. install @google-cloud/storage module

As I stated earlier, we will be using google cloud sdk instead of firebase.

_Note_: We are only interested in Google Cloud Stroage so there is no need to add the whole google cloud sdk ([google-cloud](https://github.com/GoogleCloudPlatform/google-cloud-node)). we will be using [@google-cloud/stroage](https://www.npmjs.com/package/@google-cloud/storage) module instead

```
npm install @google-cloud/storage --save
```

#### 3\. Setup and call google cloud storage api

In order to setup our code, we need three things.

-   **Bucket Name**: in your Firebase dashboard, navigate to Storage. you should find there a url that looks like this "gs://<your-project-id>.appspot.com". your bucket name is "<your-project-id>.appspot.com"
-   **ProjectId:** this is the <project-id> portion from the bucket name
-   **keyfilename:** this is the name of the file containing the private api key.

We now have everything we need. First setup connection to google cloud storageJavaScript

```
const keyFilename="./my-private-api-key-file.json"; //replace this with api key file
const projectId = "my-project-id-should-go-here" //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);
```

You are now ready to start managing your Firebase Storage. For example if you want to upload a file and make it public.

_note: I'm using a module called "mime" to figure out the [mime](https://www.npmjs.com/package/mime) type of the file I wish to upload._ JavaScript

```
const filePath = `./package.json`;
const uploadTo = `subfolder/package.json`;
const fileMime = mime.lookup(filePath);

bucket.upload(filePath,{
    destination:uploadTo,
    public:true,
    metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}
}, function(err, file) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});

function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}
```

as stated [Here](https://cloud.google.com/storage/docs/xml-api/reference-uris) you can create a url to the uploaded file using a format similar to what createPublicFileURL function is doing.

You can do other operations such as check if a file exists, or delete a fileJavaScript

```
const gcFile = bucket.file(uploadTo); //get a handler to the uploaded file

gcFile.exists((err,exists)=>console.log(err||exists));

gcFile.delete((err,res)=>console.log(err||res));
```

For further information regarding the api [check the documentation](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/0.4.0/storage)

### Sources

You can find a demo on GitHub [over here](https://github.com/MehdiZonjy/firebase-storage-node-upload)

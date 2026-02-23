---
author: Mehdi Zonjy
pubDatetime: 2017-03-05T16:46:00Z
title: "The Quest For a Hybrid Mobile App"
slug: the-quest-for-a-hybrid-mobile-app
featured: false
draft: false
tags:
  - mobile
  - hybrid-apps
description: "Exploring the landscape of hybrid mobile app development."
---

Every now and then I do a mobile application, and it's always desirable to have an app running on both Android and IOS. Large teams and companies can afford to have separate teams for each platform( although managing two growing code-bases is still a hassle), however for smaller teams and business it would cost too much to develop to separate apps for each platform.

I've been in a similar position (twice) where I had to build an app for both Android and IOS and I used  Cordova (Ionic Framework) in the first application, and React Native for the second. the following is supposed to be a summery of my experience which will highlight strength and weakness of each.  

## [Ionic Framework](https://ionicframework.com/)

Around two years ago I worked on an educational web app for a client using Angular. It had a lot of interactions and building it as a SPA(single page app) was the right choice. Fast forward a couple of months the client requested the web app to be converted to a mobile app targeting both IOS and Android.

After doing some research, I settled on using Ionic Framework for a couple of reasons

-   Ionic Framework already supports Android and IOS (newly released Ionic2 also supports WindowsPhone)
-   Ionic is uses Angular, and that meant I could use a good chunk of my wep app Angular code and reduce development time greatly.
-   Since i'm already a web developer using ionic means I can use my already existing web knowledge and the learning curve would be minimal
-   I don't need to write native code (Java, ObjectiveC)
-   It has a huge community with great support and there are plugins that expose most of the native API i might need  

All went well on IOS, the application was decent performance wise, The view transition animation is fluid, and generally speaking the app is pleasant. However trouble started on Android. Thanks to the old naughty Android Browser (which powers Android WebView on older Android versions < Lollipop) a lot of CSS and JS broke. Now the solution to this problem is to use [Corsswalk-Project](https://crosswalk-project.org/) , which is essentially a Chrome based webview. 

![sad](https://mzmuse.com/ckeditor/plugins/smiley/images/sad_smile.png)

Crosswalk is great, it fixed most of my problem with its magical wand except for one. Now a simple HelloWorld apk is around 30mb  (when installed it exceeds 50mb). Todays devices can handle such installation size and PlayStore allows you to upload an apk up to 100mb, but the client wanted the app to run offline without the need to download any extra data. The data was around 60-70 mb and had to bundled with the apk, which meant I exceeded the PlayStore max apk size limit. In order to ship the app we had to compress the audio and images a lot ( which sometimes led to very bad quality content) in order to reach <100mb.

Another problem I noticed on Android even with Crosswalk, on older devices the Animations were  jittery and sometimes nonexistent because the app was running on low FPS.

On Android Lollipop and higher the app didn't need Crosswalk (both CSS and JS worked fine) and was responsive, because Lollipop and higher versions ship with a WebView that's based on Chrome, which gets updated regularly via PlayStore, but sadly Android Kitkat and below still make a [good chunk of the devices on PlayStore](https://developer.android.com/about/dashboards/index.html) and can't be excluded 

## [React Native](https://facebook.github.io/react-native/)

Few months ago I started working on a mobile application targeting both Android and IOS. After my experience with Cordova I wanted to look for an alternatives and finally settled on React Native by Facebook.

-   It's fast since it doesn't use a DOM and a Webview. It displays genuine native views and the JS runs in a VM
-   It supports both Android and IOS (there is a UWP support but I haven't tried it) 
-   Easy to write unit tests for. I haven't written unit tests for the application i built ( i know i can be a noughty developer sometimes  ), but components are easily testable with [Enzyme](https://github.com/airbnb/enzyme) and there is even a [React Native Mock](https://github.com/RealOrangeOne/react-native-mock). When combined with [Redux](https://github.com/reactjs/redux) + [Redux-Saga](https://github.com/redux-saga/redux-saga), I can write simple, fast, deterministic tests without needing a device.
-   Just like Cordova a large community means alot of native functionality I might need is already exposed via plugins
-   The final APK is small. A simple Hello World app is below 10mb
-   Finally It has freaking 45k stars on [Github](https://github.com/facebook/react-native) with a fast release cycle (used to be a new version every two weeks, recently it's changed to every month)

Alas everything has pros and cons and React Native is no exception. 

-   I had difficulty getting the UI to look and feel native. Ionic1 uses an IOS theme out of the box, and Ionic2 apps look and feel similar to their native counterparts because it ships with proper themes for each platform out of the box. However on React Native you have to work on getting your application UI to feel right. It's not a big deal but it's something to keep in mind, and if you were bad at creating visual eye candy stuff (like me ), then this is a bit of a problem. There are already solutions that help with this issue such as [NativeBase](http://nativebase.io/)
-   Navigation/Routing: I found this to be the worst aspect of React Native. To start with, there are three freaking routing systems (Navigator, NavigatorIOS and NavigationExperimental) in react core right now. For someone starting out you can imagine how confusing this is. Sadly all of them are suitable only for IOS, and have no business being used on Android (If you want your App to look native). There are many alternatives supported by the community, one of the best that I found is [React Native Navigation](https://github.com/wix/react-native-navigation/). This is a native navigation system, so you will get the native feel and look on each platform. Sadly for some reason it broke debugging on my build :(. I still managed....somehow, but hopefully it will improve in the future.
-   I think React Native plugins aren't as mature as Cordova's. It is not a big deal, but I had to get my hands dirty in few situations. I needed to create a Youtube player on IOS because the plugin i found was broken ( I'm planning to share mine soon, once I clean it up for generic usage). Writing a native module to use in your React Native app isn't a big deal. After all, you are writing a simple plugin and not an entire native app, so it should be manageable.  

## [Native Script](https://www.nativescript.org/)

When doing my search I came across another competitor called NativeScript by Telerik. It uses Angular2 and Typescript. I had a couple of issues when testing it out. **Please bear in mind that I tried NativeScript many months ago and probably these issues have been fixed by now**

-   When writing my demo apps it crashed a couple of times on screen rotation, or minimizing and maximizing the app. It threw exceptions from inside NativeScript core code. I even managed to crash one of the showcases they had on PlayStore.
-   For whatever reason the app would sometimes lose part of its theme 
-   Some of the components I needed were bundled in a package that telerik sells separately (such as a decent Grid List).
-   Honestly I don't like TypeScript. Yes on the surface it seems nice as it gives you types and  error messages, But once you start coding and pulling packages from NPM that don't have typings yet, the TypeScript transpiler starts complaining about those missing type definitions, and whatever error messages related to your code get burried in the missing module definition messages. (I don't know if this is a valid argument as there is probably a solution to this issue, This probably might be just a personal preference as I just prefer using JS+Babel) 

NativeScript has an amazing feature; You never need to write native code. The whole underlying API is available via JS.

## Summary

Every solution has it's pros and cos. Cordova combined with Ionic2 is a great solution, however Android is its Achilles heel for the reasons I mentioned above. Cordova has been around for a very long time and it has matured. You'll hardly deal with any native code.

React Native is still the new kid in town, I enjoyed working with it and I will definitely use it again for any future apps. It has its downsides but I think they will slowly get better in time as more people start using it. Hell if I ever need to write an IOS only app, I might even use React Native as I hardly had any problems on this platform.

I think NativeScript are trying to do far too many things. The reason why ReactNative is stable, is because it focuses on less responsibilities. If you need a functionality not available via ReactNative or some plugin then you have to get your hands dirty with native code.  I don't know how far NativeScript has improved since I tried it, or whether the issues i faced have been fixed but for the time being I'll stick with my new favorite toy React Native.

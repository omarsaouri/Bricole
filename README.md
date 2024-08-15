This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Application Overview:

# Introduction
This document provides a comprehensive overview of our mobile application. The goal is to give a clear understanding of the app's key features and functionality, with illustrative screenshots to guide users through the various sections.

# Home Screen
Our application is designed to simplify community service requests. On the home screen, users can either log in if they already have an account or create a new one.
<img width="159" alt="image" src="https://github.com/user-attachments/assets/8fd65bc1-b9e9-4398-98cb-1c79e4c9ccd7">


# Login Process
Users can log in using their phone number and password. The interface is user-friendly, offering quick access to the personal space. Error messages are displayed in case of incorrect credentials, guiding the user to re-enter the correct information.
<img width="206" alt="image" src="https://github.com/user-attachments/assets/487d8491-8a4a-45a0-a75a-3619bda4424b">

 

# Sign-Up Process
Creating a new account is straightforward. Users enter their first name, last name, phone number, and password. Real-time validation checks the input, providing instant feedback with error messages if necessary, ensuring a smooth and error-free sign-up process.

<img width="210" alt="image" src="https://github.com/user-attachments/assets/d3d8c0b6-e7f8-4e4f-922f-cd191c2d8cd5">

 

# Finalizing Registration
After the initial sign-up, users are prompted to provide additional details like their city and preferred request difficulty level. This personalization ensures that users receive relevant requests tailored to their location and preferences.

<img width="208" alt="image" src="https://github.com/user-attachments/assets/76e0e693-cabf-4bb1-9d73-de3cb263a739">


# News Feed Section
The main page of the application is where users spend most of their time. Here, they can view and filter new requests according to their preferences. The interface is designed to be intuitive, presenting only essential information and allowing users to express interest in requests directly from the feed.

<img width="205" alt="image" src="https://github.com/user-attachments/assets/ab29a2e0-7f85-4994-99af-676a7381bfc8">


<img width="205" alt="image" src="https://github.com/user-attachments/assets/62be0949-d7bc-4bc6-988c-71589cb970d2">


 
# Creating a New Request
Users can create new requests via an easy-to-navigate form. The form includes fields to capture all necessary details. In case of errors, clear instructions and error messages help users correct their inputs, making the process efficient.

<img width="205" alt="image" src="https://github.com/user-attachments/assets/0cb2ce01-2767-4d1d-b337-312b3a643a52">

 

# Request Management Section
This section allows users to manage their existing requests. They can edit, delete, or update the status of their requests. The editing interface pre-fills the form with existing data, making it easy to update requests.

<img width="209" alt="image" src="https://github.com/user-attachments/assets/dd115f8e-e4c5-47b7-8631-549c9801fe39">

 

# Sent Requests Section
Users can view and manage their sent requests in this section. They can check the status (pending, accepted, or rejected) and perform actions like canceling or deleting requests. Accepted requests offer direct contact with the relevant user to coordinate details.

<img width="204" alt="image" src="https://github.com/user-attachments/assets/34b4fcbf-95f6-405f-9421-ef8bb12bb9bd">

<img width="204" alt="image" src="https://github.com/user-attachments/assets/aeeb2189-74ec-44e3-abf7-3b8678161ff8">


 

# Received Requests Section
In the received requests section, users can manage incoming requests, deciding whether to accept or reject offers of help. Accepting a request updates its status and notifies all involved parties, enabling them to coordinate further. Rejections also update the request status, clearly communicating the decision.

<img width="194" alt="image" src="https://github.com/user-attachments/assets/2f6adf6a-1803-445a-b5bf-a66dd6a0ada4">



# My Account Section
The account section allows users to view and manage their personal information, such as name, phone number, city, and preferred request difficulty level. This section also provides an option to log out, ensuring account security and privacy.

<img width="202" alt="image" src="https://github.com/user-attachments/assets/93dbae84-e0a5-40e9-b901-cab437be2855">


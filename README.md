# ChatMe

To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline

## Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data
-  Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## To Get Started
Install npm and expo cli:
- npm install expo-cli --global expo init

To start expo:
- npm start or expo start

To open on your physical phone, download the Expo app and scan the QR code provided in the terminal or the browser by Metro Bundler.
  
## Dependencies
- npm install react-native-gifted-chat –-save
- npm install –save firebase@7.9.0
- expo install @react-native-async-storage/async-storage
- expo install @react-natvie-community/netinfo
- expo install expo-permissions
- expo install expo-image-picker
- expo install expo-location
- expo install react-native-maps

For react-navigation:
- npm install --save react-navigation

its dependencies:
- npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

## Database
- Firestore Database

## Emulator/Simulators
Android Studio
- https://developer.android.com/studio

XCode for iOS simulators

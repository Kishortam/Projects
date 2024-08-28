# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




whatChat

whatChat made using ReactJS and FireBase.
Created application with vite packeage.
Firebase Authentication (login with email & password)
Firebase storage to store media
Firebase database to chat messages and users data

Structure: 
src => App.jsx, main.jsx, index.css
src => pages => Login, Chat & ProfileUpdate
src => components => LeftSideBar, ChatBox & RightSideBar (these components we used in Chat page)
src => assets => assets.js (it contains all assets)
src => config => firebase.js (it contains a code snippet from FireBase website and login, logout, create account & reset password functions)
src => context => AppContext.jsx (context)
src => lib => upload.js (contains code snippet from Firebase website)

Functionality:
1. Packages we used : 1. react-router-dom  2. react-toastify  3. firebase
2. Functionality includes : login page with options 1. create an account  2. Login  3. Logout  4. reset password
3. Edit Profile, Search for a user (leftSideBar)
4. send text messages, media messages
5. to test app in realtime, open app on 2 different browsers or 2 different tabs, login with 2 different users and send message to user A to user B and check if its recieved or not.

=> Create UI of Chat page includes components like Leftsidebar, chatbox & rightsidebar
=> Login page & then Edit profile page


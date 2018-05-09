// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyDwxTEzgt26QlW5kd0ysvRMx8yoEREFEfk",
    authDomain: "hostel-harmony.firebaseapp.com",
    databaseURL: "https://hostel-harmony.firebaseio.com",
    projectId: "hostel-harmony",
    storageBucket: "hostel-harmony.appspot.com",
    messagingSenderId: "416910024968"
  }
};

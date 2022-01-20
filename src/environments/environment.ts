// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'app-ecommerce-6f5ee',
    appId: '1:148403055373:web:9cd6ab3b03310512f39e44',
    storageBucket: 'app-ecommerce-6f5ee.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDoRTPjRwxv5rMfXfdwnxS_XvImMzjh588',
    authDomain: 'app-ecommerce-6f5ee.firebaseapp.com',
    messagingSenderId: '148403055373',
  },
  actionCodeSettings: {
    url: 'http://localhost:4200/profile/new',
    handleCodeInApp: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

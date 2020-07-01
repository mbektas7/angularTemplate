// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
        // rootPath : 'http://192.168.1.154:86/api/',
    //rootPath : 'http://5.189.151.105:94/api/',
    //rootPath : 'http://5.189.151.105:92/api/'
    //rootPath : 'https://personel.dogrubilgi.tech/api/'
    rootPath:'http://localhost:50795/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

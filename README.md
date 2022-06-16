![RevStar Consulting](images/revstar+react.png?raw=true "RevStar Consulting Logo")

# RevStar React template project with aws cognito integration

This project is designed to allow developers to work directly with aws cognito providing right out of the box the following flows:

- Login
- Force change Password
- Registration
- Change Password
- Forgot Password

And also work with the [serverless project setup](https://github.com/revstarconsulting/serverless-aws-nodejs-and-rds) and consume the REST APIs to the base boats app service

Architecturally, you can find the base proposal of this architecture [here](https://medium.com/geekculture/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22).

## Project structure

- `assets/:`
  - As the name suggests, all the static assets should reside here.
  - Each asset should be registered and exported from the /index.js
  - Thus, all assets will be accessible and imported from ‘/assets’
  - This can include but not limited to images, logos, vector icons, fonts, etc.
- `/components:`
  - Only shared components used across features are placed here.
  - All the components should be registered and exported from /index.js for a single access point.
  - All the components should bear named export. This will avoid any conflicts.
  - Components that consist of complex logic or redux integration can be further de-structured into “ComponentContainer.js” & “ComponentView.js” as per the “Container-View pattern”
  - **TIP**: Try to create named-exports instead of default exports for all the components. This will avoid any naming conflicts.
- `/config :`
  - All the app’s configurations are to be kept at this path.
  - This can consist of date format, default language, some master data set or anything like so.
  - `"appConfig.js"` is the most important file on this folder, here you can add any variable depending of the environment, leaving us with a single environment variable `REACT_APP_STAGE` fro witch dependents the object exported from this file
  
- `/i18n :`
  - Internationalization or multi-lingual support is achieved by the use of the “i18next” library.
  - It mainly consists of a configuration file and all the language translations in independent language.json files.
- `/navigation :`

  - ![Navigation](images/navigation.png?raw=true "Navigation")
  - As the name suggests, all the routing logic resides here.
  - Our app uses “react-router-dom” for routing implementation.
  - Mainly 2 types of routes are included, public & private, where private being the ones that require authentication.
  - `“RouterConfig.js”` will have all the routes of the application defined within at one place.
  - `“PrivateRoute.js”` is a component to add a check for user authentication for secure/private routes.
    Repo with PrivateRoute code sample.
  - `CONSTANTS.js` consists of all the constants for various available routes within our app. Reason is simply to avoid typos and easy renaming of routes when required.
  - `“/components”` directory can be added to hold all the navigation specific components like header, nav-bar, side navbar, like so.

- `/redux :`

  - ![Redux](images/0_mQW6SFhsSbpl5pDZ.png?raw=true "Redux")
    > [update Oct 02, 2021]: Redux Toolkit is the new way to implement redux.
    - ✔ A “slice” combines the actions, reducers, Thunk & evades the need of CONSTANTS.
    - ✔ A slice will be module specific and can now be placed in the “screen>module” specific path.
    - ✔ Thus, slices help you to keep separation of concerns.
    - ✔ ref: [Redux Toolkit story in-depth](https://medium.com/geekculture/redux-toolkit-rtk-in-react-js-or-react-native-application-simplify-redux-with-react-and-apis-d61bdc67377e).
    - ✔ [Redux-persist with Redux Toolkit for persisting redux store across user sessions](https://medium.com/geekculture/redux-persist-redux-toolkit-implementation-made-easy-for-react-native-and-react-js-831ee1e3f22b).

  * It holds all the redux resources at one place.
  * This includes action creators, reducers and a redux store of our app.
  * `CONSTANTS.js` has all the action types.
  * Initial state of the app is divided based on features and thus corresponding reducers and actions are modularized.
  * `“/actions”` dir consists of all the action files. Each action file includes feature based action-creators. As the name suggests, appActions will have app config based actions and userActions will have all user state related actions.
  * `“/reducer”` dir follows the same practice like actions. reducer reduces all the actions and applies corresponding changes to store. These reducers are later merged into a root-reducer redux’s combineReducers function.
  * `“/store.js”` is the central state of the application. This incorporates all the mapping between reducer, store and middle-wares if any.
  * We have a redux-thunk middleware in our app for enabling asynchronous dispatching of actions.
  * Configuration for enabling dev tools for redux is done in store.js.
  * Above files are enough for a “small to medium” sized applications.
    For a large application with tens of features, each having tens of actions, types and individual initial states, it is recommended to have corresponding action.js, reducer.js, constants in the feature specific directory. Finally, it can be combined into a single store in the same way it is done now.

- `/pages :`

  - ![Redux](images/pages.png?raw=true "Redux")

  * This is the heart of our application.
  * All the various features/screens/pages are defined here. In this case, “Home”, “Page1” and “Page2” are 3 different pages of our app.
  * Each screen consists of an “index.js” file which exports the screen’s container as default module which makes the screen available as a functional component.
  * Each page will have a “components” dir. This will hold all the components that are required by only this page.
  * As a general rule, if a module (a utility, component, etc.) is only used within another module, then I want it nested in the directory structure as shown above.

- `/services :`

  - Services are to manage all api requests. You can see them as a bridge or an adapter between the database server APIs and the view layer (pages and components) of our application.
  - It will take care of all the network calls of our app.
  - All data requests are defined here, and response data is transformed and served. In some cases it can also be saved in the redux store.
  - The pages and components may dispatch actions, read the store and update themselves based on the data changes. They may access the services directly if it doesn’t need to be added to the redux store.
  - Actions will use services for backend connectivity. Thunk is a redux middleware used to handle asynchronous actions and side-effects.
  - In our app, all firebase config and constants reside in “firebase.js”.
  - If the number/count of services increase, you can consider breaking them into individual feature based files.

- `/utils :`

  - All the utility/helper methods, validations, etc. that can be shared across our entire project are added here.
  - “dropConsole.js” is one of the utilities I have added. This is completely optional. Simple import this file as below in our app.js:
  - Intention is to override all the console statements throughout the project without ejecting the react app. Also, hiding errors and other console methods is as per preference or client requirement. The “process.env.\*\*\*” will be covered in “Environment variables” section below.

- `/__tests__ :`
  * Jest framework is default supported by react for unit testing the application.
  * All the unit test files can be placed inside “**tests**” dir alongside the corresponding .js files as recommended by react official documentation (https://create-react-app.dev/docs/running-tests).
  * It can be components, miscellaneous functions, containers, or like so.

- `/.vscode/settings.json :`
  * This is to define common settings related to your vscode editor if you are using it.
  * This way, you can have common tab-spacing, quotation marks and various other rules defined here for every project.
  * A major advantage of this is everyone in the team will have the same settings. Thus, avoiding conflicts.


## Installing / Getting started

These are the current global libraries needed to run the project.

```shell
npm install --silent --no-progress react
```

This command will install the required CLI commands `react`

### Initial Configuration

before starting to develop it is necessary to copy the file [.env.example](.env.example) into `.env` and update the following environments variables

```shell
REACT_APP_STAGE=#project app stage `local,dev,stage or prod`
```

it affects the use of [appConfig](src\config\appConfig.js)

Also you need to update all the cognito configuration values in the [appConfig](src\config\appConfig.js) file , you will have access to the ADO wiki with all the details provided by the devops ex:

Cognito User Pools
| Environment | User Pool ID        | Admin Webapp Client ID     | Admin Mobile App Client ID | Employee Mobile App Client ID |
|-------------|---------------------|----------------------------|----------------------------|-------------------------------|
| Development | us-east-1_u5b3YSQVa | 4gc5ct864u462htjm4oj396q05 | 4r8t3moqti4fsptnbl23juies4 | 3otmf8g378m1056jnhja9d4g4m    |
| Staging     | us-east-1_LHO3JgsZE | 6fa07kvtctfmd3ehtcmb57tdc4 | jm5bml8n13qlq7smo8a7jq9dm  | 6lvj9va520iu6vfj7ee703559i    |
| Production  | us-east-1_Re9eVvEFv | 7rnfucfik7n2uljroj8svu2fe3 | 2fsmtuhl25bi70ftfb3a47d2hc | 448rdtgi6rvbt00hted0j93mpa    |


Example for dev 
```js
const dev = {
    s3: {
        BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
    },
    api: {
        ENDPOINT: "https://dev.api.wecarestaffservices.com",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_u5b3YSQVa",
        APP_CLIENT_ID: "4gc5ct864u462htjm4oj396q05",
        IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
    }
};

```
## Developing

### Building

Because we are using craco to user alias in the imports the build script is the following

```shell
craco build
```

the command has all the necessary subcommands to build all the apps and place in the [build](build) directory

### Run Locally

- To run locally use

  ```shell
  npm run start
  ```

  this will run the react project and expose the server in http://localhost:3000

### Build & Deploy

- To build user

```shell
npm run predeploy:$STAGE
```

`$STAGE` could be (dev,stage,prod) and create the corresponding `REACT_APP_STAGE` for the use of [appConfig](src\config\appConfig.js)

- To deploy (optional we are using other methods is handled by the CI/CD pipeline)

```shell
npm run deploy:$STAGE
npm run postdeploy:$STAGE
```

The CI/CD pipeline will automatically trigger from the main branch and build and deploy each function automatically.

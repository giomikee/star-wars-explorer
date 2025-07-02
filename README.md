# star-wars-explorer

Powered by [Swapi](https://swapi.info/) and [Vuetify](https://vuetifyjs.com/). Implemented in Vue.js 

> *A long time ago, in a galaxy far, far away...*

## Getting started

Install project dependencies

```bash
npm install
```

To run the app locally, run this command
```bash
npm run dev
```

Run the test locally with:
```bash
npm run test
## Or in watch mode, `npm run test:watch`
```

Validate lint checks with:
```bash
npm run lint:validate
```

If any errors are detected, we can try autofixing them with:
```bash
npm run lint
```

These commands and also including the build are executed as well on pre-push, and in the project's CI on each push and pull request created.

## Technical structure

### [Services](https://github.com/giomikee/star-wars-explorer/tree/main/src/services)

Logic that calls the APIs are isolated in the services. [Check them out here](https://github.com/giomikee/star-wars-explorer/tree/main/src/services)

### [Stores](https://github.com/giomikee/star-wars-explorer/tree/main/src/stores)

Data retreived from APIs are saved in the app's stores to reduce calling the APIs within the same session. Furthermore, the stores provide actions to manipulate the stored data according to different use cases - such as sorting, filtering, etc. [Check them out here](https://github.com/giomikee/star-wars-explorer/tree/main/src/stores)

### [Utils](https://github.com/giomikee/star-wars-explorer/tree/main/src/utils)

Logic that can be shared as much as possible are extracted into utils so that a single source of truth can be achieved whenever possible. Some of these utils include filtering arrays, formatting dates, implementing pagination, and sorting. [Check them out here](https://github.com/giomikee/star-wars-explorer/tree/main/src/utils)

### Composables

Composables are also an efficient way of allowing logic to be shared across different components. They are also useful to keep components as lean as possible. This allowed the components to reduce themselves to mostly template code and isolate the logic that they need in individual composables. They are stored within `composables` folders in the project.

### Components

Components were also shared whenever possible for reusability. To allow this, they had to be stateless which means they needed to be controlled via props, events, or slots to adapt them according to different use cases. Some of the shared components are:

- [Navigation](https://github.com/giomikee/star-wars-explorer/tree/main/src/components/Navigation)
- [SearchNameInput](https://github.com/giomikee/star-wars-explorer/tree/main/src/components/SearchNameInput)
- [SortButtons](https://github.com/giomikee/star-wars-explorer/tree/main/src/components/SortButtons)
- [TableWrapper](https://github.com/giomikee/star-wars-explorer/tree/main/src/components/TableWrapper)
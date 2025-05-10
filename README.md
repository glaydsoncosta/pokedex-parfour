# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```
## Things I would improve

- Implemente a debounced pokemon search functionality maybe using lodash for the debaounced callback
- Impmement some fancy animations for the "on-demand" pokemon api data fetching
- Implement some fancy anmations on screen tranitions and elements showing in the details page
- Implement a lazy loading function to load all pokemons data, store it locally and then improve the searchbox by suggesting pokemon names, something like an autocomplete feature, this would also allow to provide a user a list of pokemons user already searched in the past

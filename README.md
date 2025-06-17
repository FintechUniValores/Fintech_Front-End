# Resgate Fácil – Front-End

Este é o front-end do aplicativo **Resgate Fácil**, desenvolvido em [React Native](https://reactnative.dev) para proporcionar uma experiência mobile moderna, fluida e segura para usuários que desejam consultar e resgatar valores a receber de instituições financeiras.

O app utiliza as APIs do backend para consulta e exibição de dados, sendo toda a comunicação feita de forma segura com o [Firebase](https://firebase.google.com/), que gerencia autenticação, armazenamento e integrações em tempo real.

---

## Principais Funcionalidades

- **Consulta de valores a receber**: Integração com as APIs do backend para buscar informações de valores disponíveis para o usuário.
- **Guia de resgate**: Passo a passo dinâmico para orientar o usuário sobre como resgatar seus valores.
- **Produtos e dicas financeiras**: Sugestões personalizadas de produtos bancários e orientações para o usuário após o resgate.
- **Perguntas frequentes (FAQ)**: Seção interativa para esclarecer dúvidas comuns sobre o processo.
- **Configurações e tema**: Alternância entre tema claro/escuro e gerenciamento de sessão.

---

## Arquitetura

- **React Native**: Framework principal para desenvolvimento mobile multiplataforma.
- **APIs Backend**: Toda a lógica de negócio, autenticação e dados é fornecida por APIs REST hospedadas e gerenciadas pelo backend.
- **Firebase**: Utilizado pelo backend para autenticação, armazenamento de dados e notificações.
- **AsyncStorage**: Gerenciamento local de sessão do usuário.

---

## Como funciona a comunicação com o backend?

O app utiliza um sistema de sessão único para cada usuário, armazenando um `sessionId` localmente. Todas as requisições para as APIs do backend incluem esse identificador, garantindo rastreabilidade e segurança. O backend, por sua vez, utiliza o Firebase para autenticação, persistência e gerenciamento dos dados do usuário.

---

## Como rodar o projeto

Siga as instruções abaixo para instalar as dependências, rodar o Metro bundler e executar o app em seu emulador ou dispositivo físico.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# 📱 Kwickly Customer Mobile App

Welcome to the **Kwickly Customer Mobile App**! This is the 5th and final component of the Kwickly micro-frontend ecosystem. 

Designed for iOS and Android smartphones, this application allows your customers to browse the restaurant menu, manage their "Pro Meal" wallet balance, and seamlessly redeem meals in-store using dynamically generated QR codes.

## ✨ Key Features
- **Dynamic QR Generation:** Converts the customer's secure JWT into a scannable, high-resolution QR code (`WalletScreen`). This QR code is scanned by the `KwicklyPosApp` at the restaurant counter to authorize meal deductions.
- **Live Menu Sync:** Pulls the restaurant's live product catalogue directly from the `kwickly-api` backend.
- **Robust Authentication:** Features a secure Login/Registration "Auth Gate". Unauthenticated users cannot access the main bottom tabs. Authentication state and JWTs are persisted to disk using `@react-native-async-storage/async-storage`.
- **Premium UI/UX:** Built with a classic Bottom Tab Navigator and styled using **NativeWind** (TailwindCSS v4 for React Native) to ensure a beautiful, native, and responsive customer experience.

## 🛠️ Tech Stack
- **Framework:** React Native CLI (Bare Workflow) v0.86.0
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** NativeWind (TailwindCSS)
- **Navigation:** React Navigation (Bottom Tabs & Native Stack)
- **API Client:** Axios (with automatic token injection interceptors)
- **Hardware Integrations:** `react-native-qrcode-svg`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (`sudo gem install cocoapods`)

### Installation

1. **Install NPM dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS Pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

Before running the mobile app, ensure your `kwickly-api` server is running locally on port `5000`. If you are testing on an Android Emulator, you may need to update the `API_URL` in `src/services/api.ts` from `localhost` to your computer's local IP address (e.g., `10.0.2.2`).

**Start the Metro Bundler:**
```bash
npm start
```

**Run on iOS:**
```bash
npm run ios
```

**Run on Android:**
```bash
npm run android
```

## 🧩 The Kwickly Ecosystem
This project is part of a 5-piece micro-frontend architecture:
1. `kwickly-api` (Node.js/Express Backend)
2. `kwickly-admin-web` (React Admin Dashboard)
3. `kwickly-client` (Next.js Consumer Website)
4. `KwicklyPosApp` (React Native Tablet App for Staff)
5. **`KwicklyMobileApp`** (This Repository - Customer App)

## 📄 License
This project is proprietary and confidential.

# Kwickly Customer Mobile App - Context & Progress

## 📱 Project Overview
The **Kwickly Customer Mobile App** is a consumer-facing mobile application designed for both iOS and Android. It allows customers to browse the restaurant menu, purchase meals, manage their "Pro Meal" subscriptions via a Wallet, and generate dynamic QR codes to redeem meals in-store at the Kwickly POS terminal.

This app is the 5th and final component of the Kwickly micro-frontend ecosystem, communicating directly with the central `kwickly-api`.

## 🛠 Tech Stack
- **Framework:** React Native CLI (Bare Workflow)
- **Language:** TypeScript
- **State Management:** Zustand (Global stores & async data caching)
- **Styling:** NativeWind (Tailwind CSS for React Native v4)
- **Navigation:** React Navigation (Bottom Tabs)
- **API Client:** Axios (with seamless JWT injection & interceptors)
- **Hardware Integration:** `react-native-qrcode-svg` for dynamic QR token generation.

---

## 🚀 Implementation Progress

### Phase 1: Scaffolding & Core Architecture (✅ COMPLETED)
- [x] Initialize React Native CLI project (`KwicklyMobileApp`).
- [x] Configure NativeWind and TailwindCSS.
- [x] Set up React Navigation with a Bottom Tab layout (Home, Menu, Wallet, Profile).
- [x] **Home UI:** Featured meals and quick re-order layout.
- [x] **Menu UI:** Browse categories and items.
- [x] **Wallet UI:** View balances and display the Dynamic QR Code for POS scanning.
- [x] **Profile UI:** Order history and settings.
- [x] Verify strict TypeScript compilation with 0 errors.

### Phase 2: Live API Integration & Authentication (✅ COMPLETED)
- [x] Connect Axios client to the live `kwickly-api` server.
- [x] Implement JWT-based login/registration flows.
- [x] Fetch live menu items and categories from the backend.
- [x] Fetch live wallet balance and generate secure QR tokens.

### Phase 3: Automated Testing (⏳ PENDING)
- [ ] Install `jest` and `@testing-library/react-native`.
- [ ] Write unit tests for JWT Storage and Auth Gate logic.
- [ ] Verify test suite passes with 0 failures.

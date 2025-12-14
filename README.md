# KrishiLink - Farmer's Growth & Connection Platform

A modern React-based web application connecting farmers directly with buyers. Built with React, Vite, Tailwind CSS, and Firebase Authentication.

## 🌾 Features

- **User Authentication**: Email/Password and Google Sign-in via Firebase
- **Crop Listings**: Browse, search, and filter available crops
- **Crop Management**: Add, view, and delete your crop listings
- **Interest System**: Express interest in crops and manage buyer inquiries
- **Profile Management**: Update user profile information
- **Responsive Design**: Fully responsive across all devices
- **Protected Routes**: Secure pages requiring authentication

## 📁 Project Structure

```
src/
├── components/
│   ├── crops/           # Crop-related components
│   │   ├── CropCard.jsx
│   │   ├── InterestForm.jsx
│   │   └── InterestTable.jsx
│   ├── shared/          # Shared layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/              # Reusable UI components
│       ├── EmptyState.jsx
│       ├── ErrorMessage.jsx
│       ├── LoadingSpinner.jsx
│       └── SectionTitle.jsx
├── firebase/
│   └── firebase.config.js
├── hooks/
│   └── useAuth.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── AddCrop.jsx
│   ├── AllCrops.jsx
│   ├── CropDetails.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MyInterests.jsx
│   ├── MyPosts.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   └── Register.jsx
├── providers/
│   └── AuthProvider.jsx
├── routes/
│   ├── PrivateRoute.jsx
│   └── router.jsx
├── services/
│   └── api.js
├── index.css
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KrishiLink-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📄 Pages

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page with featured crops |
| `/crops` | AllCrops | Public | Browse all available crops |
| `/crops/:id` | CropDetails | Private | View crop details and submit interest |
| `/add-crop` | AddCrop | Private | Add a new crop listing |
| `/my-posts` | MyPosts | Private | Manage your crop listings |
| `/my-interests` | MyInterests | Private | View submitted interests |
| `/profile` | Profile | Private | User profile management |
| `/login` | Login | Public | User login |
| `/register` | Register | Public | User registration |
| `*` | NotFound | Public | 404 error page |

## 🔌 API Endpoints (Expected Backend)

### Crops
- `GET /crops` - Get all crops
- `GET /crops/:id` - Get single crop
- `POST /crops` - Create new crop
- `DELETE /crops/:id` - Delete crop
- `GET /crops/user/:email` - Get crops by user

### Interests
- `POST /interests` - Submit interest
- `GET /interests/crop/:cropId` - Get interests for a crop
- `GET /interests/user/:email` - Get user's interests
- `GET /interests/check/:cropId/:email` - Check if interest exists
- `PATCH /interests/:id` - Update interest status

## 🛠️ Technologies

- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router DOM** - Routing
- **Firebase** - Authentication
- **Axios** - HTTP Client
- **React Icons** - Icons
- **React Hot Toast** - Notifications

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

Made with 💚 for farmers of Bangladesh

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

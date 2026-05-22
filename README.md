# Steganos Core Client

A modern frontend client for secure image steganography, built with Next.js 15, React 19, TypeScript, Zustand, React Query, and Web Crypto APIs.

This application provides a user interface for encoding and decoding hidden messages inside images while supporting encrypted payload workflows and authenticated API communication.

---

## Overview

Steganos Core Client acts as the frontend interface for the Steganos ecosystem. The application communicates with a backend steganography engine through REST APIs and provides:

- Secure message encoding into images
- Message extraction and decoding
- Optional encryption workflows
- Authentication and session handling
- File upload management
- Automatic token refresh handling
- Blob-based image downloads
- Typed API integration using TypeScript

---

## Core Technology Stack

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| Next.js 15      | App framework             |
| React 19        | UI rendering              |
| TypeScript      | Type safety               |
| Zustand         | Lightweight global state  |
| React Query     | Async state management    |
| Axios           | HTTP client               |
| Zod             | Validation schemas        |
| React Hook Form | Form management           |
| Tailwind CSS    | Styling                   |
| Web Crypto API  | Encryption and decryption |

---

## Project Structure

```txt
app/                  -> App Router pages
api/                  -> API abstraction layer
components/           -> Shared UI components
hook/                 -> Custom React hooks
providers/            -> Global providers
schema/               -> Zod validation schemas
store/                -> Zustand stores
types/                -> Shared TypeScript types
utils/                -> Utilities and crypto helpers
utils/call-api/       -> Axios instance configuration
utils/interceptors/   -> Request/response interceptors
utils/crypto/         -> Encryption utilities
```

---

## Authentication Architecture

Authentication is managed using:

- Zustand global store
- Axios request interceptors
- Automatic access token refresh
- Route protection logic

### Request Flow

1. User logs in
2. Access token is stored in Zustand
3. Axios request interceptor injects Bearer token
4. Protected requests are authenticated automatically
5. 401 responses trigger refresh flow
6. Failed refresh redirects to login

---

## API Layer

The application uses a centralized API abstraction:

```ts
CallApi<T>(url, method, responseType, payload);
```

Features include:

- Generic typing
- Automatic error normalization
- Dynamic content-type handling
- Blob support
- Credential handling
- Global interceptors

---

## Steganography Workflow

### Encoding Flow

1. User uploads image
2. Message payload is prepared
3. Optional encryption occurs
4. Payload is sent to backend
5. Backend returns encoded image blob
6. Blob URL is generated locally
7. User downloads encoded image

### Decoding Flow

1. User uploads encoded image
2. Image is sent to backend
3. Backend extracts payload
4. Optional decryption occurs
5. Message is displayed to user

---

## Encryption System

The project uses browser-native cryptography through the Web Crypto API.

### Encryption Details

| Mechanism       | Usage                   |
| --------------- | ----------------------- |
| AES-GCM         | Symmetric encryption    |
| PBKDF2          | Key derivation          |
| Random IV       | Nonce generation        |
| Salt            | Key strengthening       |
| Base64 Encoding | Transport-safe payloads |

Generated encrypted payloads contain:

```json
{
  "iv": "...",
  "salt": "...",
  "ciphertext": "..."
}
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## Installation

```bash
git clone https://github.com/DivineDomokuma10/steganos_core_client.git

cd steganos_core_client

npm install
```

---

## Running the Project

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## Important Hooks

### `useStegImage`

Manages:

- Blob URL generation
- Image metadata
- Cleanup of object URLs
- Download handling

### React Query Hooks

Used for:

- API mutation management
- Request caching
- Async states
- Retry handling

---

## Security Features

- AES-GCM encryption
- Token-based authentication
- Automatic token refresh
- Secure blob handling
- Typed request validation
- Route protection
- Environment validation

---

## Deployment

The project is optimized for deployment on:

- Vercel
- Render
- Netlify
- Docker-based platforms

Recommended deployment setup:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
```

---

<!-- ## Development Notes

The project follows a modular architecture:

- Clear separation of concerns
- Strong typing
- Feature-based organization
- Reusable hooks
- Centralized API logic
- Maintainable crypto utilities

---

## Future Improvements

Potential improvements include:

- Persistent authentication
- Offline support
- Multi-format steganography
- Streaming uploads
- Advanced encryption profiles
- Audit logging
- Compression before encoding

--- -->

## Repository

GitHub Repository:

https://github.com/DivineDomokuma10/steganos_core_client

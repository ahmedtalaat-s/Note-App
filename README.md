# 📘 Notes-App

repo: https://your-fav-notes-app.netlify.app/signin

**Notes-App** is a responsive note-taking application built with **Angular** and integrated with **Firebase Authentication**.  
It allows users to manage their personal notes (create, read, update, and delete) with custom colors and stores the data securely per user.

[![Screenshot-2025-05-09-130604.png](https://i.postimg.cc/sDt8bNRj/Screenshot-2025-05-09-130604.png)](https://postimg.cc/CzsmqJ1X)

---

## 🔍 Overview

After signing up or signing in, each user can access their personalized dashboard to:

- 📝 Create notes with a selected background color.
- ✏️ Edit existing notes.
- 🗑️ Delete notes.
- 🔐 Notes are securely stored per user using `localStorage` and Firebase Firestore.
- 📂 Upload profile images using **Cloudinary** integration.
- 🔄 All tasks (notes) are synced across devices through **Firestore** (secured by user's ID token).

[![Notes.png](https://i.postimg.cc/66DxN3rx/Notes.png)](https://postimg.cc/14cjGy7v)

---

## 🚀 Features

- 🔒 **Firebase Authentication**

  - Sign Up using **Email & Password**.
  - Sign In securely with **Email & Password**.
  - Each user has a private session managed with **Firebase ID Token**.

- 🖼️ **Image Upload (Profile Picture)**

  - Upload user profile images through **Cloudinary**.
  - Images are stored externally and linked to the user profile.

- 📚 **Cloud Firestore Integration**

  - Create, Update, Delete, and Get **Tasks/Notes** for each user.
  - Data is structured and stored in **collections** per note.
  - All Firestore API calls are protected using the authenticated user’s **ID token** to ensure security and prevent unauthorized access.

- 🎨 **Colorful Notes**

  - Users can pick custom background colors for their notes for better organization.

- 📱 **Responsive Design**

  - Built with **Bootstrap 5** to ensure a smooth experience on desktop, tablet, and mobile devices.

- 🌐 **Deployed**
  - Hosted and live on **Netlify** for instant access.

---

## 🧰 Tech Stack

| Technology          | Description                                 |
| ------------------- | ------------------------------------------- |
| **Angular 18**      | Frontend framework                          |
| **Bootstrap 5**     | UI styling & responsive design              |
| **Firebase Auth**   | User authentication & session management    |
| **Cloud Firestore** | Tasks (notes) database per user             |
| **Cloudinary**      | Image storage & upload for user profiles    |
| **localStorage**    | Client-side caching scoped per user session |

---

## 🔄 How It Works (Flow)

Here’s a simplified flow of the Notes-App 🔥

1. **🔐 User Sign Up / Sign In**

   - User signs up or signs in using **Firebase Authentication**.
   - Firebase returns a secure **ID Token** for that session.

2. **🖼️ Upload Profile Picture (Optional)**

   - User can upload a profile image.
   - Image gets uploaded to **Cloudinary** and returns a **secure image URL**.
   - This URL is saved in the user profile in Firebase.

3. **📝 Create / Get / Update / Delete Notes**

   - When user creates or edits notes:
     - Angular app sends **HTTP requests** to Firestore REST API.
     - Each request includes the user’s **ID Token** for security.
   - Notes are saved in Firestore with fields like:
     ```json
     {
       "content": "This is a note",
       "color": "#ffcc00",
       "userId": "<USER_ID>",
       "timestamp": "<DATE>"
     }
     ```

4. **📚 Retrieve User Notes**

   - On dashboard load, app fetches only notes belonging to the logged-in user using their `userId`.
   - Only authenticated users can read/write their own notes (secured with Firestore rules).

5. **🔄 Sync & Persist**
   - Notes are synced across all devices (thanks to Firestore).
   - Also cached locally using `localStorage` scoped by user session.

---

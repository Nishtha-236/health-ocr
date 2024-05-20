import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAJS_OlnfCi0xXOH9bBWVz4sgHay2bYEI",
    authDomain: "health-ocr-e6295.firebaseapp.com",
    projectId: "health-ocr-e6295",
    storageBucket: "health-ocr-e6295.appspot.com",
    messagingSenderId: "426977157998",
    appId: "1:426977157998:web:fd1c74e244cce580b8977f"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
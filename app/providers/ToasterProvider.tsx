"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return <Toaster />;
}

// we need to wrap "<Toaster />" with "<ToasterProvider />" because the toaster uses useEffect and other react client side stuff,
//  so in order to use it anywhere in our app we need to wrap it with a provider that is in a "use client"

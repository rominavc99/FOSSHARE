import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // ✅ Login con Google
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid profile email",
    onSuccess: async (tokenResponse) => {
      console.log("Access token:", tokenResponse.access_token);

      try {
        const response = await fetch(`${apiUrl}/api/auth/social/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: tokenResponse.access_token,
            provider: "google",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Login error:", errorData);
          alert("Ocurrió un error al iniciar sesión con Google.");
          return;
        }

        const data = await response.json();
        console.log("Autenticado con éxito:", data);
        navigate("/home");
      } catch (error) {
        console.error("Network error:", error);
      }
    },
    onError: () => {
      alert("Error durante el login con Google");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full space-y-6 p-8 bg-[#1B1D27] rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Ingresa con:</p>
          <button
            onClick={() => googleLogin()}
            className="w-full py-2 bg-white text-white rounded-md font-semibold shadow hover:bg-gray-100 transition-colors"
          >
            Google
          </button>
        </div>

      </div>
    </div>
  );
}

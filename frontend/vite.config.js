import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
})

// 
// In a Vite configuration file, the proxy option is used to set up a proxy server to handle requests to 
// a specific path or set of paths. 
// This is particularly useful in development environments to avoid issues like Cross-Origin Resource 
// Sharing (CORS) and to simplify the interaction with backend APIs. Let's break down the provided proxy configuration:
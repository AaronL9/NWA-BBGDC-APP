module.exports = {
  expo: {
    name: "client",
    slug: "client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
      ],
      package: "com.neigborhoodwatch.client",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-image-picker",
        {
          cameraPermission:
            "The app needs access to your camera in order to take a photo",
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Neigborhood Watch to use your location.",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "001d6f8d-a735-4c8b-a14a-0383303edf3d",
      },
    },
  },
};

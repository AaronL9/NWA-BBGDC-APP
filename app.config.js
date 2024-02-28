module.exports = {
  expo: {
    name: "client",
    slug: "client",
    version: "1.0.2",
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
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_API_KEY,
        },
      },
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
      "react-native-compressor",
    ],
    extra: {
      eas: {
        projectId: "001d6f8d-a735-4c8b-a14a-0383303edf3d",
      },
    },
  },
};

import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchLocation({ setCoords }) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        setCoords({ lat, lng });
      }}
      query={{
        key: "AIzaSyBLZ48lDMSumdQ_8ZsYkA7QU-j7tJAdKOE",
        language: "en",
        components: "country:ph",
        location: `${16.07456350863775},${120.34090831875801}`,
        radius: 1800,
      }}
      styles={{
        container: {
          flex: 0,
          position: "absolute",
          width: "100%",
          zIndex: 1,
          paddingHorizontal: 4,
          paddingVertical: 12,
          alignItems: "center",
          right: "auto",
          left: "auto",
        },
        listView: {
          backgroundColor: "#f5f5f5",
          borderRadius: 15,
          padding: 15,
        },
        textInputContainer: {
          backgroundColor: "white",
          alignSelf: "center",
          backgroundColor: "transparent",
          paddingHorizontal: 3,
        },
        textInput: {
          backgroundColor: "#f5f5f5",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
        },
        row: { backgroundColor: "transparent" },
        loader: { backgroundColor: "black" },
        poweredContainer: { backgroundColor: "transparent" },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    marginTop: 50,
  },
});

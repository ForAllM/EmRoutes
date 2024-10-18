import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import MapView, { Marker, Polyline } from "react-native-maps";
import Alert from "../../assets/icons/alert.svg";
import Avatar from "../../assets/icons/avatar.svg";

const LoadingBar = ({ progress }) => (
  <View style={{ height: 4, backgroundColor: "#E5E7EB", marginBottom: 16 }}>
    <View
      style={{
        height: "100%",
        width: `${progress}%`,
        backgroundColor: "#DC143C",
      }}
    />
  </View>
);

const BlinkingButton = ({ onPress }) => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <TouchableOpacity onPress={onPress}>
        <Alert width={200} height={200} />
      </TouchableOpacity>
    </Animated.View>
  );
};
const EmergencyButton = ({ onPress, isLoading }) => (
  <View style={{ alignItems: "center", marginTop: 40 }}>
    <Text
      style={{
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
      }}
    >
      Having an emergency?
    </Text>
    <Text style={{ fontSize: 18, color: "#4B5563", marginBottom: 24 }}>
      Press the button below
    </Text>
    {isLoading ? (
      <BlinkingButton onPress={onPress} />
    ) : (
      <TouchableOpacity onPress={onPress}>
        <Alert width={200} height={200} />
      </TouchableOpacity>
    )}
    {isLoading && (
      <Text style={{ fontSize: 16, color: "#4B5563", marginTop: 16 }}>
        Configuring setup...
      </Text>
    )}
  </View>
);

const MapComponent = ({ origin, destination, showPath }) => (
  <MapView
    style={{ height: 300, marginBottom: 16 }}
    initialRegion={{
      ...origin,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }}
    urlTemplate="https://a.tile.openstreetmap.org/12/2048/1024.png"
  >
    <Marker coordinate={origin} title="Your Location" />
    <Marker coordinate={destination} title="SRI RAM HOSPITAL" />
    {showPath && (
      <Polyline
        coordinates={[origin, destination]}
        strokeWidth={2}
        strokeColor="rgba(220, 20, 60, 0.6)"
        lineDashPattern={[5, 5]}
      />
    )}
  </MapView>
);
const EmergencyDetails = ({ stage }) => (
  <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16 }}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
      }}
    >
      Emergency Details
    </Text>
    {stage === "searching" && (
      <Text style={{ fontSize: 16, color: "#4B5563" }}>
        Searching for the nearest hospital...
      </Text>
    )}
    {stage === "found" && (
      <>
        <Text style={{ fontSize: 16, color: "#4B5563" }}>
          Nearest Hospital: SRI RAM HOSPITAL
        </Text>
        <Text style={{ fontSize: 16, color: "#4B5563", marginTop: 8 }}>
          Ambulance is on the way...
        </Text>
      </>
    )}
    {stage === "reached" && (
      <>
        <Text style={{ fontSize: 16, color: "#4B5563" }}>
          Ambulance has reached your location.
        </Text>
        <Text style={{ fontSize: 16, color: "#4B5563", marginTop: 8 }}>
          Preparing to transport to SRI RAM HOSPITAL.
        </Text>
      </>
    )}
    {stage === "returning" && (
      <>
        <Text style={{ fontSize: 16, color: "#4B5563" }}>
          Transporting to SRI RAM HOSPITAL.
        </Text>
        <Text style={{ fontSize: 16, color: "#4B5563", marginTop: 8 }}>
          Estimated arrival time: 10 minutes
        </Text>
      </>
    )}
  </View>
);

const PatientConditionUpdate = ({ condition, setCondition }) => (
  <View
    style={{
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
    }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
      }}
    >
      Patient Condition Update
    </Text>
    <Text style={{ fontSize: 16, color: "#4B5563", marginBottom: 8 }}>
      Current condition: {condition}
    </Text>
    <Text style={{ fontSize: 16, color: "#4B5563", marginBottom: 8 }}>
      Update condition:
    </Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {["Stable", "Critical", "Improving"].map((status) => (
        <TouchableOpacity
          key={status}
          onPress={() => setCondition(status)}
          style={{
            backgroundColor: condition === status ? "#DC143C" : "#E5E7EB",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: condition === status ? "white" : "#4B5563",
              fontWeight: "bold",
            }}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const Home = () => {
  const [stage, setStage] = useState("initial");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [patientCondition, setPatientCondition] = useState("Stable");

  const origin = { latitude: 25.2590734, longitude: 87.0395847 };
  const destination = { latitude: 25.2519072, longitude: 87.0189557 };

  const handleEmergency = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStage("searching");
      setProgress(0);
    }, 1500);
  };

  const handleGoBack = () => {
    // if (stage === "searching") {
    //   setStage("initial");
    // } else if (stage === "found") {
    //   setStage("searching");
    // } else if (stage === "reached") {
    //   setStage("found");
    // } else if (stage === "returning") {
    //   setStage("reached");
    // }
    setStage("initial");
  };

  useEffect(() => {
    let interval;
    if (stage === "searching") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("found");
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    } else if (stage === "found") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("reached");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else if (stage === "reached") {
      setTimeout(() => {
        setStage("returning");
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 20 }}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View>
                <Text style={{ fontSize: 16, color: "#4B5563" }}>
                  {stage === "initial" ? "Welcome Back," : "Patient:"}
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937" }}
                >
                  {stage === "initial" ? "Vikas Sharma" : "Vipul Singh"}
                </Text>
              </View>
              <Avatar width={60} height={60} />
            </View>

            {stage === "initial" && (
              <EmergencyButton
                onPress={handleEmergency}
                isLoading={isLoading}
              />
            )}

            {stage !== "initial" && (
              <>
                <MapComponent
                  origin={origin}
                  destination={destination}
                  showPath={stage !== "searching"}
                />
                <LoadingBar progress={progress} />
                <EmergencyDetails stage={stage} />
                {stage === "returning" && (
                  <PatientConditionUpdate
                    condition={patientCondition}
                    setCondition={setPatientCondition}
                  />
                )}
                <TouchableOpacity
                  onPress={handleGoBack}
                  style={{
                    backgroundColor: "#DC143C",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 16,
                  }}
                  // onPress={() => setStage("initial")}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

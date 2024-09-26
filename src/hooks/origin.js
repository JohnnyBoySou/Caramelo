import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "@origin";

async function getOrigin() {
  try {
    const preferences = JSON.parse(await AsyncStorage.getItem(key)) || {};
    return preferences;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return [];
  }
}

async function editOrigin(updatedPreferences) {
  try {
    const preferences = { ...getOrigin(), ...updatedPreferences };
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error editing preferences:", error);
    return false;
  }
}

async function createOrigin(preferences) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error creating preference:", error);
    return false;
  }
}

export { getOrigin, editOrigin, createOrigin };









































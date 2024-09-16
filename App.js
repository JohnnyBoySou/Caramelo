import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, LogBox, useColorScheme, } from 'react-native';
import Router from './src/router';
import { StatusBar } from 'expo-status-bar';
import light from '@theme/light';
import dark from '@theme/dark';

preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);


  const theme = useColorScheme();
  const selectTheme = theme === 'light' ? light : dark;

  useEffect(() => {
    LogBox.ignoreAllLogs(true);

    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Font_Light: require('./assets/fonts/Alexandria-Light.ttf'),
          Font_Regular: require('./assets/fonts/Alexandria-Regular.ttf'),
          Font_Medium: require('./assets/fonts/Alexandria-Medium.ttf'),
          Font_SemiBold: require('./assets/fonts/Alexandria-SemiBold.ttf'),
          Font_Bold: require('./assets/fonts/Alexandria-Bold.ttf'),
          Font_Black: require('./assets/fonts/Alexandria-Black.ttf'),
        });
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={selectTheme}>
        <StatusBar translucent animated={true} />
        <Router />
      </ThemeProvider>
    </View>
  );
}

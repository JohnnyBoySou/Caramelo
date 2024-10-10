import React from 'react';
//ROUTER
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
const Stack = createStackNavigator();

import { Button, Column, Image, } from '@theme/global';
//STACK SCREEN
import OnboardingScreen from '@screens/auth/onboarding';
import AsyncStaticScreen from '@screens/auth/async';

//AUTH
import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';
import ConfirmEmail from '@screens/auth/confirmation';

//TABS SCREEN
import AboutScreen from '@screens/tabs/about';
import AboutGalleryScreen from '@screens/tabs/about/gallery';
import HomeScreen from '@screens/tabs/home';

//BLOG
import BlogScreen from '@screens/tabs/blog';
import BlogSearchScreen from './screens/tabs/blog/search';
import BlogSingleScreen from '@screens/tabs/blog/single';
//ABOUT

//DONATE
import DonateTypeScreen from '@screens/donate/type';
import DonateValueScreen from '@screens/donate';
import DonatePaymentScreen from '@screens/donate/payment';
import DonateSuccessScreen from '@screens/donate/success';
//ACCOUNT
import AccountScreen from '@screens/tabs/account';
import AccountEditScreen from '@screens/tabs/account/edit';

//HISTORY
import HistoryScreen from '@screens/history';
import HistorySingleScreen from '@screens/history/single';

//NOTA FISCAL
import NotafiscalScreen from '@screens/notafiscal'
import NotafiscalSuccessScreen from './screens/notafiscal/success';
import NotafiscalErrorScreen from './screens/notafiscal/error';

import AnonimoNotaScreen from './screens/anonimo';
import AnonimoNotaSuccessScreen from './screens/anonimo/success';
import AnonimoNotaErrorScreen from './screens/anonimo/error';
//GERAL
import FAQScreen from '@screens/tabs/account/faq';
import PrivacidadeScreen from '@screens/auth/privacidade';
import WebViewScreen from '@screens/auth/webview';
//ICONS
import { HeartHandshake, Home, UserRound } from 'lucide-react-native';

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Async'>

        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Async" component={AsyncStaticScreen} options={{ ...TransitionPresets.RevealFromBottomAndroid, }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Tabs" component={Tabs} options={{ ...TransitionPresets.SlideFromRightIOS, backBehavior: 'none', }} />

        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true, }}>
          <Stack.Screen name="Privacidade" component={PrivacidadeScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
          <Stack.Screen name="WebView" component={WebViewScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
          <Stack.Screen name="AccountEdit" component={AccountEditScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        </Stack.Group>
        <Stack.Screen name="FAQ" component={FAQScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />

        <Stack.Screen name="History" component={HistoryScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true, }}>
          <Stack.Screen name="HistorySingle" component={HistorySingleScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        </Stack.Group>

        <Stack.Screen name="AnonimoNota" component={AnonimoNotaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AnonimoNotaSuccess" component={AnonimoNotaSuccessScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        <Stack.Screen name="AnonimoNotaError" component={AnonimoNotaErrorScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />

        <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="NotafiscalSuccess" component={NotafiscalSuccessScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        <Stack.Screen name="NotafiscalError" component={NotafiscalErrorScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />

        <Stack.Screen name="DonateType" component={DonateTypeScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DonatePayment" component={DonatePaymentScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DonateSuccess" component={DonateSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="BlogSearch" component={BlogSearchScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        <Stack.Screen name="BlogSingle" component={BlogSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="AboutGallery" component={AboutGalleryScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        backBehavior: 'none',
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5F101C',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#5F101C',
          position: 'absolute',
          bottom: 20, left: 20, right: 20,
          borderRadius: 100,
          height: 84,
          paddingBottom: 0,
          borderTopWidth: 0,
          borderTopColor: '#5F101C',
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Column style={{ backgroundColor: routeName == 'Home' ? "#EBB000" : '#5F101C', width: 72, height: 72, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
            <Home size={size} color={color} />
          </Column>
        ),
      }} />
      <Tab.Screen name="Blog" component={BlogScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Column style={{ backgroundColor: routeName == 'Blog' ? "#EBB000" : '#5F101C', width: 72, height: 72, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
            <Image source={routeName == 'Blog' ? require('@imgs/tabbar_active.png') : require('@imgs/tabbar.png')} style={{ width: 32, height: 32, objectFit: 'contain', }} />
          </Column>
        ),
      }} />
      <Tab.Screen name="About" component={AboutScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Column style={{ backgroundColor: routeName == 'About' ? "#EBB000" : '#5F101C', width: 72, height: 72, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
            <HeartHandshake size={size} color={color} />
          </Column>
        ),
      }} />

      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Column style={{ backgroundColor: routeName == 'Account' ? "#EBB000" : '#5F101C', width: 72, height: 72, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
            <UserRound size={size} color={color} />
          </Column>),
      }} />
    </Tab.Navigator>
  )
}

/*
 Transitions só substituir 
    ModalSlideFromBottomIOS
    SlideFromRightIOS
    SlideFromRightIOS
    FadeFromBottomAndroid 
    RevealFromBottomAndroid
    ScaleFromCenterAndroid 
    DefaultTransition 
    ModalTransition


*/
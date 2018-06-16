import React from 'react';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { iOSColors } from 'react-native-typography';

import Main from './app/views/main';
import VocabList from './app/views/vocab-list';
import Assessment from './app/views/assessment';
import Feedback from './app/views/feedback';
import About from './app/views/about';

import tracker from './app/utils/tracker';

if (!__DEV__) {
  console.log = () => {};
}

const AppTab = TabNavigator({
  home: {
    screen: StackNavigator({
      main: { screen: Main },
      'vocab-list': { screen: VocabList },
      assessment: { screen: Assessment },
    }, {
      swipeEnabled: false,
      animationEnabled: true,
      navigationOptions: {
        headerStyle: {
          backgroundColor: iOSColors.tealBlue,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }),
  },
  about: {
    screen: StackNavigator({
      about: { screen: About },
      feedback: { screen: Feedback },
    }, {
      swipeEnabled: false,
      animationEnabled: true,
      navigationOptions: {
        headerStyle: {
          backgroundColor: iOSColors.tealBlue,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }),
  },
}, {
  tabBarOptions: {
    activeTintColor: iOSColors.tealBlue,
    inactiveTintColor: iOSColors.black,
    // showIcon and pressColor are for Android
    showIcon: true,
    pressColor: '#E0E0E0',
    labelStyle: {
      fontSize: 10,
      paddingBottom: 2,
    },
    indicatorStyle: {
      backgroundColor: iOSColors.tealBlue,
    },
    style: {
      backgroundColor: 'white',
    },
  },
  tabBarPosition: 'bottom',

  navigationOptions: {
    headerStyle: {
      backgroundColor: iOSColors.tealBlue,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

console.ignoredYellowBox = [
  'NetInfo\'s "change" event is deprecated. Listen to the "connectionChange" event instead.',
  'Warning: Can only update a mounted or mounting component.',
  'Each ViewPager child must be a <View>. Was ScrollView',
  'Sending `tts-start` with no listeners registered.',
  'Sending `tts-progress` with no listeners registered.',
  'Sending `tts-finish` with no listeners registered.',
  'Sending `tts-cancel` with no listeners registered.',
];

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default () => (
  <AppTab
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState);
      const prevScreen = getCurrentRouteName(prevState);

      if (prevScreen !== currentScreen) {
        console.log(currentScreen);
        tracker.view(currentScreen);
      }
    }}
  />
);

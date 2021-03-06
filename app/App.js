import React from 'react';

import { Platform, Text, ToastAndroid, YellowBox } from 'react-native';

import { iOSColors } from 'react-native-typography';
import {
  createBottomTabNavigator,
  createStackNavigator,
  // createMaterialTopTabNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';

import About from './views/about';
import Assessment from './views/lessons/assessment';
import AssessmentListening from './views/lessons/assessment-listening';
import AssessmentMC from './views/lessons/assessment-mc';
import Feedback from './views/feedback';
import Kana from './views/kana';
import KanaAssessment from './views/kana/assessment';
import Lessons from './views/lessons';
import ReadAll from './views/lessons/read-all';
import Search from './views/search';
import Today from './views/today';
import VocabList from './views/lessons/vocab-list';

import tracker from './utils/tracker';
import I18n from './utils/i18n';

if (!__DEV__) {
  console.log = () => {};
}

Tts.getInitStatus().then(
  () => {
    Tts.setDefaultRate(0.4);
    Tts.setDucking(true);

    if (!I18n.isJaVoiceSupport && Platform.OS === 'android') {
      setTimeout(() => {
        ToastAndroid.show(I18n.t('app.common.tts_required'), ToastAndroid.LONG);
      }, 5000);
    }
  },
  err => {
    ToastAndroid.show(I18n.t('app.common.tts_required'), ToastAndroid.LONG);
    if (err.code === 'no_engine') {
      try {
        Tts.requestInstallEngine();
      } catch (e) {
        console.log('Cannot requestInstallEngine');
      }
    }
  }
);

const navigationOptions = {
  headerStyle: {
    backgroundColor: iOSColors.tealBlue,
    // borderBottomWidth: 0,
  },
  headerTintColor: iOSColors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const todayNavigator = createStackNavigator(
  {
    today: Today,
    'vocab-feedback': Feedback,
  },
  {
    navigationOptions,
  }
);

const kanaNavigator = createStackNavigator(
  {
    kana: Kana,
    'kana-assessment': KanaAssessment,
  },
  {
    navigationOptions,
  }
);

const lessonNavigator = createStackNavigator(
  {
    lessons: Lessons,
    'vocab-list': VocabList,
    assessment: Assessment,
    'assessment-mc': AssessmentMC,
    'assessment-listening': AssessmentListening,
    'read-all': ReadAll,
    'vocab-feedback': Feedback,
  },
  {
    navigationOptions,
  }
);

const searchNavigator = createStackNavigator(
  {
    search: Search,
  },
  {
    navigationOptions,
  }
);

const aboutNavigator = createStackNavigator(
  {
    about: About,
    feedback: Feedback,
  },
  {
    navigationOptions,
  }
);

const AppTab = createBottomTabNavigator(
  {
    today: todayNavigator,
    kana: kanaNavigator,
    lessons: lessonNavigator,
    search: searchNavigator,
    about: aboutNavigator,
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarLabel: I18n.t(`app.${routeName}.title`),
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName;
          let size = 20;
          if (routeName === 'today') {
            iconName = 'ios-clipboard';
            size = 19;
          } else if (routeName === 'kana') {
            return (
              <Text
                style={{
                  fontWeight: '100',
                  fontSize: 15,
                  color: focused ? tintColor : iOSColors.black,
                }}
              >
                {'あ'}
              </Text>
            );
          } else if (routeName === 'lessons') {
            iconName = 'ios-list';
            size = 22;
          } else if (routeName === 'search') {
            iconName = 'ios-search';
          } else if (routeName === 'about') {
            iconName = 'ios-chatboxes';
          }

          return <Ionicons name={iconName} size={size} color={tintColor} />;
        },
      };
    },
    tabBarOptions: {
      activeTintColor: iOSColors.tealBlue,
      inactiveTintColor: iOSColors.black,
      labelStyle: {
        fontSize: 10,
        paddingBottom: 2,
        paddingTop: 0,
      },
      // showIcon, pressColor, style and indicatorStyle are for Android
      // (createMaterialTopTabNavigator)
      showIcon: true,
      pressColor: '#E0E0E0',
      style: {
        backgroundColor: 'white',
      },
      indicatorStyle: {
        ...Platform.select({
          ios: {
            backgroundColor: iOSColors.white,
          },
          android: {
            backgroundColor: iOSColors.tealBlue,
          },
        }),
      },
    },
    tabBarPosition: 'bottom',
  }
);

YellowBox.ignoreWarnings = [
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

      console.log('prevScreen', prevScreen, 'currentScreen', currentScreen);
      if (prevScreen !== currentScreen) {
        // pause tts if changing from read-all view to others
        if (prevScreen === 'read-all') {
          Tts.pause();
        }

        tracker.view(currentScreen);
      }
    }}
  />
);

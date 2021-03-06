import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert, FlatList, Platform, StyleSheet, View } from 'react-native';

import { iOSColors } from 'react-native-typography';
import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from 'react-native-simple-store';

import AdMob from '../../elements/admob';
import VocabItem from '../../elements/vocab-item';

import { items as vocabularies } from '../../utils/items';
import I18n from '../../utils/i18n';
import tracker from '../../utils/tracker';

import { config } from '../../config';

const advert = firebase
  .admob()
  .interstitial(config.admob[`japanese-${Platform.OS}-popup`]);

const { AdRequest } = firebase.admob;
const request = new AdRequest();
request
  .addKeyword('study')
  .addKeyword('japanese')
  .addKeyword('travel');

advert.loadAd(request.build());

advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  navText: {
    paddingHorizontal: 8,
    color: 'white',
    fontSize: 18,
  },
});

type Props = {};
export default class VocabList extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: I18n.t('app.common.lesson_no', { lesson_no: params.item }),
      headerBackTitle: null,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          item: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    vocabs: [],
    isPremium: false,
  };

  async componentDidMount() {
    const {
      navigation: {
        state: {
          params: { item },
        },
      },
    } = this.props;

    store.get('isPremium').then(isPremium => {
      this.setState({ isPremium });
      this.props.navigation.setParams({ isPremium });

      setTimeout(() => {
        if (
          !isPremium &&
          advert.isLoaded() &&
          item > 2 &&
          Math.random() < 0.6
        ) {
          advert.show();
          tracker.logEvent('app-action-vocab-list-popup');
        }
      }, 3000);
    });

    this.getVocabs();
  }

  getVocabs = () => {
    const {
      navigation: {
        state: {
          params: { item },
        },
      },
    } = this.props;

    this.setState({ vocabs: vocabularies[item].data });
  };

  gotoLockFeature = lockFeature => {
    // lockFeature: assessment-listening, assessment-mc, read-all
    if (
      ['assessment-listening', 'assessment-mc', 'read-all'].indexOf(
        lockFeature
      ) === -1
    ) {
      return false;
    }

    const {
      navigation,
      navigation: {
        state: {
          params: { item },
        },
      },
    } = this.props;

    const { isPremium } = this.state;

    if (isPremium || item <= 3) {
      navigation.navigate(lockFeature, { lesson: item });
      tracker.logEvent(`user-action-goto-${lockFeature}`, {
        lesson: `${item}`,
      });
    } else {
      tracker.logEvent(`app-action-${lockFeature}-premium-required`, {
        lesson: `${item}`,
      });

      Alert.alert(
        I18n.t('app.read-all.premium-required-title'),
        I18n.t('app.read-all.premium-required-description'),
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
              tracker.logEvent(`user-action-${lockFeature}-premium`, {
                lesson: `${item}`,
                interest: false,
              });
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('about');
              tracker.logEvent(`user-action-${lockFeature}-premium`, {
                lesson: `${item}`,
                interest: true,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  gotoAssessment = () => {
    const {
      navigation,
      navigation: {
        state: {
          params: { item },
        },
      },
    } = this.props;
    navigation.navigate('assessment', { lesson: item });
    tracker.logEvent('user-action-goto-assessment', {
      lesson: `${item}`,
    });
  };

  render() {
    const {
      navigation: {
        state: {
          params: { item: lesson },
        },
      },
    } = this.props;

    const { isPremium, vocabs } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={vocabs}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={({ item, index }) => (
            <VocabItem index={index} item={item} lesson={lesson} />
          )}
        />

        <ActionButton
          buttonColor="#2196F3"
          offsetX={15}
          offsetY={isPremium ? 30 : 52}
          spacing={18}
        >
          {Platform.OS === 'ios' && (
            <ActionButton.Item
              size={42}
              buttonColor="#9B59B6"
              title={I18n.t('app.vocab-list.listening')}
              onPress={() => this.gotoLockFeature('assessment-listening')}
            >
              <Ionicons name="ios-headset" size={16} color={iOSColors.yellow} />
            </ActionButton.Item>
          )}
          <ActionButton.Item
            size={42}
            buttonColor="#9B59B6"
            title={I18n.t('app.vocab-list.quiz')}
            onPress={() => this.gotoLockFeature('assessment-mc')}
          >
            <Ionicons name="ios-list-box" size={16} color={iOSColors.yellow} />
          </ActionButton.Item>
          {Platform.OS === 'ios' && (
            <ActionButton.Item
              size={42}
              buttonColor="#3498DB"
              title={I18n.t('app.vocab-list.read-all')}
              onPress={() => this.gotoLockFeature('read-all')}
            >
              <Ionicons name="ios-play" size={16} color={iOSColors.yellow} />
            </ActionButton.Item>
          )}
          <ActionButton.Item
            size={42}
            buttonColor="#1ABC9C"
            title={I18n.t('app.vocab-list.learn')}
            onPress={this.gotoAssessment}
          >
            <Ionicons name="ios-school" size={16} color={iOSColors.white} />
          </ActionButton.Item>
        </ActionButton>

        {!isPremium && (
          <AdMob
            unitId={config.admob[`japanese-${Platform.OS}-vocab-list-banner`]}
          />
        )}
      </View>
    );
  }
}

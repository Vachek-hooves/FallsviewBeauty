import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import {toggleBackgroundMusic} from './setupPlayer';
import {MelodyTab} from '../ui/tabIcons';

const SoundControl = () => {
  const [offState, setOffState] = useState(false);
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;
//   console.log(offState);

  const handleToggleSound = async () => {
    await toggleBackgroundMusic();
    setOffState(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleSound}>
        {offState ? (
          <MelodyTab isPlay={offState} />
        ) : (
          <MelodyTab isPlay={offState} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SoundControl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const ArticleTab = ({focused}) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
      <Image
        source={require('../../../assets/icon/tabMenu/articleTab.png')}
        style={styles.icon}
      />
    </View>
  );
};

export default ArticleTab;

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedContainer: {
    backgroundColor: '#98FB98', // Pale Green
  },
  icon: {
    width: 60,
    height: 60,
  },
});

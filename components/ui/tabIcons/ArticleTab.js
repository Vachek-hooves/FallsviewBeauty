import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ArticleTab = () => {
  return (
    <Image
      source={require('../../../assets/icon/tabMenu/articleTab.png')}
      style={{width: 45, height: 45}}
    />
  );
};

export default ArticleTab;

const styles = StyleSheet.create({});

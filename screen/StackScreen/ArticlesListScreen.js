import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Articles} from '../../data/ArticleData';
import {Color} from '../../constant/color';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {TabLayout} from '../../components/layout';
import {ReturnIcon} from '../../components/ui/icons';

const ArticlesListScreen = () => {
  const navigation = useNavigation();

  const renderArticleCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArticleDetail', {article: item})}>
      <BlurView style={styles.cardBlur} blurType="light" blurAmount={10}>
        <Image source={{uri: item.imageUrl}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <TabLayout blur={300}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Articles</Text>
        <FlatList
          data={Articles}
          renderItem={renderArticleCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <View style={{height: 50}}></View>
      </View>
      <ReturnIcon />
    </TabLayout>
  );
};

export default ArticlesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    height: 200,
  },
  cardBlur: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
  },
});

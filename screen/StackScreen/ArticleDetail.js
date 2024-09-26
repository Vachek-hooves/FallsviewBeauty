import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {Color} from '../../constant/color';
import {useRoute} from '@react-navigation/native';
import {ReturnIcon} from '../../components/ui/icons';

const ArticleDetail = () => {
  const route = useRoute();
  const {article} = route.params;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{uri: article.imageUrl}} style={styles.image}>
        <View style={{position: 'absolute', top: '90%', right: 20}}>
          <ReturnIcon />
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>{article.author}</Text>
        <Text style={styles.date}>{article.date}</Text>
        <View style={styles.tagsContainer}>
          {article.tags.map((tag, index) => (
            <View key={index} style={styles.tagBox}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.content}>{article.content}</Text>
      </View>
    </ScrollView>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    backgroundColor: Color.blue + 70,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tagBox: {
    backgroundColor: Color.blue,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tag: {
    color: '#fff',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

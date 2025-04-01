import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';

// Sample data with both images and videos
const media = [
  { id: 1, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/wedding.jpg' } },
  { id: 2, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/rocks.jpg' } },
  { id: 3, type: 'video', source: { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' } },
  { id: 4, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/paris.jpg' } },
  { id: 5, type: 'video', source: { uri: 'https://www.w3schools.com/html/movie.mp4' } },
  { id: 6, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/nature.jpg' } },
  { id: 7, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/mist.jpg' } },
  { id: 8, type: 'video', source: { uri: 'https://www.w3schools.com/html/movie.mp4' } },
  { id: 9, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/ocean.jpg' } },
  { id: 10, type: 'image', source: { uri: 'https://www.w3schools.com/w3images/underwater.jpg' } },
];

const SearchGrid = () => {
  const [columns, setColumns] = useState(2); // Default to two columns

  const handleLayoutChange = (cols) => {
    setColumns(cols);
  };

  const renderMedia = () => {
    const rows = [];
    let row = [];

    for (let i = 0; i < media.length; i++) {
      row.push(
        <View key={media[i].id} style={[styles.column, { flex: 1 / columns }]}>
          {media[i].type === 'image' ? (
            <Image source={media[i].source} style={styles.image} />
          ) : (
            <Video
              source={media[i].source}
              style={styles.video}
              resizeMode="cover"
              repeat={true} // To loop the video
              muted={true}
            />
          )}
        </View>
      );

      if (row.length === columns) {
        rows.push(<View key={`row-${i}`} style={styles.row}>{row}</View>);
        row = [];
      }
    }

    if (row.length > 0) {
      rows.push(<View key={`row-last`} style={styles.row}>{row}</View>);
    }

    return rows;
  };

  return (
    <>
    <ScrollView style={styles.container}>
      {renderMedia()}
    </ScrollView>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    paddingHorizontal: 3,
    marginBottom: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default SearchGrid;

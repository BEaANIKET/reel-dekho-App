import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useEffect, useRef} from 'react';

const SkeletonPostCard = () => {
  // Animation for the shimmer effect
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a looping animation for the shimmer effect
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ).start();
    };

    startShimmerAnimation();
    return () => shimmerValue.stopAnimation();
  }, []);

  // Create the shimmer gradient effect
  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  // Shared shimmer element style
  const getShimmerStyle = () => {
    return {
      backgroundColor: '#E0E0E0',
      overflow: 'hidden',
      position: 'relative',
    };
  };

  const ShimmerEffect = ({style}) => (
    <View style={[getShimmerStyle(), style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{translateX: shimmerTranslate}],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with profile pic and username */}
      <View style={styles.header}>
        <ShimmerEffect style={styles.profilePic} />
        <View style={styles.usernameContainer}>
          <ShimmerEffect style={styles.username} />
          <ShimmerEffect style={styles.location} />
        </View>
      </View>

      {/* Content/image area */}
      <ShimmerEffect style={styles.content} />

      {/* Action buttons */}
      <View style={styles.actions}>
        <ShimmerEffect style={styles.actionButton} />
        <ShimmerEffect style={styles.actionButton} />
        <ShimmerEffect style={styles.actionButton} />
        <View style={styles.spacer} />
        <ShimmerEffect style={styles.actionButton} />
      </View>

      {/* Like count */}
      <ShimmerEffect style={styles.likeCount} />

      {/* Caption */}
      <View style={styles.captionContainer}>
        <ShimmerEffect style={styles.caption} />
        <ShimmerEffect style={styles.captionShort} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  usernameContainer: {
    marginLeft: 12,
  },
  username: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  location: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  spacer: {
    flex: 1,
  },
  likeCount: {
    width: 80,
    height: 14,
    borderRadius: 4,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  captionContainer: {
    paddingHorizontal: 12,
  },
  caption: {
    width: '90%',
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },
  captionShort: {
    width: '60%',
    height: 14,
    borderRadius: 4,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
    backgroundColor: 'white',
    width: 100,
    height: '100%',
    transform: [{skewX: '-10deg'}],
  },
});

export default SkeletonPostCard;

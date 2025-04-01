import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Animated, Easing, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentModal = ({ isVisible, onClose }) => {
  const [comments, setComments] = useState([
    { id: '1', username: 'John Doe', comment: 'This is a comment', date: '2025-02-06', isOwn: true },
    { id: '2', username: 'Jane Smith', comment: 'Another comment here', date: '2025-02-06', isOwn: false },
    { id: '3', username: 'Alex', comment: 'Great post!', date: '2025-02-06', isOwn: false },
    { id: '4', username: 'Sara', comment: 'Thanks for sharing!', date: '2025-02-06', isOwn: true },
    { id: '5', username: 'Mike', comment: 'Interesting read!', date: '2025-02-06', isOwn: false },
  ]);
  const [newComment, setNewComment] = useState('');

  const slideAnim = new Animated.Value(0);

  useEffect(() => {
    if (isVisible) {
      // Animate modal in from bottom
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate modal out when closing
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        { id: Date.now().toString(), username: 'New User', comment: newComment, date: '2025-02-06', isOwn: true },
        ...comments, // New comment added at the top
      ]);
      setNewComment('');
    }
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy' }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
        {item.isOwn && (
          <TouchableOpacity onPress={() => deleteComment(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <Modal transparent={true} visible={isVisible} animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* Scrollable comments */}
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            style={styles.commentList}
            contentContainerStyle={styles.commentListContainer}
          />

          {/* Comment input section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={addComment} style={styles.addCommentButton}>
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: '70%', // Increase modal height to ensure enough space for scrolling
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end', // Allow comment list to take available space
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#333',
  },
  commentList: {
    flex: 1,
    marginBottom: 60, // Add space for input and button
  },
  commentListContainer: {
    paddingBottom: 20, // Space for input and button
  },
  commentContainer: {
    marginBottom: 15,
    flexDirection: 'column',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align username and delete button horizontally
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    flex: 1, // Allow the username to take available space
  },
  comment: {
    marginVertical: 5,
    paddingLeft: 50,
  },
  date: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteText: {
    color: 'red',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  addCommentButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentModal;

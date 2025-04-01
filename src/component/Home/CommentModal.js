import { StyleSheet, Text, View, Modal, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const CommentModal = ({ setNewComment, commentModalVisible, setCommentModalVisible, newComment }) => {
   const [comments, setComments] = useState([]);
  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        text: newComment,
        user: {
          name: "John Doe", 
          img: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  // Delete a comment
  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };
  return (
    <Modal visible={commentModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Comments</Text>
        <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={addComment} style={styles.addCommentButton}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>

        <ScrollView>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Image source={{ uri: comment.user.img }} style={styles.commentProfile} />
                <Text style={styles.commentUser}>{comment.user.name}</Text>
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.commentText}>{comment.text}</Text>
                <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                  <Icon name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

export default CommentModal

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: "white", padding: 20, position: "absolute", bottom: 0, width: "100%", height: 400 },
  modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 },
  addCommentButton: { backgroundColor: "blue", padding: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  commentItem: { marginBottom: 15 },
  commentHeader: { flexDirection: "row", alignItems: "center" },
  commentProfile: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  commentUser: { fontWeight: "bold" },
  commentContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  commentText: { flex: 1 }
});
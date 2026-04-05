import React, { useState } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
StyleSheet,
Alert,
SafeAreaView,
StatusBar,
} from 'react-native';

export default function App() {
const [tasks, setTasks] = useState([]);
const [inputText, setInputText] = useState('');

// Add Task
function addTask() {
if (inputText.trim() === '') {
Alert.alert('Error', 'Please enter a task!');
return;
}

```
const newTask = {
  id: Date.now().toString(),
  text: inputText,
  completed: false,
};

setTasks([...tasks, newTask]);
setInputText('');
```

}

// Delete Task
function deleteTask(id) {
setTasks(tasks.filter(task => task.id !== id));
}

// Toggle Complete
function toggleComplete(id) {
setTasks(
tasks.map(task =>
task.id === id
? { ...task, completed: !task.completed }
: task
)
);
}

const completedCount = tasks.filter(t => t.completed).length;

return ( <SafeAreaView style={styles.container}> <StatusBar backgroundColor="#1e1b4b" barStyle="light-content" />

```
  {/* Header */}
  <View style={styles.header}>
    <Text style={styles.headerEmoji}>✅</Text>
    <Text style={styles.headerTitle}>My To-Do App</Text>

    <View style={styles.statsRow}>
      <View style={styles.statBox}>
        <Text style={styles.statNum}>{tasks.length}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statBox}>
        <Text style={styles.statNum}>
          {tasks.length - completedCount}
        </Text>
        <Text style={styles.statLabel}>Remaining</Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statBox}>
        <Text style={styles.statNum}>{completedCount}</Text>
        <Text style={styles.statLabel}>Done</Text>
      </View>
    </View>
  </View>

  {/* Input Section */}
  <View style={styles.inputSection}>
    <Text style={styles.inputLabel}>Add New Task</Text>

    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        placeholderTextColor="#aaa"
        value={inputText}
        onChangeText={text => setInputText(text)}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* Task List */}
  {tasks.length === 0 ? (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyEmoji}>📋</Text>
      <Text style={styles.emptyMsg}>No tasks yet!</Text>
      <Text style={styles.emptySub}>
        Add a task above to get started
      </Text>
    </View>
  ) : (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskCard}>
          <TouchableOpacity
            onPress={() => toggleComplete(item.id)}
          >
            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedText,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )}
</SafeAreaView>

);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f1f5f9',
},

header: {
backgroundColor: '#1e1b4b',
padding: 20,
alignItems: 'center',
borderBottomLeftRadius: 28,
borderBottomRightRadius: 28,
},

headerEmoji: {
fontSize: 36,
},

headerTitle: {
fontSize: 22,
color: '#fff',
fontWeight: '700',
marginBottom: 10,
},

statsRow: {
flexDirection: 'row',
alignItems: 'center',
},

statBox: {
alignItems: 'center',
padding: 10,
},

statNum: {
color: '#fff',
fontSize: 18,
fontWeight: 'bold',
},

statLabel: {
color: '#ddd',
fontSize: 12,
},

statDivider: {
width: 1,
height: 30,
backgroundColor: 'rgba(255,255,255,0.3)',
},

inputSection: {
margin: 16,
backgroundColor: '#fff',
borderRadius: 16,
padding: 16,
elevation: 3,
},

inputLabel: {
fontSize: 13,
fontWeight: '600',
color: '#6366f1',
marginBottom: 8,
textTransform: 'uppercase',
},

inputRow: {
flexDirection: 'row',
},

input: {
flex: 1,
borderWidth: 1,
borderColor: '#ddd',
borderRadius: 10,
padding: 10,
},

addBtn: {
backgroundColor: '#6366f1',
marginLeft: 10,
paddingHorizontal: 16,
justifyContent: 'center',
borderRadius: 10,
},

addBtnText: {
color: '#fff',
fontWeight: '600',
},

taskCard: {
flexDirection: 'row',
justifyContent: 'space-between',
backgroundColor: '#fff',
marginHorizontal: 16,
marginVertical: 6,
padding: 14,
borderRadius: 12,
elevation: 2,
},

taskText: {
fontSize: 16,
},

completedText: {
textDecorationLine: 'line-through',
color: '#999',
},

deleteText: {
color: '#ef4444',
fontSize: 18,
fontWeight: 'bold',
},

emptyBox: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},

emptyEmoji: {
fontSize: 50,
},

emptyMsg: {
fontSize: 18,
fontWeight: '600',
},

emptySub: {
fontSize: 13,
color: '#777',
},
});

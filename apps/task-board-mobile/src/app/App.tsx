import React, { useState, useEffect } from 'react';
import { TaskItemEntity } from '@nx-act-2/models';
import { addTask, completeTask, getTasks } from '@nx-act-2/task-board/controllers';
import TaskItem from './task-item/task-item';
import {
  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity,
  Keyboard, ScrollView, Image
} from 'react-native';

export default function App() {

  const [taskName, setTaskName] = useState<string>('');
  const [taskItems, setTaskItems] = useState<TaskItemEntity[]>([]);

  const onAddTask = () => {
    Keyboard.dismiss();

    addTask(taskName, (updatedTaskItems: TaskItemEntity) => {
      setTaskItems([...taskItems, updatedTaskItems]);
      setTaskName('');
    })
  };

  const onCompleteTask = (title: string) => {
    const updatedTaskItems = completeTask(taskItems, title);

    setTaskItems(updatedTaskItems);
  };

  useEffect(() => { getTasks(setTaskItems)}, [])

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
      <Image source={require('./assets/logos.png')} style={{ height: 100, width: '100%', resizeMode: 'contain' }}/>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((taskItem, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => onCompleteTask(taskItem.title)}>
                  <TaskItem taskItem={taskItem} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={"height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={taskName} onChangeText={text => setTaskName(text)} />
        <TouchableOpacity onPress={() => onAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {}
});

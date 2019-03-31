import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Button, FlatList, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import ITaskDto from '../models/TaskDto'
import Task from './Task'


 interface State {
  todoList : ITaskDto[],
  newTask: string
} 

export default class TaskList extends Component {

public state : State = {
  todoList: new Array<ITaskDto>(),
  newTask: ''
}

public async componentDidMount() {
  const tasks = await AsyncStorage.getItem('tasks')
  if(tasks) {
    this.setState({ todoList: JSON.parse(tasks) })
  }
}

public addTask = async () => {
  const newId = this.state.todoList.map(x => x.id).sort().pop();
  const createTask : ITaskDto = {
    id: (newId || 0) + 1,
    name: this.state.newTask,
    isChecked: false
  };
  this.state.todoList.push(createTask);
  this.setState({
    todolist: [...this.state.todoList].push(createTask),
    newTask: ''
  }, async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(this.state.todoList))
    Keyboard.dismiss();
  }); 
}

public changeTaskStatus = (id: number) => {
   this.setState({
    todoList: [...this.state.todoList].map(x => {
      if(x.id === id){
        return {
          id: x.id,
          name: x.name,
          isChecked: !x.isChecked
        }; // todo find shorter way
      }
      else{
        return x;
      }
    })
  }, async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(this.state.todoList))
  }); 
}

public deleteTask = (id: number) => {
  this.setState({
    todoList: [...this.state.todoList].filter(x => x.id !== id)
  }, async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(this.state.todoList))
  });
}

public emptyList = () => {
  return (
    <Text style={styles.notask}>No tasks</Text>
  )
}

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Task List</Text>
        <View style={styles.listView}>
          <FlatList
            data={this.state.todoList}
            renderItem = {({item}) => <Task {...item} onChange={this.changeTaskStatus} onDelete={this.deleteTask}/>}
            keyExtractor = {(item) => 'key' + item.id}
            ListEmptyComponent = {this.emptyList}
          /> 
        </View> 
        <View style={styles.addView}>
          <View style={styles.addTextContainer}>
            <TextInput style={styles.addText} placeholder="Enter Task Name" 
              value={this.state.newTask} 
              onChangeText={(newTask) => this.setState({newTask})}
            />
          </View>
          <View style={styles.addButton}>
            <Button title="Add" 
              onPress={this.addTask} 
              accessibilityLabel="Add task button"
              disabled={this.state.newTask.trim() === ''}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  addView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center'
  },
  addButton : {
    flex: 1,
    paddingRight: 20
  },
  addTextContainer: {
    flex: 3,
    paddingLeft: 20
  },
  addText: {
    fontSize: 20
  },
  listView: {
    flex: 6,
    flexDirection: 'row',
  },
  notask: {
    textAlign: 'center',
    alignItems: 'center',
    flex: 3,
    fontSize: 20
  }
});
import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Task from './Task'

interface TaskDto {
    id: number;
    name: string;
    isChecked: boolean;
}

export default class TaskList extends Component {

 
public state = {
  todoList: new Array<TaskDto>(),
  newTask: ''
}

public async componentDidMount() {
  const tasks = await AsyncStorage.getItem('tasks')
  if(tasks) {
    this.setState({ todoList: [...JSON.parse(tasks)] })
  }
  // todo add msg no task 

}

public addTask = async () => {
  const newId = this.state.todoList.map(x => x.id).sort().pop();
  this.setState({
    todolist: this.state.todoList.push
    ({
        id: (newId || 0) + 1,
        name: this.state.newTask,
        isChecked: false
    })
  })
}

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Task List</Text>
        <View style={styles.listView}>
          <FlatList
              data={this.state.todoList}
              renderItem = {({item}) => <Task {...item}/>}
              keyExtractor = {(item) => 'key' + item.id}
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
              disabled={this.state.newTask === ''}/>
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
  }
});
import React, {Component} from 'react';
import {Button, StyleSheet, Switch, Text, View} from 'react-native';

interface Props {
    id: number;
    name: string;
    isChecked: boolean;
}

export default class Task extends Component<Props> {

  public state = {
    id: this.props.id,
    name: this.props.name,
    isChecked: this.props.isChecked
  }

  public changeStatus = () => {
    this.setState({
      isChecked : !this.state.isChecked
    })
  }

  public delete = () => {
    return;
  }

  public render() {
    return (
        <View style={styles.container}>
          <View style={styles.switch}>
            <Switch onValueChange={this.changeStatus} value={this.state.isChecked}/>
            <Text style={styles.text}>{this.state.name}</Text>
          </View>
          <View style={styles.delete}>
            <Button title="Delete" onPress={this.delete} accessibilityLabel="Delete task button"/>
          </View>               
        </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    paddingLeft: 20,
    paddingBottom: 10
  },
  text: {
    fontSize: 25
  },
  switch: {
    flex: 3,
    flexDirection: 'row'
  },
  delete: {
    flex: 1,
    paddingRight: 20
  }
});
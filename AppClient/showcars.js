import React, { Component } from 'react';
import {FlatList, ActivityIndicator, Button, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const URL = require("./package.json").serverURL;

export default class ShowCars extends Component {
    static navigationOptions = { title: "Show Cars" }

    getData() {
        
        return (
            fetch(URL + "/api/cars")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        // car: responseJson.cars[0].regno,
                        datasource: responseJson.cars,
                    }, function () {

                    });
                })
                .catch((error) => {
                    console.error(error)
                })
        );
    }
    
    constructor(props) {
        super(props);
        this.state = { isLoading: true, datasource: [] }

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.texting}>A car:</Text>
            //     <Text style={styles.texting}>Regno: {this.state.car}</Text>
            // </View>

            

            <View style={{flex: 1, paddingTop:20}}>
              <FlatList
                data={this.state.datasource}
                renderItem={({item,index})=>{
                    return(
                        <FlatListItem item={item} index={index}/>
                    );
                }} 
            
              />
            </View>
        );
    }
}

class FlatListItem extends Component{
    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: this.props.index % 2 == 0 ? 'black': 'steelblue'
            }}>
            <Text style={styles.flatListItem}>{this.props.item.make} {this.props.item.model}</Text>
            <Text style={styles.flatListItem}>{this.props.item.category} {this.props.item.location} {this.props.item.priceperday}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
})

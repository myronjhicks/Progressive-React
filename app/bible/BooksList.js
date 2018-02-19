import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export default class BooksList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: undefined
        }
    }

    onSelected = ({item}) => {
        this.props.onBookSelected({item});
    }
    
    _renderBookName = ({item}) => {
        return (
            <TouchableOpacity onPress={_ => this.onSelected({item})}>
                <View style={styles.row}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.books}
                keyExtractor = {item => item.ord}
                renderItem={this._renderBookName}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        height: 45,
        paddingLeft: 12,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray'
    }
});
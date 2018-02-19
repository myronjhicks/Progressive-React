import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export default class ChapterNumberGrid extends Component {

    onSelected = ({item}) => {
        this.props.onChapterSelected({item});
    };

    _renderChapterView = ({item}) => {
        return (
            <TouchableOpacity onPress={_ => this.onSelected({item})}>
                <View style={styles.grid}>
                    <Text>{item.chapter}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.chapters}
                keyExtractor = {item => item.chapter}
                numColumns={5}
                renderItem={this._renderChapterView}
            />
        );
    }
}

const { width, height } = Dimensions.get('window');
const numColumns = 5;
const size = width / numColumns;
const equalWidth =  (width / numColumns );

const styles = StyleSheet.create({
    grid: {
        height: equalWidth,
        width: equalWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderBottomColor: 'lightgray', 
        borderRightWidth: StyleSheet.hairlineWidth, 
        borderRightColor: 'lightgray'
    }
});
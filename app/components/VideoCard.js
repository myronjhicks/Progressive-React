import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Assets, Constants, Card, Button, Colors, Typography, Text } from 'react-native-ui-lib';

const { width, height } = Dimensions.get('window');
const equalWidth =  (width - 20) / 2 ;
const videoImageSource = require('../assets/video_image.jpg'); 

export default class VideoCard extends Component {
    render() {
        return (
            <Card key={this.props.video.key} 
                onPress={_ => this.props.onPress(this.props.video)}
                shadowType="white10" column height={200} width={equalWidth} containerStyle={{marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 10}}>
                <Card.Image height={100} imageSource={videoImageSource} />
                <Card.Section body>
                    <Card.Section>
                        <Text text80 dark10>
                            {this.props.video.title}
                        </Text>
                    </Card.Section>
                    <Card.Section>
                        <Text text100 dark10>
                            {this.props.video.speaker}
                        </Text>
                    </Card.Section>
                    <Card.Section footer>
                        <Text text100 dark50>
                            {this.props.video.date}
                        </Text>
                    </Card.Section>
                </Card.Section>
            </Card>
        );
    }
}
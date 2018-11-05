import React from 'react';
import { Dimensions } from 'react-native';
import moment from 'moment';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Card } from 'native-base';
const { width, height } = Dimensions.get('window');
const equalWidth =  width ;
const videoImageSource = require('../assets/video_image.jpg');

export default class VideoCard extends React.Component {
    render() {
        return (
            <Card>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={videoImageSource} />
                    </Left>
                    <Body>
                        <Text text80 dark10>{this.props.video.title}</Text>
                        <Text note numberOfLines={1}>{this.props.video.speaker}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={_ => this.props.onPress(this.props.video)}>
                            <Text>Watch</Text>
                        </Button>
                    </Right>
                </ListItem>
            </Card>
        );
    }
}

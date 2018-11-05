import React, { Component } from 'react';
import { Dimensions, View, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
const videoImageSource = require('../assets/video_image.jpg');

export default class CarouselContainer extends Component {

	state = {
		cards: [
			{
				title: 'Worship Guide',
				description: "Our weekly services are designed to help you experience God’s presence through dynamic, spirit-filled worship that will prepare your heart for the message you’ll receive.",
				imageSrc: require('../../assets/guide.jpg')
			},
			{
				title: 'Growth Groups',
				description: "Joining a Growth Group gives you a chance to grow through fellowship with other Progressive members, learning in a small setting, and discussing important matters of Christian Discipleship.",
				imageSrc: require('../../assets/growth.jpg')
			},
			{
				title: 'PBC Kids',
				description: "It is a privilege to guide and shape the heart of a child towards the things of God! Our trained ministry team prayerfully prepares lessons and activities to engage children on their level.",
				imageSrc: require('../../assets/kids.jpg')
			},
			{
				title: 'Outreach',
				description: "Progressive Outreach is about compassion, unity, community, and service.",
				imageSrc: require('../../assets/outreach.jpg')
			},
		]
	};

	_renderItem ({item, index}) {
        return (
        	<View>
	            <Card style={{flex: 0}}>
	            	<CardItem cardBody>
	            		<Image source={item.imageSrc} style={{height: 200, width: null, flex: 1}}/>
	            	</CardItem>
	            	<CardItem>
	            		<Body>
	            			<Text>{item.title}</Text>
	            			<Text note>{item.description}</Text>
	            		</Body>
	            	</CardItem>
	            </Card>
            </View>
        );
    }

	render() {
		return (
			<View>
				<Text style={{margin: 10}}>Get Involved</Text>
				<Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.cards}
                  renderItem={this._renderItem}
                  sliderWidth={width}
                  itemWidth={325}
                />
			</View>
		);
	}
}
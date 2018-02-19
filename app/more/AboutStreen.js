import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground
} from "react-native";
import Image from "react-native-scalable-image";
import {
  Button,
  Container,
  Content,
  Body,
  Card,
  CardItem,
  Segment
} from "native-base";
import { View, Text } from 'react-native-ui-lib';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BackButton from '../components/buttons/BackButton';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / 150;
const LATITUDE = 41.827599;
const LONGITUDE = -87.6340124;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AboutScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
        title: 'About',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2e2e2e',
        },
        headerLeft: (
          <BackButton onPress={params.goBack} />
        ),
    }
  };


  constructor(props) {
    super(props);
    this.region = {
      latitude: LATITUDE, 
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.state = { selectedSegmentIndex: 1 };
  }

  componentDidMount() {
    this.props.navigation.setParams({goBack: this._handleCancel});
  }

  _handleCancel = () => {
    this.props.navigation.goBack();
  };

  _onSegmentPress = index => {
    var newState = { selectedSegmentIndex: index };
    this.setState(newState);
  };

  _renderContent = () => {
    if (this.state.selectedSegmentIndex === 1) {
      return (
        <ImageBackground
                style={{flex: 1}}
                source={require("../assets/backdrop.jpg")}>
          <View style={{marginBottom: 24}}>
                <Text style={[styles.containerText, {fontWeight: 'bold'}]}>Progress Happens Here</Text>
                <Text style={styles.containerText}>
                    The Progressive Baptist Church exists to glorify God by
                    growing authentic community, compassionately communicating the
                    Gospel of Jesus Christ, giving generously to the progress of the
                    Kingdom of God, and passionately worshipping Jesus Christ.
                    Progressive is a church that believes that Jesus is the answer. At
                    Progressive, you will find consistent biblical preaching, authentic
                    community, and hope for life.
                </Text>
                <Text style={styles.containerText}>
                    At Progressive, we place a premium on service. Our leadership
                    leads through service. Our membership demonstrates the love of
                    Christ in our city through service. Every Christian is given a
                    spiritual gift, and we want to help you put yours to use. Connect
                    with us and find a way to serve using your gift.
                </Text>
                <Text style={styles.containerText}>
                  We love children at Progressive! We believe that church for children should happen at 
                  their age developmental level. So we take great care, pride, and attention to detail 
                  in how we serve them. Our children's ministry staff is trained, competent, 
                  and compassionate. Bring your to experience the PBC Kids' ministry. 
                  It meets every 2nd, 3rd, and 4th Sunday. We encourage the entire 
                  family to worship together on 1st and 5th Sundays.
                </Text>
            </View>
          </ImageBackground>
      );
    } else if(this.state.selectedSegmentIndex === 2 ) {
      return (
        <ImageBackground
                style={{flex: 1}}
                source={require("../assets/backdrop.jpg")}>
        <View>
            <Image
              style={{alignSelf: 'center', marginTop: 12, marginBottom: 12}}
              maxWidth={width}
              maxHeight={200}
              source={require('../assets/dates_family.jpg')} />
              <View style={{marginBottom: 24}}>
                <Text style={styles.containerText}>In 2011, at age 30, Dr. Charlie Edward Dates became the youngest Senior Pastor in Progressive’s rich 98-year history.</Text>
                <Text style={styles.containerText}>Pastor Charlie earned a Bachelor of Arts in Speech Communication and Rhetoric at the University of Illinois at Urbana-Champaign and both a Master of Divinity Degree and PhD at Trinity Evangelical Divinity School in Deerfield, Illinois.</Text>
                <Text style={styles.containerText}>In 2002, Rev. Charlie served as an apprentice to Pastor K. Edward Copeland and started his formal, practical training at the New Zion Baptist Church of Rockford, Illinois. In 2006, he began serving as the primary preaching assistant to the Rev. James Meeks, Director of Church Operations and Pastor of Adult Ministries at the Salem Baptist Church of Chicago.</Text>
                <Text style={styles.containerText}>He successfully defended his dissertation for the PhD in Historical Theology at Trinity Evangelical Divinity School. His original research focuses on the burden of black preaching in late 20th Century Chicago.</Text>
                <Text style={styles.containerText}>For reasons that please Him, God has blessed the Progressive Church to grow deep and wide. In addition to his pastoral duties, Pastor Charlie is an affiliate professor at Trinity Evangelical Divinity School and serves as an Adjunct Professor at the Moody Bible Institute. Dr. Dates also  serves on the Community Advisory Board for the Chicago Fire Department. He is a contributor to the 2014 book Letters To A Birmingham Jail.</Text>
                <Text style={styles.containerText}>Pastor Charlie is married to Kirstie Dates and is the proud father of their children Charlie Edward Dates II and Claire Elisabeth Dates.</Text>
                <Text style={styles.containerText}>Pastor Charlie is widely invited to preach at churches, conferences and universities throughout the United States. To invite Pastor Charlie Dates to speak at your next event, please contact Shonta Connolly at Shonta@ProgressiveChicago.org or (773) 268-6048.</Text>
            </View>
        </View>
        </ImageBackground>
      );
    }else{
      return (
        <View style={{flex: 1,}}>
          <MapView
            style={{ flex: 1, height: 150}}
            provider={PROVIDER_GOOGLE}
            region={this.region}>  
            <MapView.Marker coordinate={this.region} />
          </MapView>
          <Card style={{height: 40, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{marginLeft: 12, fontSize: 14}}>
              Sunday 8:00am & 11:00am
            </Text>
          </Card>
          <Text style={{alignSelf: 'center'}}>
            Location Info
          </Text>
          <Card style={{height: 80, marginLeft: 12, marginRight: 12, padding: 8}}>
            <Text style={{fontSize: 14, alignSelf: 'center',  justifyContent: 'center', textAlign: 'center'}}>
              Progressive Baptist Church is located at {'\n'} 3658 S. Wentworth Ave, Chicago, IL 60609.
            </Text>
          </Card>
          <Text style={{alignSelf: 'center'}}>
            Contact Info
          </Text>
          <Card style={{height: 100, marginLeft: 12, marginRight: 12, justifyContent: 'space-between', padding: 8}}>
            <Text style={{fontSize: 14}}>
              Phone - (773) 268-6048
            </Text>
            <Text style={{fontSize: 14}}> 
              Fax - (773) 268-7790
            </Text>
            <Text style={{fontSize: 14}}>
              Email - Info@ProgressiveChicago.org
            </Text>
          </Card>
          <Text style={{alignSelf: 'center'}}>
            Office Hours
          </Text>
          <Card style={{height: 175, marginLeft: 12, marginRight: 12, marginBottom: 80}}>
            <Text style={{marginBottom: 4, marginLeft: 12, marginTop: 12,fontSize: 14}}>
              Monday: 
              <Text style={{fontSize: 14, fontWeight: 'bold'}}> CLOSED</Text>
            </Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>Tuesday: 9:00am - 4:30pm</Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>Wednesday: 9:00am - 6:00pm</Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>Thursday: 9:00am - 4:30pm</Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>Friday: 9:00am - 4:30pm</Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>
              Saturday:
              <Text style={{fontSize: 14, fontWeight: 'bold'}}> CLOSED</Text>
            </Text>
            <Text style={{marginBottom: 4, marginLeft: 12,fontSize: 14}}>Sunday: 9:30am - 10:30am; 1:00pm - 2:00pm</Text>
          </Card>
        </View>
      );
    }
  };


  _renderSegment = () => {
    return (
      <Segment style={{backgroundColor: '#2e2e2e'}}>
        <Button
          style={{borderColor: 'black', backgroundColor: 'lightgray'}}
          first
          onPress={_ => this._onSegmentPress(1)}
          active={this.state.selectedSegmentIndex === 1 ? true : false}
        >
          <Text style={{color: 'black', fontSize: 11}}>Who We Are</Text>
        </Button>
        <Button 
          style={{borderColor: 'black', backgroundColor: 'lightgray'}}
          onPress={_ => this._onSegmentPress(2)}
          active={this.state.selectedSegmentIndex === 2 ? true : false}
        >
          <Text style={{color: 'black', fontSize: 11}}>Our Pastor</Text>
        </Button>
        <Button
          style={{borderColor: 'black', backgroundColor: 'lightgray'}}
          last
          onPress={_ => this._onSegmentPress(3)}
          active={this.state.selectedSegmentIndex === 3 ? true : false}
        >
          <Text style={{color: 'black', fontSize: 11}}>Location</Text>
        </Button>
      </Segment>
    );
  };

  render() {
    return (
      <Container>
          {this._renderSegment()}
            <Content style={styles.container}>
                {this._renderContent()}
            </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerText: {
    color: "white",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 12
  }
});
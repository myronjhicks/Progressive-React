import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem 
} from 'native-base';
import { List, ListItem } from 'react-native-elements';


export default class BelieveScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'What We Believe',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
              <Button light transparent onPress={params.goBack}>
                  <Icon name="arrow-back" size={24} />
              </Button>
          )
        }
      };

      componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
        }
    
     _handleCancel = () => {
        this.props.navigation.goBack();
        };

    renderItem = ({item, index}) => {
        return (
            <View style={{flex: 1, margin: 10}}>
                <Text style={{color: '#660000', fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>
        );
    };

    render() {

        const beliefs = [
            {
                id: 1, 
                title: "God", 
                text: 'We believe in one God, Creator of all things, holy, infinitely perfect, and eternally existing in a loving unity of three equally divine Persons: the Father, the Son and the Holy Spirit. Having limitless knowledge and sovereign power, God has graciously purposed from eternity to redeem a people for Himself and to make all things new for His own glory.'
            },
            {
                id: 2, 
                title: "The Bible", 
                text: 'We believe that God has spoken in the Scriptures, both Old and New Testaments, through the words of human authors. As the verbally inspired Word of God, the Bible is without error in the original writings, the complete revelation of His will for salvation and the ultimate authority by which every realm of human knowledge and endeavor should be judged. Therefore, it is to be believed in all that it teaches, obeyed in all that it requires and trusted in all that it promises.'
            },
            {
                id: 3, 
                title: "The Human Condition", 
                text: 'We believe that God created Adam and Eve in His image, but they sinned when tempted by Satan. In union with Adam, human beings are sinners by nature and by choice, alienated from God, and under His wrath. Only through God’s saving work in Jesus Christ can we be rescued, reconciled and renewed.', 
            },
            {
                id: 4, 
                title: "Jesus Christ", 
                text: 'We believe that Jesus Christ is God incarnate, fully God and fully man, one Person in two natures. Jesus -- Israel’s promised Messiah -- was conceived through the Holy Spirit and born of the Virgin Mary. He lived a sinless life, was crucified under Pontius Pilate, arose bodily from the dead, ascended into heaven, and sits at the right hand of God the Father as our High Priest and Advocate.', 
            },
            {
                id: 5, 
                title: "The Work of Christ", 
                text: 'We believe that Jesus Christ, as our representative and substitute, shed His blood on the cross as the perfect, all-sufficient sacrifice for our sins. His atoning death and victorious resurrection constitute the only ground for salvation.', 
            },
            {
                id: 6, 
                title: "The Holy Spirit", 
                text: 'We believe that the Holy Spirit, in all that He does, glorifies the Lord Jesus Christ. He convicts the world of its guilt. He regenerates sinners and in Him they are baptized into union with Christ and adopted as heirs in the family of God. He also indwells, illuminates, guides, equips, and empowers believers for Christ-like living and service.', 
            },
            {
                id: 7,
                title: 'The Church',
                text: 'We believe that the true church comprises all who have been justified by God’s grace through faith alone in Christ alone. They are united by the Holy Spirit in the body of Christ, of which He is the Head. The true church is manifest in local churches, whose membership should be composed only of believers. The Lord Jesus mandated two ordinances, baptism and the Lord’s Supper, which visibly and tangibly express the gospel. Though they are not the means of salvation, when celebrated by the church in genuine faith, these ordinances confirm and nourish the believer.'
            }
        ];

        return(
            <Container>
                <Content>
                    <ImageBackground
                        style={{
                            flex: 1,
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        source={require('../assets/backdrop.jpg')}>
                        <View>
                            <Text style={{color: 'white', fontSize: 24}}>What We Believe</Text>
                        </View>
                    </ImageBackground>
                    <View style={{backgroundColor: '#f6f8fa'}}>
                        <FlatList
                            data={beliefs}
                            keyExtractor = {item => item.id}
                            renderItem={this.renderItem}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}
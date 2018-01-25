import React, { Component } from 'react';
import { FlatList, View, WebView } from 'react-native';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem 
} from 'native-base';

const urls = [
    {
        id: 1,
        title: 'Progressive Baptist Church History Part 1',
        url: 'https://www.youtube.com/embed/0SZXmuImsCc'
    },{
        id: 2,
        url: 'https://www.youtube.com/embed/4ErryUkHoDs'
    },{
        id: 3,
        url: 'https://www.youtube.com/embed/TicBF_jqTvk'
    },{
      id: 4,
      url: 'https://www.youtube.com/embed/k_ivhYmNmME'  
    }
];

export default class HistoryScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Our History',
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

    _renderItem = ({item}) => {
        return (
            <View>
                <Card>
                    <CardItem header>
                        <Text style={{color: '#660000', fontSize: 20, fontWeight: 'bold'}}>
                            PBC History Part {item.id}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <WebView
                            source={{uri: item.url}}
                            scrollEnabled={false}
                            style={{height: 200}}
                        />
                    </CardItem>
                </Card>
            </View>
        );
    };

    render() {
        return(
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={urls}
                keyExtractor = {item => item.id}
                renderItem={this._renderItem}
            />
        );
    }
}
import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';
import BackButton from '../components/buttons/BackButton';
import { listenToWorshipGuide } from '../redux/actions/worshipGuide';

class WorshipGuideComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            guideUrl: ''
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Worship Guide',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
                <BackButton onPress={params.goBack} />
            )
        }
      };


    componentWillMount() {
        this.props.subscribeToWorshipGuide();
    }
    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
    }

    _handleCancel = () => {
        this.props.navigation.goBack();
      };

    render() {
        return (
            <View style={styles.container}>
                <WebView source={{ uri: this.props.worshipGuide }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    return {
      worshipGuide: state.worshipGuide,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        subscribeToWorshipGuide: () => dispatch(listenToWorshipGuide()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorshipGuideComponent);
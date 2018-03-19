import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import BackButton from '../components/buttons/BackButton';
import Form from "../components/Form";
import FormContainer from "../components/FormContainer";
import { addLiveStream } from '../redux/actions/videos';

const fields = [
  {
    key: 'title',
    label: "Title",
    placeholder: "Sermon Title",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  },
  {
    key: 'speaker',
    label: "Speaker",
    placeholder: "Speaker",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  },
  {
    key: 'event_id',
    label: "Event ID",
    placeholder: "12345",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  },
  {
    key: 'video_id',
    label: "Video ID",
    placeholder: "123456",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  }
];

const error = {
    general: "",
    title: "",
    speaker: "",
    event_id: "",
    video_id: ""
};

class LiveStreamVideoForm extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
        title: 'Livestream Info',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2e2e2e',
        },
        headerLeft: (
          <BackButton onPress={params.goBack} />
        ),
      }
  };

  constructor(props){
    super(props);
    this.state = { error: error };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data){
    this.setState({error: error})
    this.props.addLiveStream(data, this.onSuccess, this.onError);
  }

  onSuccess(){
    this.props.navigation.goBack();
  }

  onError(error){
    let errorObj = this.state.error;

    if(error.hasOwnProperty('message')){
      errorObj['general'] = error.message;
    }else{
      let keys = Object.keys(error);
      keys.map((key, idx) => {
        errorObj[key] = error[key]
      })
    }

    this.setState({error: errorObj});
  }

  goBack = () => { this.props.navigation.goBack() } ;

  componentDidMount(){
      this.props.navigation.setParams({goBack: this.goBack });
  }

  render() {
    return (
      <FormContainer>
        <Form
          fields={fields}
          showLabel={false}
          onSubmit={this.onSubmit}
          buttonTitle={"SAVE"}
          error={this.state.error}
        />
      </FormContainer>
    );
  }
}

export default connect(null, { addLiveStream })(LiveStreamVideoForm);

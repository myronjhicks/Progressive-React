import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import { validate, isEmpty } from '../utils/validate';
import FormTextInput from '../FormTextInput';

class Form extends Component {

  constructor(props){
    super(props);

    const fields = props.fields;
    const error = props.error;
    const state = {};

    for(let i = 0; i<fields.length; i++){
      let field = fields[i];
      let { key, type, value } = field;
      state[key] = { type: type, value: value };
    }

    state['error'] = error;
    this.state = state;
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const data = this.state;
    const result = validate(data);

    if(!result.success){
      this.setState({error: result.error})
    }else{
      this.props.onSubmit(this.extractData(data));
    }
  }

  extractData(data){
    const retData = {};

    Object.keys(data).forEach(function(key){
      if(key !== 'error'){
        let { value } = data[key];
        retData[key] = value;
      }
    });

    return retData;
  }

  onChange(key, text){
    const state = this.state;
    state[key]['value'] = text;
    this.setState(state);
  }

  render(){
    const { fields, showLabel, buttonTitle } = this.props;
    return (
      <View style={styles.wrapper}>
        {
          (!isEmpty(this.state.error['general'])) &&
          <Text style={styles.errorText}>{this.state.error['general']}</Text>
        }
        {
          fields.map((data, idx) => {
            let { key, label, placeholder, autoFocus, secureTextEntry } = data;
            return (
              <FormTextInput key={key}
                label={label}
                showLabel={showLabel}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={(text) => this.onChange(key, text)}
                secureTextEntry={secureTextEntry}
                value={this.state[key]['value']}
                error={this.state.error[key]} />
            )
          })
        }
        <Button
          raised
          title={buttonTitle}
          borderRadius={4}
          containerViewStyle={[styles.buttonContainer]}
          bottonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this.onSubmit} />
      </View>
    );
  }

}

export default Form;

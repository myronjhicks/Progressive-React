import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Assets, Constants, Card, Button, Colors, Typography, Text } from 'react-native-ui-lib';
import moment from 'moment';
import ClapButton from '../components/ClapButton';

export default class PrayerCard extends Component {
    render() {
        const prayer = this.props.prayer;
        return (
            <Card key={prayer.key} shadowType="white10" containerStyle={styles.container}>
                <Card.Section body>
                    <Card.Section>
                        <Text text80 dark10>
                            {prayer.content}
                        </Text>
                    </Card.Section>
                    <Card.Section footer>
                        <Text text80 dark10>
                            {prayer.name}
                        </Text>
                        <Text>{moment(prayer.date).format('ll')}</Text>
                    </Card.Section>
                </Card.Section>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
});
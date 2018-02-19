import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import BackButton from '../components/buttons/BackButton';
import { listenToWorshipGuide } from '../redux/actions/worshipGuide';
import { Tabs, Accordion, List } from 'antd-mobile';
import _ from 'lodash';

const tabs = [
    { title: 'Prayer' },
    { title: 'Guide' }
];

const lightGray = '#ccc';
const black = 'black';

const fastCycles = [
    {
        title:  'The Making of a Disciple',
        range:  'February 20 – February 24',
        prayer: 'Almighty God, there is no other like You. You made the earth, You created all that we see and do not see, and You created me. You must have a purpose for my life. Help me, as I pray and read Your word today, to know the duty that You have assigned to me, and to live out my purpose today. In the name of Jesus, Amen.',
        psalm:  'Psalm 32',
        scriptures: [
            { dayOfWeeK: 'Tuesday',   passage: 'Luke 14:7-14' }, 
            { dayOfWeeK: 'Wednesday', passage: 'Matthew 3:13 – 4:17' },
            { dayOfWeeK: 'Thursday',  passage: 'Luke 14:25-34'},
            { dayOfWeeK: 'Friday',    passage: 'Acts 4:32-37'},
            { dayOfWeeK: 'Saturday',  passage: 'John 6:60-71'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'Follower of Christ'
    },
    {
        title: 'The Power of God’s Word',
        range: 'February 25 – March 3',
        prayer: 'At Your word, O Lord, the worlds were created, and by Your word new life is given. Open now my ears that I may hear Your special word spoken to me today. In Jesus’ Name, Amen.',
        psalm: 'Psalm 29',
        scriptures: [
            {dayOfWeeK: 'Sunday', passage: 'Micah 6:1-8'},
            {dayOfWeeK: 'Monday', passage: 'John 1:1-13'},
            {dayOfWeeK: 'Tuesay', passage: 'Genesis 1:1-19'},
            {dayOfWeeK: 'Wednesday', passage: 'Genesis 1:20-31'},
            {dayOfWeeK: 'Thursday', passage: 'Matthew 9:1-8'},
            {dayOfWeeK: 'Friday', passage: '2 Corinthians 12:1-10'},
            {dayOfWeeK: 'Saturday', passage: '1 Peter 1:3-9'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'How Firm A Foundation [YouTube the Sovereign Grace Version]'
    },
    {
        title: 'Choose Life',
        range: 'March 4 – March 10',
        prayer: 'Today, my God, let me hear again Your word spoken to me, “Choose this day whom you will serve” and assist me to choose the way of life eternal. Speak, my Lord; your servant is listening. Amen.',
        psalm: 'Psalm 51',
        scriptures: [
            {dayOfWeeK: 'Sunday', passage: '2 Kings 5:1-14'},
            {dayOfWeeK: 'Monday', passage: 'Philippians 3:8-16'},
            {dayOfWeeK: 'Tuesday', passage: '1 Timothy 6:3-19'},
            {dayOfWeeK: 'Wednesay', passage: 'Matthew 7:1-14'},
            {dayOfWeeK: 'Thursday', passage: 'Ephesians 4:1-8'},
            {dayOfWeeK: 'Friday', passage: 'Luke 12:22-32'},
            {dayOfWeeK: 'Saturday', passage: '1 Thessalonians 4:1-18'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'I Am On The Battlefield'
    },
    {
        title: 'What God Has Promised',
        range: 'March 11 – March 17',
        prayer: 'O God, whose promises are true, help me never to stagger in disbelief at your promises but to claim them as my own. In the name of Christ, Amen.',
        psalm: 'Psalm 119:33-48',
        scriptures: [
            {dayOfWeeK: 'Sunday', passage: 'Genesis 17:1-10'},
            {dayOfWeeK: 'Monday', passage: '1 Kings 8:22-30'},
            {dayOfWeeK: 'Tuesday', passage: 'Nehemiah 9:6-25'},
            {dayOfWeeK: 'Wednesay', passage: 'Romans 4:16-25'},
            {dayOfWeeK: 'Thursday', passage: 'James 1:1-15'},
            {dayOfWeeK: 'Friday', passage: '2 Corinthians 1:12-22'},
            {dayOfWeeK: 'Saturday', passage: '2 Peter 3:5-13'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'Standing on The Promises'
    },
    {
        title: 'The God Who Seeks',
        range: 'March 18 – March 24',
        prayer: 'O God, whose love is forever seeking communion with us, help me not to hid from you in this appointed encounter but to present ourselves open-faced before You. Though Jesus Christ, Amen.',
        psalm: 'Psalm 107',
        scriptures: [
            {dayOfWeeK: 'Sunday', passage: '1 Samuel 16:1-13'},
            {dayOfWeeK: 'Monday', passage: 'Luke 19:1-10'},
            {dayOfWeeK: 'Tuesday', passage: 'Matthew 18:10-14'},
            {dayOfWeeK: 'Wednesay', passage: 'Ezekiel 36:22-30'},
            {dayOfWeeK: 'Thursday', passage: 'Jeremiah 30:1-10'},
            {dayOfWeeK: 'Friday', passage: 'Hebrews 2:1-18'},
            {dayOfWeeK: 'Saturday', passage: 'Romans 5:1-11'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'Love Lifted Me'
    },
    {
        title: 'The Cost of Right Choices',
        range: 'March 25 – March 31',
        prayer: 'O God, whose very presence moves us to righteousness, help me to joyfully choose always for You. Let me not be tossed about by conflicting motives but live solely for You. In the power of Christ’s name, Amen.',
        psalm: 'Psalm 56',
        scriptures: [
            {dayOfWeeK: 'Sunday', passage: 'Luke 19:28-40'},
            {dayOfWeeK: 'Monday', passage: 'Acts 14:19-28'},
            {dayOfWeeK: 'Tuesday', passage: '1 Peter 2:21-25'},
            {dayOfWeeK: 'Wednesay', passage: '1 Corinthians 1:3-11'},
            {dayOfWeeK: 'Thursday', passage: 'Isaiah 53:1-6'},
            {dayOfWeeK: 'Friday', passage: 'Isaiah 53:7-12'},
            {dayOfWeeK: 'Saturday', passage: 'Philippians 2:5-11'}
        ],
        focus: 'For the Church, for Others, for Myself',
        song: 'Oh, I Want to See Him'
    }
];

const PrayerComponent = ({}) => {
    return (
        <ScrollView style={styles.container}>
            <Text text70 marginB-12>
                Heavenly Father, as we prepare our hearts for this period of fasting and prayer, 
                we pray for your grace to sustain and fulfill us for our perceived needs. 
                We need you. Help us to keep that truth before us. 
                We ask that when we desire our usual foods or activities - 
                it would trigger communing and talking with you. 
            </Text>
            <Text text70 marginB-12>
                We pray for your healing in the wounded parts of our lives. 
                Your comfort in the sorrowful parts.  Your strength in the weakened parts. 
                Your resources in the lacking parts. Your Grace in the tempted parts. 
                Your forgiveness and mercy in the sinful parts and your 
                enlightenment in the darkened parts.
            </Text>
            <Text text70 marginB-12>
                During this time we ask that you would work in a concentrated way on our sanctification. 
                Search us O God and know our hearts, try us and know our thoughts. Blow away the sinful 
                scent of sin within. We desire that on the other side of this season of fasting and 
                prayer you would allow us to see your Son, Jesus Christ afresh. 
                Make us to look more like him. We stretch ourselves in this effort anticipating 
                you would perform a wondrous work in this church and in our individual lives.
            </Text>
            <Text text70 marginB-12>
                We lift this prayer to you in the all sufficient name of Jesus Christ. Amen.
            </Text>
        </ScrollView>
    );
};

const FastGuideAccordion = ({cycle}) => {
    return (
        <View><Text style={styles.range}>{cycle.range}</Text>
        <Accordion accordion openAnimation={{}} onChange={this.onChange}>
            <Accordion.Panel header={<Text style={styles.subHeader}>Devotional Prayer</Text>}>
                <List.Item>
                    <Text>{cycle.prayer}</Text>
                </List.Item>
            </Accordion.Panel>
            <Accordion.Panel header={<Text style={styles.subHeader}>Daily Psalm</Text>}>
                <List.Item>
                    <Text>{cycle.psalm}</Text>
                </List.Item>
            </Accordion.Panel>
            <Accordion.Panel header={<Text style={styles.subHeader}>Daily Scripture Reading</Text>}>
                <List>
                    {_.map(cycle.scriptures, (scripture, i) => {
                        return (
                            <List.Item key={i}>
                                <Text style={styles.subHeader}>{scripture.passage}</Text>
                            </List.Item>
                        );
                    })}
                </List>
            </Accordion.Panel>
            <Accordion.Panel header={<Text style={styles.subHeader}>Prayers</Text>}>
                <List.Item>
                    <Text>
                        {cycle.focus}
                    </Text>
                </List.Item>
            </Accordion.Panel>
            <Accordion.Panel header={<Text style={styles.subHeader}>Song</Text>}>
                <List.Item>
                    <Text>
                        {cycle.song}
                    </Text>
                </List.Item>
            </Accordion.Panel>
        </Accordion>
        </View>
    );
}

const FastGuideComponent = () => {
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <Text marginB-12 style={{color: '#660000', fontSize: 20, fontWeight: 'bold'}}>Fast Guide</Text>
                <Text text90 marginB-12>
                    For 40 days our Lord fasted from food. His dependence upon God, His father, and His insistence to live by the very word He embodied proved most effective in overcoming one of His most severe seasons of temptation. His witness to us is also a model for us. This year, for the 40 days leading up to Resurrection weekend, The Progressive Church will begin a congregational fast, Tuesday February 20 through March 31. We are asking every member of the church to participate with us. Fasting is the spiritual discipline of forsaking food (and other things) for spiritual purposes.
                </Text>
                <Text text90 marginB-12>
                    Fasting is made rightly spiritual when joined with prayer. That is to say that without the accompaniment of prayer, fasting is just a diet. As a church, we want to fast and pray. Below is a prayer guide, complete with daily prayers, Biblical passages, themes for reflection, and songs to sing that will help us join together on the road to resurrection. In addition to this daily guide, we will host regular, weekend sessions for prayer at the church and prayer walks in the neighborhood as the weather breaks. Plan now to join us March 3, March 17, and March 24 at 9am for our congregational prayer gatherings. If weather permits, we will walk and pray in the neighborhood the last 2 sessions.
                </Text>
                <Text marginB-12 style={{color: '#660000', fontSize: 20, fontWeight: 'bold'}}>Prayer Guide</Text>
                <Text text90 marginB-12>
                    The instructions are simple. Pray the opening devotional prayer each morning, then read the same Psalm each day according to the week’s assignment, then read the passages assigned to the day, pray for yourself, your loved ones, and the church. You might want to end each devotional period with a singing aloud.
                </Text>
            </View>
            <Accordion accordion openAnimation={{}} onChange={this.onChange}>
                {_.map(fastCycles, (cycle, i) => {
                    return (
                        <Accordion.Panel key={i} header={<Text style={styles.header}>{cycle.title}</Text>}>
                            <FastGuideAccordion cycle={cycle} />
                        </Accordion.Panel>
                    );
                })}
            </Accordion>
        </ScrollView>
    );
}

export default class WorshipGuideComponent extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Fasting Guide',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
                <BackButton onPress={params.goBack} />
            )
        }
      };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
    }

    _handleCancel = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <Tabs tabs={tabs} initialPage={0}
                tabBarUnderlineStyle={{backgroundColor: lightGray}}
                tabBarActiveTextColor={black}
                tabBarInactiveTextColor={lightGray}
                animated={false} useOfPan={false}>
                <PrayerComponent />
                <FastGuideComponent />
            </Tabs>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 12,
    },
    header: {
        flex: 1, color: '#660000', fontSize: 14, fontWeight: 'bold', padding: 12
    },
    subHeader: {
        flex: 1, fontSize: 14, fontWeight: 'bold', padding: 12
    },
    range: {
        marginLeft: 12, flex: 1, fontSize: 12, padding: 12, fontStyle: 'italic'
    },
    paragraph: {
        marginBottom: 5
    }
});
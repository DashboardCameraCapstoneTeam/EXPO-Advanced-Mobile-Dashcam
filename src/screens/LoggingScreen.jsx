import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, Button, Title, Text, Snackbar, SegmentedButtons, Divider } from 'react-native-paper';
import HEADER_IMG from '../../assets/header.jpg';
import GlobalStyles from '../styles/global-styles';

const LoggingScreen = () => {
    const [loggingMessages, setLoggingMessages] = useState([]);

    const getLoggingMessages = async () => {
        try {
            const messages = await AsyncStorage.getItem('loggingMessages');
            const messagesArray = JSON.parse(messages);
            if (messagesArray) {
                setLoggingMessages(messagesArray);
            } else {
                setLoggingMessages([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLoggingMessages();
    }, []);

    const renderLoggingMessages = (messages) => {
        return messages.map(message => (
            <Card key={message.id} style={[GlobalStyles.roundedTop, GlobalStyles.roundedBottom, GlobalStyles.divWhite, GlobalStyles.marginYsm]}>
                <Card.Content>
                    <Text variant='bodySmall'>
                        {message.message}
                    </Text>

                    <Text variant='bodySmall'>
                        {message.date}
                    </Text>
                </Card.Content>
            </Card>

        ));
    }

    const clearLoggingMessages = async () => {
        try {
            setLoggingMessages([]);
            await AsyncStorage.removeItem('loggingMessages');
        } catch (error) {
            console.error(error);
        }
    }

    const addRandomArray = async () => {
        // Generate a random array of objects with id, title, message, and date properties
        const randomArray = [...Array(10)].map((_, index) => ({
            id: index,
            title: `Title ${index}`,
            message: `This is message ${index}`,
            date: new Date().toISOString(),
        }));

        const newLoggingMessages = [...loggingMessages, ...randomArray];
        await AsyncStorage.setItem('loggingMessages', JSON.stringify(newLoggingMessages));
    };

    return (
        <View style={[GlobalStyles.container, GlobalStyles.statusbarMargin]}>
            <ScrollView >



                <View style={[GlobalStyles.divMain, GlobalStyles.paddingXmd, GlobalStyles.paddingYmd]}>
                    <Text variant='titleLarge' style={GlobalStyles.whiteText}>Logging Messages</Text>
                    <Text style={[GlobalStyles.paddingYsm, GlobalStyles.whiteText]} variant="bodySmall">
                        All logging messages are saved here. Use the button below to clear all messages.
                    </Text>
                </View>


                <View style={[GlobalStyles.flex1, GlobalStyles.divWhite]}>
                    {loggingMessages.length === 0 && <Text variant="bodySmall">No logging messages exist.</Text>}
                    {loggingMessages.length && renderLoggingMessages(loggingMessages)}
                    {loggingMessages.length && (
                        <View style={[GlobalStyles.rowContainerWrap, GlobalStyles.marginYsm]}>
                            <View style={GlobalStyles.buttonContainer}>

                                <Button style={GlobalStyles.button} icon="restart" mode="outlined" onPress={clearLoggingMessages}>Clear Logging Messages</Button>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default LoggingScreen;
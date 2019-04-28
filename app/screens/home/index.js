import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { randomData, generateRandomNumber10To50v2, generateRandomNumber10To50 } from '../../helper';
import styles from './styles';

export default class App extends Component {
    state = {
        dataToShow: [],
        dataLayers: 0,
        isRefreshing: false,
        searchedString: '',
    }

    componentDidMount() {
        this.addData();
        this.renderInstructionsAlert();
    }

    addData = () => {
        this.setState({
            dataLayers: this.state.dataLayers + 1,
            dataToShow: [
                ...this.state.dataToShow,
                ...randomData(this.state.dataLayers),
            ],
            isRefreshing: true,
        }, () => setTimeout(() => this.setState({ isRefreshing: false }), 800));
    }

    renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text>{`${item.no}  ${item.word}`}</Text>
            <View style={{
                height: 10 + generateRandomNumber10To50v2(index),
            }} />
        </View>
    )

    renderGoDownBtn = () => (
            <TouchableOpacity
                style={styles.goDownBtnContainer}
                onPress={() => this.dataList
                    && this.dataList.scrollToIndex({ index: 0 })
                }
            >
                <Text style={styles.goDownBtn}>
                    Go Down
                </Text>
            </TouchableOpacity>
    )

    renderSearchBar = () => (
        <View style={styles.searchBarContainer}>
            <TextInput
                onChangeText={searchedString => this.setState({ searchedString })}
                style={styles.searchBar}
                placeholder="Search"
                autoCorrect={false}
            />
        </View>
    )

    onEndReached = () => {
        if (this.state.searchedString === '') {
            this.addData();
        }
    }

    renderInstructionsAlert = () => {
        Alert.alert(
            'Instructions',
            `1. Adding more data on scroll to end is coded to work only when
            search bar text is empty. As otherwise while searching, onEndReached
            was getting called automatically and extra data was added resulting
            in unexpected behaviour. You can still have the behaviour you wanted, just
            search for onEndReached method and remove the if condition\n
            2. Extra space below text in list item is not exactly random because random
            space means, with every random it will change again, so to make it
            consistent, i have generated a constant number between 10 to 50 given a
            index number. You can still change the code to generate random space, i
            have left the method unused there just search for generateRandomNumber10To50v2
            in this file and with generateRandomNumber10To50.`,
        );
    }

    render() {
        const { dataToShow, isRefreshing, searchedString } = this.state;
        const filteredData = dataToShow.filter(
            ({ word }) => {
                return word.search(searchedString.toLowerCase()) !== -1;
            },
        );
        return (
        <SafeAreaView style={styles.container}>
            {this.renderGoDownBtn()}
            {this.renderSearchBar()}
            {isRefreshing && <ActivityIndicator />}
            <FlatList
                ref={list => this.dataList = list}
                data={filteredData}
                renderItem={this.renderItem}
                keyExtractor={(item) => `Key${item.no}`}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.1}
                inverted
                ItemSeparatorComponent={() => <View style={styles.line} />}
            />
        </SafeAreaView>
        );
}
}

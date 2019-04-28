import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    itemContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    line: {
        height: 1,
        backgroundColor: '#000000',
    },
    goDownBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    goDownBtn: {
        borderWidth: 1,
        padding: 8,
    },
    searchBarContainer: {
        backgroundColor: 'grey',
        padding: 16,
    },
    searchBar: {
        borderWidth: 1,
        padding: 8,
        backgroundColor: 'white',
    },
});

export default styles;
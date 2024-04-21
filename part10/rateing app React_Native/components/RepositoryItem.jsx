import React from 'react';
import { Text, View, StyleSheet, Image, Button, Linking } from 'react-native';

export const myFormat = (value) => {
    return value >= 1000 ? Math.round(value/100)/10 + "k" : value; 
}

const RepositoryItem = (props) => {
    const styles = StyleSheet.create({
        box: {
            padding: 20,
            margin: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#f0f0f0',
            backgroundColor: '#f9f9f9',
            flexDirection: "column",
        }, 
        smallBoxVertical: {
            flexDirection: "column",
            margin: 10,
        },
        smallBoxHorizontal: {
            flexDirection: "row",
            margin: 10,
        },
        boldText: {
            fontWeight: "bold"
        }, 
        whiteText: {
            color: "white"
        },
        customBox: {
            flexDirection: "column",
            backgroundColor: 'blue',
            alignSelf: 'flex-start',
            borderRadius: 5,
        },
        image: {
            width: 50,
            height: 50
        }
    });

    return (    
    <View style={styles.box}>    
        <View style={styles.smallBoxHorizontal}>
            <View>
                <Image style={styles.image} source={{
                    uri: props.ownerAvatarUrl
                }} />
            </View>
            <View>
                <View  style={styles.smallBoxHorizontal}>
                    <Text style={styles.boldText} testID={`${props.id}@fullName`}>{props.fullName}</Text>
                </View>
                <View  style={styles.smallBoxHorizontal}>
                    <Text testID={`${props.id}@description`}>{props.description}</Text>
                </View>
                <View style={styles.smallBoxHorizontal}>
                    <View style={styles.customBox}>
                        <Text style={styles.whiteText} testID={`${props.id}@language`}>{props.language}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.smallBoxHorizontal}>
            <View style={styles.smallBoxVertical}>
                <View >
                    <Text testID={`${props.id}@stars`}>{myFormat(props.stargazersCount)}</Text>
                </View>
                <View>
                    <Text>Stars</Text>
                </View>
            </View>
            <View style={styles.smallBoxVertical}>
                <View >
                    <Text testID={`${props.id}@forks`}>{myFormat(props.forksCount)}</Text>
                </View>
                <View>
                    <Text>Forks</Text>
                </View>
            </View>
            <View style={styles.smallBoxVertical}>
                <View >
                    <Text testID={`${props.id}@review`}>{myFormat(props.reviewCount)}</Text>
                </View>
                <View>
                    <Text>Reviews</Text>
                </View>
            </View>
            <View style={styles.smallBoxVertical}>
                <View >
                    <Text testID={`${props.id}@rating`}>{myFormat(props.ratingAverage)}</Text>
                </View>
                <View>
                    <Text>Ratings</Text>
                </View>
            </View>
        </View>
    </View>
    )
}

export default RepositoryItem;
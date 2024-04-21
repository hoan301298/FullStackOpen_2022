import { Picker } from "@react-native-picker/picker"
import * as React from 'react';


const PickerSorting = ({sortedWay, setSortedWay}) => {
    return (
        <Picker
            selectedValue={sortedWay}
            onValueChange={(sort) => setSortedWay(sort)}
        >
        <Picker.Item label="Latest repositories" value="latest_repos" />
        <Picker.Item label="Highest rated repositories" value="highest_rated_repos" />
        <Picker.Item label="Lowest rated repositories" value="lowest_rated_repos" />
        </Picker>
    )
}

export default PickerSorting;
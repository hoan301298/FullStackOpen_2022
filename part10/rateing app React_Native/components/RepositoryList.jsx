import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import {withRouter} from 'react-router-native'
import PickerSorting from './PickerSorting';
import FilterInput from './FilterInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {filter, setFilter, sortedWay, setSortedWay} = this.props;
    return (
      <>
        <FilterInput filter={filter} setFilter={setFilter} />
        <PickerSorting sortedWay={sortedWay} setSortedWay={setSortedWay} />
      </>
    )
  }

  render() {
    const {repositories, history, onEndReach} = this.props;

    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({item}) => (
          <Pressable onPress={() => {
            history.push(`/${item.id}`)
          }}>
          <RepositoryItem  
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            forksCount={item.forksCount}
            stargazersCount={item.stargazersCount}
            reviewCount={item.reviewCount}
            ratingAverage={item.ratingAverage}
            ownerAvatarUrl={item.ownerAvatarUrl}
            id={item.id}
          />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortedWay, setSortedWay] = useState('lowest_rated_repos');
  const [filter, setFilter] = useState("");
  const { repositories, fetchMore } = useRepositories({sortedWay, filter, first: 5});

  const onEndReach = () => {
    fetchMore();
  };

  const RepoListWithRouter = withRouter(RepositoryListContainer);
 
  return <RepoListWithRouter repositories={repositories} sortedWay={sortedWay} setSortedWay={setSortedWay}  setFilter={setFilter}  filter={filter} onEndReach={onEndReach}/>
}


export default RepositoryList;
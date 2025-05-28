import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useWeatherStore } from '@/store/weatherStore';
import SearchBar from '@/components/SearchBar';
import CityListItem from '@/components/CityListItem';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { Search as SearchIcon } from 'lucide-react-native';

export default function SearchScreen() {
  const router = useRouter();
  const { searchResults, searchLocation, fetchWeather, fetchForecast } = useWeatherStore();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    searchLocation(query);
    setHasSearched(query.length > 0);
  };

  const handleCitySelect = async (cityId: string) => {
    await fetchWeather(cityId);
    await fetchForecast(cityId);
    router.push(`/city/${cityId}`);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CityListItem city={item} onPress={handleCitySelect} />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        hasSearched ? (
          <EmptyState 
            message="No cities found. Try a different search term." 
            icon={<SearchIcon size={64} color={Colors.light.textSecondary} />}
          />
        ) : (
          <EmptyState 
            message="Search for a city to see weather information." 
            icon={<SearchIcon size={64} color={Colors.light.textSecondary} />}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    flexGrow: 1,
  },
});
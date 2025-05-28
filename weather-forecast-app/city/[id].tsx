import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useWeatherStore } from '@/store/weatherStore';
import WeatherCard from '@/components/WeatherCard';
import ForecastItem from '@/components/ForecastItem';
import LoadingIndicator from '@/components/LoadingIndicator';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { ArrowLeft, Heart } from 'lucide-react-native';

export default function CityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { 
    currentWeather, 
    forecast, 
    favoriteLocations,
    isLoading, 
    error,
    fetchWeather, 
    fetchForecast,
    addFavorite,
    removeFavorite
  } = useWeatherStore();

  useEffect(() => {
    if (id) {
      loadWeatherData(id);
    }
  }, [id]);

  const loadWeatherData = async (cityId: string) => {
    await fetchWeather(cityId);
    await fetchForecast(cityId);
  };

  const handleRefresh = () => {
    if (id) {
      loadWeatherData(id);
    }
  };

  const handleFavoriteToggle = () => {
    if (!id) return;
    
    if (favoriteLocations.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const isFavorite = id ? favoriteLocations.includes(id) : false;

  // Set the header title to the city name
  useEffect(() => {
    if (currentWeather) {
      // This will update the header title
    }
  }, [currentWeather]);

  if (isLoading && !currentWeather) {
    return <LoadingIndicator message="Fetching weather data..." />;
  }

  if (error && !currentWeather) {
    return <EmptyState message={`Something went wrong. ${error}`} />;
  }

  if (!currentWeather) {
    return <EmptyState message="No weather data available." />;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: currentWeather.city,
          headerRight: () => (
            <Heart
              size={24}
              color={isFavorite ? Colors.light.secondary : Colors.light.textSecondary}
              fill={isFavorite ? Colors.light.secondary : 'none'}
              onPress={handleFavoriteToggle}
              style={{ marginRight: 16 }}
            />
          ),
          headerLeft: () => (
            <ArrowLeft
              size={24}
              color={Colors.light.primary}
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            />
          ),
        }}
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
      >
        <WeatherCard 
          weather={currentWeather}
          isFavorite={isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
        />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind Speed</Text>
              <Text style={styles.detailValue}>{currentWeather.windSpeed} km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pressure</Text>
              <Text style={styles.detailValue}>{currentWeather.pressure} hPa</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Visibility</Text>
              <Text style={styles.detailValue}>{currentWeather.visibility} km</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.forecastContainer}>
          <Text style={styles.sectionTitle}>7-Day Forecast</Text>
          <View style={styles.forecastList}>
            {forecast.map((item, index) => (
              <ForecastItem key={index} forecast={item} />
            ))}
          </View>
        </View>
        
        <View style={styles.updatedContainer}>
          <Text style={styles.updatedText}>
            Last updated: {new Date(currentWeather.updatedAt).toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  detailsContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    paddingVertical: 8,
    paddingRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  forecastContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  forecastList: {
    // No specific styles needed
  },
  updatedContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  updatedText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});
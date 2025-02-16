import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const InvestmentScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [visitedSections, setVisitedSections] = useState(new Set());

  const investments = [
    { name: 'Real Estate Investments', color: '#8E44AD', icon: 'home-outline', screen: 'RealEstateInvestment' },
    { name: 'Technology Investments', color: '#E74C3C', icon: 'laptop-outline', screen: 'TechnologyInvestment' },
    { name: 'Agriculture Investments', color: '#27AE60', icon: 'leaf-outline', screen: 'AgricultureInvestment' },
    { name: 'Education Investments', color: '#3498DB', icon: 'school-outline', screen: 'EducationInvestment' },
    { name: 'Others', color: '#F1C40F', icon: 'ellipsis-horizontal-outline', screen: 'OthersInvestment' },
  ];

  const handlePress = (index, screen) => {
    if (!visitedSections.has(index)) {
      const newVisitedSections = new Set(visitedSections);
      newVisitedSections.add(index);
      setVisitedSections(newVisitedSections);
      setProgress(newVisitedSections.size / investments.length);
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E2749', '#283C63']} style={styles.header}>
        <Text style={styles.headerText}>Investments</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subHeader}>Select how you want to invest</Text>
        {investments.map((investment, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: investment.color }]}
            onPress={() => handlePress(index, investment.screen)}
          >
            <Ionicons name={investment.icon} size={32} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>{investment.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        <Text style={styles.progressText}>{Math.round(progress * 100)}% Complete</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('IndexScreen')}>
          <Ionicons name="home-outline" size={28} color="#1E88E5" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('InversionsScreen')}>
          <Ionicons name="stats-chart-outline" size={28} color="#1E88E5" />
          <Text style={styles.navText}>Investments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserScreen')}>
          <Ionicons name="person-outline" size={28} color="#1E88E5" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafa',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E88E5',
    alignSelf: 'flex-start',
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#1E88E5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E2749',
  },
});

export default InvestmentScreen;

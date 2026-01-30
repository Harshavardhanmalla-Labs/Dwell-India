import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { Search, Filter, MapPin, Shield, ChevronRight, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MOCK_PROPERTIES = [
    { id: '1', title: 'Skyline Heights - Premium 3BHK', Price: '₹1.45 Cr', area: '1850sqft', location: 'Gachibowli, Hyderabad', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80', isVerified: true },
    { id: '2', title: 'Green Meadows Luxury Plot', Price: '₹85 Lakh', area: '240sqyd', location: 'Kondapur, Hyderabad', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', isVerified: true },
    { id: '3', title: 'Modern Villa at Jubilee Hills', Price: '₹4.20 Cr', area: '4500sqft', location: 'Jubilee Hills, Hyd', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80', isVerified: true },
];

export default function MarketplaceScreen({ onBack }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <X size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Explore Dwell</Text>
                <TouchableOpacity>
                    <Filter size={20} color="#0f172a" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <Search size={20} color="#94a3b8" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search '3BHK in Gachibowli'..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Verified Listings</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>

                {MOCK_PROPERTIES.map((prop) => (
                    <TouchableOpacity key={prop.id} style={styles.propCard}>
                        <Image source={{ uri: prop.image }} style={styles.propImage} />
                        {prop.isVerified && (
                            <View style={styles.badge}>
                                <Shield size={10} color="#fff" />
                                <Text style={styles.badgeText}>DWELL VERIFIED</Text>
                            </View>
                        )}
                        <View style={styles.propDetails}>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>{prop.Price}</Text>
                                <Text style={styles.area}>{prop.area}</Text>
                            </View>
                            <Text style={styles.title}>{prop.title}</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={12} color="#64748b" />
                                <Text style={styles.location}>{prop.location}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        marginHorizontal: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#0f172a',
    },
    scrollContent: {
        padding: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    seeAll: {
        fontSize: 14,
        color: '#2563eb',
        fontWeight: '600',
    },
    propCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    propImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#f1f5f9',
    },
    badge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#22c55e',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 99,
        gap: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '900',
    },
    propDetails: {
        padding: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '900',
        color: '#2563eb',
    },
    area: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    location: {
        fontSize: 12,
        color: '#64748b',
    }
});

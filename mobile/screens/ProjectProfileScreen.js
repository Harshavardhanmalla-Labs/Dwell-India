import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, FlatList } from 'react-native';
import { ShieldCheck, MapPin, Building2, CheckCircle, ArrowRight, Download, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const AMENITIES = [
    { id: '1', name: 'Swimming Pool', icon: '🏊' },
    { id: '2', name: 'Gymnasium', icon: '🏋️' },
    { id: '3', name: 'Clubhouse', icon: '🏠' },
    { id: '4', name: 'Kids Play Area', icon: '🎠' },
    { id: '5', name: '24/7 Security', icon: '🛡️' },
];

const UNITS = [
    { id: '101', type: '3BHK', size: '1850 Sq.Ft', price: '₹1.45 Cr', status: 'Available' },
    { id: '102', type: '2BHK', size: '1250 Sq.Ft', price: '₹95 Lakh', status: 'Available' },
    { id: '201', type: '3BHK', size: '1900 Sq.Ft', price: '₹1.52 Cr', status: 'Reserved' },
    { id: '304', type: 'Penthouse', size: '3200 Sq.Ft', price: '₹3.10 Cr', status: 'Available' },
];

export default function ProjectProfileScreen({ onBack }) {
    const [activeTab, setActiveTab] = useState('Overview');
    const [stagingStyle, setStagingStyle] = useState('Empty');

    const renderStaging = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Virtual Staging</Text>
            <View style={styles.stagingContainer}>
                <Image
                    source={{
                        uri: stagingStyle === 'Empty'
                            ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
                            : stagingStyle === 'Modern'
                                ? 'https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&w=800&q=80'
                                : 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
                    }}
                    style={styles.stagingImage}
                />
                <View style={[styles.aiBadge, { position: 'absolute', top: 15, right: 15 }]}>
                    <Text style={styles.aiBadgeText}>DWELL AI RENDER</Text>
                </View>
            </View>
            <View style={styles.stagingTabs}>
                {['Empty', 'Modern', 'Minimalist'].map((style) => (
                    <TouchableOpacity
                        key={style}
                        style={[styles.stagingTab, stagingStyle === style && styles.activeStagingTab]}
                        onPress={() => setStagingStyle(style)}
                    >
                        <Text style={[styles.stagingTabText, stagingStyle === style && styles.activeStagingTabText]}>{style}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
                {/* Project Hero Header */}
                <View style={styles.hero}>
                    <View style={styles.heroOverlay} />
                    <View style={styles.heroContent}>
                        <View style={styles.verifiedBadge}>
                            <ShieldCheck size={16} color="#22c55e" />
                            <Text style={styles.verifiedText}>DWELL VERIFIED PROJECT</Text>
                        </View>
                        <Text style={styles.projectName}>Skyline Heights</Text>
                        <View style={styles.locationRow}>
                            <MapPin size={16} color="#94a3b8" />
                            <Text style={styles.locationText}>Gachibowli, Hyderabad</Text>
                        </View>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    {['Overview', 'Units', 'Staged', 'Amenities', 'Documents'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {activeTab === 'Overview' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Project</Text>
                        <Text style={styles.description}>
                            Skyline Heights is a state-of-the-art residential complex designed for modern living.
                            Located in the heart of Gachibowli, it offers seamless connectivity to Hitech city and major IT hubs.
                        </Text>
                        <View style={styles.reraBox}>
                            <Text style={styles.reraLabel}>RERA ID</Text>
                            <Text style={styles.reraValue}>TS/RERA/2023/102</Text>
                            <CheckCircle size={16} color="#22c55e" style={styles.reraIcon} />
                        </View>
                    </View>
                )}

                {activeTab === 'Staged' && renderStaging()}

                {activeTab === 'Units' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Unit Availability</Text>
                        {UNITS.map((unit) => (
                            <View key={unit.id} style={styles.unitCard}>
                                <View style={styles.unitInfo}>
                                    <Text style={styles.unitType}>{unit.type} - {unit.id}</Text>
                                    <Text style={styles.unitSize}>{unit.size}</Text>
                                </View>
                                <View style={styles.unitPriceAction}>
                                    <Text style={styles.unitPrice}>{unit.price}</Text>
                                    <View style={[styles.statusTag, unit.status === 'Reserved' && styles.statusReserved]}>
                                        <Text style={styles.statusText}>{unit.status}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'Amenities' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Project Amenities</Text>
                        <View style={styles.amenityGrid}>
                            {AMENITIES.map((item) => (
                                <View key={item.id} style={styles.amenityItem}>
                                    <Text style={styles.amenityIcon}>{item.icon}</Text>
                                    <Text style={styles.amenityName}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {activeTab === 'Documents' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Verified Documents</Text>
                        <View style={styles.docItem}>
                            <Building2 size={24} color="#2563eb" />
                            <View style={styles.docInfo}>
                                <Text style={styles.docName}>Building Layout Approval</Text>
                                <Text style={styles.docSize}>PDF • 2.4 MB</Text>
                            </View>
                            <Download size={20} color="#64748b" />
                        </View>
                        <View style={styles.docItem}>
                            <Info size={24} color="#2563eb" />
                            <View style={styles.docInfo}>
                                <Text style={styles.docName}>Land Title Certificate</Text>
                                <Text style={styles.docSize}>Verified by Dwell Legal</Text>
                            </View>
                            <CheckCircle size={20} color="#22c55e" />
                        </View>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <View style={styles.fab}>
                <TouchableOpacity style={styles.contactBtn}>
                    <Text style={styles.contactBtnText}>Contact Developer</Text>
                    <ArrowRight size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                    <Text style={styles.backBtnText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    hero: {
        height: 220,
        backgroundColor: '#1e293b',
        justifyContent: 'flex-end',
        padding: 24,
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    heroContent: {
        zIndex: 1,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 12,
    },
    verifiedText: {
        color: '#22c55e',
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    projectName: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    locationText: {
        color: '#cbd5e1',
        fontSize: 14,
        marginLeft: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingHorizontal: 16,
    },
    tab: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#2563eb',
    },
    tabText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#2563eb',
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
    },
    reraBox: {
        marginTop: 24,
        backgroundColor: '#f8fafc',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    reraLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
        marginRight: 12,
    },
    reraValue: {
        flex: 1,
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    reraIcon: {
        marginLeft: 8,
    },
    unitCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 12,
    },
    unitType: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    unitSize: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    unitPriceAction: {
        alignItems: 'flex-end',
    },
    unitPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#2563eb',
    },
    statusTag: {
        marginTop: 4,
        backgroundColor: '#dcfce7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusReserved: {
        backgroundColor: '#fee2e2',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#166534',
    },
    amenityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    amenityItem: {
        width: (width - 72) / 3,
        backgroundColor: '#f8fafc',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    amenityIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    amenityName: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        color: '#475569',
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        marginBottom: 12,
    },
    docInfo: {
        flex: 1,
        marginLeft: 16,
    },
    docName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    docSize: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        flexDirection: 'row',
        gap: 12,
    },
    contactBtn: {
        flex: 2,
        backgroundColor: '#2563eb',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    contactBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    backBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    backBtnText: {
        color: '#64748b',
        fontSize: 16,
        fontWeight: '600',
    },
    stagingContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        height: 250,
        backgroundColor: '#f1f5f9',
    },
    stagingImage: {
        width: '100%',
        height: '100%',
    },
    aiBadge: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    aiBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    stagingTabs: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10,
    },
    stagingTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    activeStagingTab: {
        backgroundColor: '#2563eb',
    },
    stagingTabText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    activeStagingTabText: {
        color: '#fff',
    },
});

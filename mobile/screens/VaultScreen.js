import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Dimensions, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as ScreenCapture from 'expo-screen-capture';
import { Shield, Lock, FileText, ChevronRight, Fingerprint, Eye, EyeOff, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function VaultScreen({ onBack }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewingDoc, setViewingDoc] = useState(null);

    // Disable screenshots for this screen
    useEffect(() => {
        let subscription;
        const enableCapture = async () => {
            await ScreenCapture.preventScreenCaptureAsync();
        };
        enableCapture();

        return () => {
            ScreenCapture.allowScreenCaptureAsync();
        };
    }, []);

    const handleBiometricAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
            Alert.alert('Security Error', 'Biometric hardware not found or not set up.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Unlock Secure Data Vault',
            fallbackLabel: 'Enter Passcode',
        });

        if (result.success) {
            setIsAuthenticated(true);
            fetchDocuments();
        }
    };

    const fetchDocuments = () => {
        setLoading(true);
        // Simulating encrypted fetch from backend (Dwell Private Cloud)
        // Nothing is stored locally
        setTimeout(() => {
            setDocuments([
                { id: '1', title: 'Verified Aadhaar', type: 'Identity', date: '24 Jan 2026', size: '1.2 MB' },
                { id: '2', title: 'Sale Deed - Flat 402', type: 'Ownership', date: '15 Jan 2026', size: '4.5 MB' },
                { id: '3', title: 'Encumbrance Certificate', type: 'Legal', date: '10 Jan 2026', size: '2.1 MB' },
                { id: '4', title: 'Property Tax Receipt', type: 'Tax', date: '05 Jan 2026', size: '0.8 MB' },
            ]);
            setLoading(false);
        }, 1500);
    };

    if (!isAuthenticated) {
        return (
            <View style={styles.authContainer}>
                <View style={styles.lockIconCircle}>
                    <Lock size={40} color="#3b82f6" />
                </View>
                <Text style={styles.authTitle}>Secure Data Vault</Text>
                <Text style={styles.authSubtitle}>
                    Encrypted documents stored in Dwell Private Cloud. No data is stored on this device.
                </Text>

                <TouchableOpacity style={styles.authButton} onPress={handleBiometricAuth}>
                    <Fingerprint size={24} color="#fff" />
                    <Text style={styles.authButtonText}>Unlock with Biometrics</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>Cancel</Text>
                </TouchableOpacity>

                <View style={styles.securityBadge}>
                    <Shield size={14} color="#22c55e" />
                    <Text style={styles.securityText}>AES-256 Cloud Encryption Active</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.vaultContainer}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Dwell Vault</Text>
                    <Text style={styles.headerSubtitle}>Encrypted Session Active</Text>
                </View>
                <TouchableOpacity onPress={onBack} style={styles.closeBtn}>
                    <X size={24} color="#1e293b" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.alertBox}>
                    <EyeOff size={16} color="#ef4444" />
                    <Text style={styles.alertText}>Screen capture disabled. Data will clear once session ends.</Text>
                </View>

                {loading ? (
                    <Text style={styles.loadingText}>Decrypting documents...</Text>
                ) : (
                    documents.map((doc) => (
                        <TouchableOpacity
                            key={doc.id}
                            style={styles.docCard}
                            onPress={() => setViewingDoc(doc)}
                        >
                            <View style={[styles.docIcon, { backgroundColor: getDocColor(doc.type) }]}>
                                <FileText size={20} color="#fff" />
                            </View>
                            <View style={styles.docInfo}>
                                <Text style={styles.docTitle}>{doc.title}</Text>
                                <Text style={styles.docMeta}>{doc.type} • {doc.date}</Text>
                            </View>
                            <ChevronRight size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {viewingDoc && (
                <View style={styles.docViewerOverlay}>
                    <View style={styles.docViewer}>
                        <View style={styles.docViewerHeader}>
                            <Text style={styles.docViewerTitle}>{viewingDoc.title}</Text>
                            <TouchableOpacity onPress={() => setViewingDoc(null)}>
                                <X size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.docPlaceholder}>
                            <Shield size={60} color="#3b82f6" />
                            <Text style={styles.placeholderText}>SECURE VIEW ACTIVE</Text>
                            <Text style={styles.placeholderSub}>Streaming document in memory...</Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.vaultFooter}>
                <Text style={styles.footerText}>Secure Session ID: {Math.random().toString(36).substring(7).toUpperCase()}</Text>
                <TouchableOpacity onPress={() => setIsAuthenticated(false)}>
                    <Text style={styles.lockOutText}>Lock Vault</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const getDocColor = (type) => {
    switch (type) {
        case 'Identity': return '#8b5cf6';
        case 'Ownership': return '#2563eb';
        case 'Legal': return '#059669';
        case 'Tax': return '#d97706';
        default: return '#64748b';
    }
};

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    lockIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    authTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 15,
    },
    authSubtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    authButton: {
        flexDirection: 'row',
        backgroundColor: '#2563eb',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    authButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    backButton: {
        marginTop: 20,
        padding: 10,
    },
    backButtonText: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
    securityBadge: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    securityText: {
        fontSize: 12,
        color: '#22c55e',
        fontWeight: '600',
    },
    vaultContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#059669',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    closeBtn: {
        padding: 8,
    },
    scrollContent: {
        padding: 25,
    },
    alertBox: {
        backgroundColor: '#fef2f2',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 25,
    },
    alertText: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '600',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#64748b',
        fontSize: 14,
    },
    docCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    docIcon: {
        width: 44,
        height: 44,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    docInfo: {
        flex: 1,
        marginLeft: 15,
    },
    docTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    docMeta: {
        fontSize: 12,
        color: '#64748b',
    },
    docViewerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        zIndex: 2000,
        paddingTop: 50,
    },
    docViewer: {
        flex: 1,
        padding: 20,
    },
    docViewerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    docViewerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
    },
    docPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: '#3b82f6',
        fontSize: 24,
        fontWeight: '900',
        marginTop: 20,
        letterSpacing: 2,
    },
    placeholderSub: {
        color: '#64748b',
        marginTop: 10,
        fontSize: 14,
    },
    vaultFooter: {
        padding: 25,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#94a3b8',
        fontFamily: 'monospace',
    },
    lockOutText: {
        color: '#ef4444',
        fontWeight: '700',
        fontSize: 14,
    }
});

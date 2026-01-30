import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Camera } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LiveVerificationScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isRecording, setIsRecording] = useState(false);

    // Mock progress simulation for the 360 tour
    useEffect(() => {
        let interval;
        if (isRecording && progress < 100) {
            interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 2, 100));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRecording, progress]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Live 360° Verification</Text>
                <Text style={styles.headerSubtitle}>Proves physical access to the property</Text>
            </View>

            <View style={styles.cameraContainer}>
                {/* Mock Camera Viewfinder */}
                <View style={styles.viewfinder}>
                    <View style={styles.geofenceOverlay}>
                        <Text style={styles.geofenceText}>📍 GACHIBOWLI, HYD 500032</Text>
                        <Text style={styles.accuracyText}>Accuracy: 98.4% (GTP-45)</Text>
                    </View>

                    <View style={styles.overlay}>
                        <Text style={styles.instructionText}>
                            {progress === 0 ? "Slowly rotate in a full circle" :
                                progress < 100 ? `Truth Engine Processing... ${progress}%` : "Verification Data Captured"}
                        </Text>
                    </View>

                    {/* AI Box Indicators */}
                    <View style={[styles.aiBox, { top: 120, left: 60, width: 100, height: 150 }]}>
                        <Text style={styles.aiLabel}>[WALL_DETECTION]</Text>
                    </View>
                    <View style={[styles.aiBox, { bottom: 80, right: 40, width: 120, height: 80 }]}>
                        <Text style={styles.aiLabel}>[FLOOR_AREA_VAL]</Text>
                    </View>

                    {/* Progress Ring Overlay */}
                    <View style={[styles.progressRing, { borderLeftColor: progress > 25 ? '#22c55e' : '#cbd5e1' }]} />
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.securityBadge}>
                    <Text style={styles.securityText}>🛡️ SECURE LIVE CAPTURE | GEOTAGGED</Text>
                </View>

                {!isRecording ? (
                    <TouchableOpacity
                        style={styles.recordButton}
                        onPress={() => setIsRecording(true)}
                    >
                        <View style={styles.recordOuter}>
                            <View style={styles.recordInner} />
                        </View>
                        <Text style={styles.recordButtonText}>Start 360° Capture</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.statusContainer}>
                        {progress < 100 ? (
                            <Text style={styles.recordingText}>Keep rotating slowly...</Text>
                        ) : (
                            <TouchableOpacity style={styles.finishButton} onPress={onComplete}>
                                <Text style={styles.finishButtonText}>Submit Verification</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <Text style={styles.warningText}>
                    Gallery uploads are disabled for security. Video must be captured live.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        padding: 24,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'System',
    },
    headerSubtitle: {
        color: '#94a3b8',
        fontSize: 14,
        marginTop: 4,
    },
    cameraContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    viewfinder: {
        aspectRatio: 3 / 4,
        backgroundColor: '#1e293b',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    geofenceOverlay: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 10,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#3b82f6',
    },
    geofenceText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
    },
    accuracyText: {
        color: '#94a3b8',
        fontSize: 8,
        marginTop: 2,
    },
    aiBox: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.05)',
        padding: 5,
    },
    aiLabel: {
        fontSize: 6,
        color: '#22c55e',
        fontWeight: '900',
        backgroundColor: '#0f172a',
        paddingHorizontal: 2,
        position: 'absolute',
        top: -4,
        left: 4,
    },
    overlay: {
        position: 'absolute',
        top: 100,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    instructionText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    footer: {
        padding: 32,
        alignItems: 'center',
    },
    securityBadge: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.2)',
        marginBottom: 24,
    },
    securityText: {
        color: '#22c55e',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    recordButton: {
        alignItems: 'center',
    },
    recordOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    recordInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ef4444',
    },
    recordButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    statusContainer: {
        width: '100%',
        alignItems: 'center',
    },
    recordingText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    finishButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 32,
    },
    finishButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    warningText: {
        color: '#64748b',
        fontSize: 11,
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 16,
    }
});

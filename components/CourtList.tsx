import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Court } from '@/types/supabase';

type Props = {
  courts: Court[];
  selectedDate: Date;
};

export default function CourtList({ courts, selectedDate }: Props) {
  const timeSlots = [];
  const startHour = 9; // 9:00
  const endHour = 23; // 23:00

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {courts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Aucun terrain disponible</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {/* Time column */}
          <View style={styles.timeColumn}>
            <View style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>Heure</Text>
            </View>
            {timeSlots.map((time) => (
              <View key={time} style={styles.cell}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
            ))}
          </View>

          {/* Court columns */}
          {courts.map((court) => (
            <View key={court.id} style={styles.courtColumn}>
              <View style={[styles.cell, styles.headerCell]}>
                <Text style={styles.headerText}>{court.name}</Text>
              </View>
              {timeSlots.map((time) => (
                <View key={`${court.id}-${time}`} style={styles.cell}>
                  {/* Booking status will be implemented here */}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 80,
  },
  courtColumn: {
    width: 120,
  },
  cell: {
    height: 60,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerCell: {
    backgroundColor: '#f8fafc',
    height: 50,
  },
  headerText: {
    fontWeight: '600',
    color: '#1e293b',
  },
  timeText: {
    color: '#64748b',
    fontSize: 12,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
  },
});
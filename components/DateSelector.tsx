import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

type Props = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function DateSelector({ selectedDate, onSelectDate }: Props) {
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {dates.map((date) => {
        const isSelected = isSameDay(date, selectedDate);
        return (
          <TouchableOpacity
            key={date.toISOString()}
            style={[styles.dateButton, isSelected && styles.selectedDate]}
            onPress={() => onSelectDate(date)}
          >
            <Text style={[styles.dayName, isSelected && styles.selectedText]}>
              {format(date, 'EEE', { locale: fr })}
            </Text>
            <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
              {format(date, 'd')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  content: {
    padding: 12,
  },
  dateButton: {
    width: 60,
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f8fafc',
  },
  selectedDate: {
    backgroundColor: '#2563eb',
  },
  dayName: {
    fontSize: 13,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  selectedText: {
    color: '#fff',
  },
});
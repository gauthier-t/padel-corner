import { View, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Court } from '@/types/supabase';
import DateSelector from '@/components/DateSelector';
import CourtList from '@/components/CourtList';

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    loadCourts();
  }, []);

  async function loadCourts() {
    const { data, error } = await supabase
      .from('courts')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (!error && data) {
      setCourts(data);
    }
  }

  return (
    <View style={styles.container}>
      <DateSelector
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <CourtList
        courts={courts}
        selectedDate={selectedDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
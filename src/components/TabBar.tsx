
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Map, BarChart2, Settings } from 'lucide-react-native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabBarProps {
  currentRoute: string;
  onTabPress?: (routeName: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ currentRoute, onTabPress }) => {
  const insets = useSafeAreaInsets();
  const tabs = [
    {
      route: 'Accueil',
      label: 'Accueil',
      icon: Home,
      description: '',
    },
    {
      route: 'MapPage',
      label: 'Carte',
      icon: Map,
      description: '',
    },
    {
      route: 'Statistiques',
      label: 'Stats',
      icon: BarChart2,
      description: '',
    },
    {
      route: 'Parametres',
      label: 'Réglages',
      icon: Settings,
      description: '',
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom:  5 }]}> 
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        const IconComponent = tab.icon;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => onTabPress && onTabPress(tab.route)}
          >
            <IconComponent
              size={20}
              color={isActive ? '#FF8C00' : '#555'}
            />
            <Text style={[
              styles.label,
              isActive && styles.activeLabel
            ]}>
              {tab.label}
            </Text>
            {isActive && (
              <Text style={styles.description}>
                {tab.description}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 0,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  label: {
    fontSize: 12,
    color: '#555555',
     fontWeight: '600',
  },
  activeLabel: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  description: {
    fontSize: 10,
    color: '#888888',
    marginTop: 0,
    textAlign: 'center',
  },
});

export default TabBar;
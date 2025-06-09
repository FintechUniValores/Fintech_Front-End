export interface Theme {
  backgroundColor: string;
  cardBackgroundColor: string;
  text: string;
  secondaryText?: string;
  primary: string;
  secondary?: string;
  white: string;
}

export const lightTheme: Theme = {
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#F8F8F8',
  text: '#333333',
  secondaryText: '#666666',
  primary: '#CD0B30',
  secondary: 'rgba(205, 11, 48, 0.6)',
  white: '#FFFFFF',
};

export const darkTheme: Theme = {
  backgroundColor: '#282828',
  cardBackgroundColor: '#1E1E1E',
  text: '#FFFFFF',
  secondaryText: '#A9A9A9',
  primary: '#CD0B30',
  secondary: 'rgba(205, 11, 48, 0.6)',
  white: '#FFFFFF',
};

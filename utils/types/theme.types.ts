export type ThemeTypes = 'dark' | 'light';

interface Theme {
	background: string;
	plainBackground: string;
	dialogBackground: string;
	primary: string;
	secondary: string;
	text: string;
	white: string;
	grey: string;
	black: string;
	blue: string;
}

export interface ThemeProps {
	theme: Theme;
}

import { z } from 'zod';

export const ForecastDaySchema = z.object({
	day: z.string(),
	date: z.string(),
	condition: z.enum(['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm', 'Heavy Rain']),
	icon: z.string(),
	high: z.number(),
	low: z.number(),
	rainfall: z.number(), // in mm
	trendTemp: z.number() // daily representative forecast temperature for spline graph
});

export const AlertSchema = z.object({
	id: z.string(),
	severity: z.enum(['info', 'warning', 'critical']),
	title: z.string(),
	description: z.string(),
	actionLabel: z.string(),
	timestamp: z.string(),
	issuingAuthority: z.string()
});

export const CityWeatherSchema = z.object({
	id: z.string(),
	name: z.string(),
	state: z.string(),
	country: z.string(),
	formattedLocation: z.string(),
	coordinates: z.object({ lat: z.number(), lon: z.number() }),
	current: z.object({
		temp: z.number(),
		feelsLike: z.number(),
		todayMin: z.number(),
		todayMax: z.number(),
		condition: z.string(),
		icon: z.string(),
		humidity: z.number(),
		pressure: z.number(),
		windSpeed: z.number(),
		visibility: z.number(),
		uvIndex: z.number()
	}),
	dailyTrend: z.array(
		z.object({
			dayLabel: z.string(),
			dateLabel: z.string(),
			temp: z.number(),
			high: z.number(),
			low: z.number()
		})
	),
	upcomingForecast: z.array(ForecastDaySchema),
	alert: AlertSchema
});

export type ForecastDay = z.infer<typeof ForecastDaySchema>;
export type CityWeather = z.infer<typeof CityWeatherSchema>;
export type WeatherAlert = z.infer<typeof AlertSchema>;

export const CITIES_WEATHER_DATA: Record<string, CityWeather> = {
	'new-delhi': {
		id: 'new-delhi',
		name: 'New Delhi',
		state: 'Delhi',
		country: 'India',
		formattedLocation: '📍 New Delhi, India',
		coordinates: { lat: 28.6139, lon: 77.209 },
		current: {
			temp: 34,
			feelsLike: 36,
			todayMin: 24,
			todayMax: 38,
			condition: 'Partly Cloudy',
			icon: 'SunCloud',
			humidity: 45,
			pressure: 1012,
			windSpeed: 14,
			visibility: 10,
			uvIndex: 7
		},
		dailyTrend: [
			{ dayLabel: 'Thu', dateLabel: '29 May', temp: 34, high: 38, low: 24 },
			{ dayLabel: 'Fri', dateLabel: '30 May', temp: 33, high: 35, low: 26 },
			{ dayLabel: 'Sat', dateLabel: '31 May', temp: 31, high: 34, low: 25 },
			{ dayLabel: 'Sun', dateLabel: '01 Jun', temp: 32, high: 36, low: 24 },
			{ dayLabel: 'Mon', dateLabel: '02 Jun', temp: 35, high: 39, low: 27 },
			{ dayLabel: 'Tue', dateLabel: '03 Jun', temp: 37, high: 40, low: 28 },
			{ dayLabel: 'Wed', dateLabel: '04 Jun', temp: 36, high: 39, low: 27 },
			{ dayLabel: 'Thu', dateLabel: '05 Jun', temp: 34, high: 37, low: 25 }
		],
		upcomingForecast: [
			{
				day: 'Friday',
				date: '30 May',
				condition: 'Light Rain',
				icon: 'CloudRain',
				high: 33,
				low: 26,
				rainfall: 18,
				trendTemp: 33
			},
			{
				day: 'Saturday',
				date: '31 May',
				condition: 'Partly Cloudy',
				icon: 'SunCloud',
				high: 34,
				low: 25,
				rainfall: 4,
				trendTemp: 31
			},
			{
				day: 'Sunday',
				date: '01 June',
				condition: 'Sunny',
				icon: 'Sun',
				high: 36,
				low: 24,
				rainfall: 0,
				trendTemp: 32
			},
			{
				day: 'Monday',
				date: '02 June',
				condition: 'Sunny',
				icon: 'Sun',
				high: 39,
				low: 27,
				rainfall: 0,
				trendTemp: 35
			},
			{
				day: 'Tuesday',
				date: '03 June',
				condition: 'Cloudy',
				icon: 'Cloud',
				high: 40,
				low: 28,
				rainfall: 2,
				trendTemp: 37
			},
			{
				day: 'Wednesday',
				date: '04 June',
				condition: 'Thunderstorm',
				icon: 'CloudLightning',
				high: 39,
				low: 27,
				rainfall: 25,
				trendTemp: 36
			},
			{
				day: 'Thursday',
				date: '05 June',
				condition: 'Partly Cloudy',
				icon: 'SunCloud',
				high: 37,
				low: 25,
				rainfall: 6,
				trendTemp: 34
			}
		],
		alert: {
			id: 'ALT-DEL-092',
			severity: 'info',
			title: 'ISRO Climate Telemetry Bulletin',
			description: 'Light rain expected across North India on Friday. INSAT-3DS satellite telemetry indicates incoming moisture pulse from Western Disturbance.',
			actionLabel: 'View Details →',
			timestamp: 'Updated 10 mins ago',
			issuingAuthority: 'ISRO Earth Observation System (MOSDAC) & IMD'
		}
	},
	mumbai: {
		id: 'mumbai',
		name: 'Mumbai',
		state: 'Maharashtra',
		country: 'India',
		formattedLocation: '📍 Mumbai, India',
		coordinates: { lat: 19.076, lon: 72.8777 },
		current: {
			temp: 31,
			feelsLike: 37,
			todayMin: 27,
			todayMax: 33,
			condition: 'Cloudy',
			icon: 'Cloud',
			humidity: 78,
			pressure: 1009,
			windSpeed: 22,
			visibility: 8,
			uvIndex: 8
		},
		dailyTrend: [
			{ dayLabel: 'Thu', dateLabel: '29 May', temp: 31, high: 33, low: 27 },
			{ dayLabel: 'Fri', dateLabel: '30 May', temp: 30, high: 32, low: 26 },
			{ dayLabel: 'Sat', dateLabel: '31 May', temp: 29, high: 31, low: 26 },
			{ dayLabel: 'Sun', dateLabel: '01 Jun', temp: 30, high: 32, low: 27 },
			{ dayLabel: 'Mon', dateLabel: '02 Jun', temp: 32, high: 34, low: 28 },
			{ dayLabel: 'Tue', dateLabel: '03 Jun', temp: 31, high: 33, low: 27 },
			{ dayLabel: 'Wed', dateLabel: '04 Jun', temp: 29, high: 31, low: 26 },
			{ dayLabel: 'Thu', dateLabel: '05 Jun', temp: 30, high: 32, low: 27 }
		],
		upcomingForecast: [
			{ day: 'Friday', date: '30 May', condition: 'Heavy Rain', icon: 'CloudRain', high: 32, low: 26, rainfall: 42, trendTemp: 30 },
			{ day: 'Saturday', date: '31 May', condition: 'Thunderstorm', icon: 'CloudLightning', high: 31, low: 26, rainfall: 35, trendTemp: 29 },
			{ day: 'Sunday', date: '01 June', condition: 'Light Rain', icon: 'CloudRain', high: 32, low: 27, rainfall: 14, trendTemp: 30 },
			{ day: 'Monday', date: '02 June', condition: 'Partly Cloudy', icon: 'SunCloud', high: 34, low: 28, rainfall: 5, trendTemp: 32 },
			{ day: 'Tuesday', date: '03 June', condition: 'Cloudy', icon: 'Cloud', high: 33, low: 27, rainfall: 8, trendTemp: 31 },
			{ day: 'Wednesday', date: '04 June', condition: 'Heavy Rain', icon: 'CloudRain', high: 31, low: 26, rainfall: 50, trendTemp: 29 },
			{ day: 'Thursday', date: '05 June', condition: 'Light Rain', icon: 'CloudRain', high: 32, low: 27, rainfall: 12, trendTemp: 30 }
		],
		alert: {
			id: 'ALT-BOM-104',
			severity: 'warning',
			title: 'ISRO OceanSat-3 Coastal Advisory',
			description: 'Monsoon onset surges off Konkan coast. High wave alerts and precipitation predicted for Mumbai metropolitan area.',
			actionLabel: 'View Details →',
			timestamp: 'Updated 5 mins ago',
			issuingAuthority: 'ISRO OceanSat Telemetry & INCOIS'
		}
	},
	bengaluru: {
		id: 'bengaluru',
		name: 'Bengaluru',
		state: 'Karnataka',
		country: 'India',
		formattedLocation: '📍 Bengaluru, India',
		coordinates: { lat: 12.9716, lon: 77.5946 },
		current: {
			temp: 27,
			feelsLike: 28,
			todayMin: 20,
			todayMax: 29,
			condition: 'Partly Cloudy',
			icon: 'SunCloud',
			humidity: 62,
			pressure: 1015,
			windSpeed: 16,
			visibility: 10,
			uvIndex: 9
		},
		dailyTrend: [
			{ dayLabel: 'Thu', dateLabel: '29 May', temp: 27, high: 29, low: 20 },
			{ dayLabel: 'Fri', dateLabel: '30 May', temp: 26, high: 28, low: 19 },
			{ dayLabel: 'Sat', dateLabel: '31 May', temp: 28, high: 30, low: 21 },
			{ dayLabel: 'Sun', dateLabel: '01 Jun', temp: 27, high: 29, low: 20 },
			{ dayLabel: 'Mon', dateLabel: '02 Jun', temp: 29, high: 31, low: 22 },
			{ dayLabel: 'Tue', dateLabel: '03 Jun', temp: 28, high: 30, low: 21 },
			{ dayLabel: 'Wed', dateLabel: '04 Jun', temp: 26, high: 28, low: 20 },
			{ dayLabel: 'Thu', dateLabel: '05 Jun', temp: 27, high: 29, low: 20 }
		],
		upcomingForecast: [
			{ day: 'Friday', date: '30 May', condition: 'Partly Cloudy', icon: 'SunCloud', high: 28, low: 19, rainfall: 3, trendTemp: 26 },
			{ day: 'Saturday', date: '31 May', condition: 'Sunny', icon: 'Sun', high: 30, low: 21, rainfall: 0, trendTemp: 28 },
			{ day: 'Sunday', date: '01 June', condition: 'Light Rain', icon: 'CloudRain', high: 29, low: 20, rainfall: 10, trendTemp: 27 },
			{ day: 'Monday', date: '02 June', condition: 'Sunny', icon: 'Sun', high: 31, low: 22, rainfall: 0, trendTemp: 29 },
			{ day: 'Tuesday', date: '03 June', condition: 'Thunderstorm', icon: 'CloudLightning', high: 30, low: 21, rainfall: 22, trendTemp: 28 },
			{ day: 'Wednesday', date: '04 June', condition: 'Light Rain', icon: 'CloudRain', high: 28, low: 20, rainfall: 15, trendTemp: 26 },
			{ day: 'Thursday', date: '05 June', condition: 'Partly Cloudy', icon: 'SunCloud', high: 29, low: 20, rainfall: 2, trendTemp: 27 }
		],
		alert: {
			id: 'ALT-BLR-045',
			severity: 'info',
			title: 'ISRO Climate Modeling Note',
			description: 'Optimal microclimate stability recorded over Bengaluru plateau. Pre-monsoon showers expected over South Karnataka inland regions.',
			actionLabel: 'View Details →',
			timestamp: 'Updated 15 mins ago',
			issuingAuthority: 'ISRO National Remote Sensing Centre (NRSC)'
		}
	}
};

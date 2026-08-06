<script lang="ts">
	import { activeCityId } from '$lib/stores/weatherStore';
	import { CITIES_WEATHER_DATA, type CityWeather } from '$lib/data/weatherData';
	import HeroWeatherCard from '$lib/components/HeroWeatherCard.svelte';
	import TemperatureTrend from '$lib/components/TemperatureTrend.svelte';
	import ForecastCards from '$lib/components/ForecastCards.svelte';
	import AlertBanner from '$lib/components/AlertBanner.svelte';
	import AlertModal from '$lib/components/AlertModal.svelte';

	let currentCityId = $state(activeCityId.get());

	$effect(() => {
		const unsubscribe = activeCityId.subscribe((val) => {
			currentCityId = val;
		});
		return unsubscribe;
	});

	let weather: CityWeather = $derived(
		CITIES_WEATHER_DATA[currentCityId] ?? CITIES_WEATHER_DATA['new-delhi']
	);
</script>

<svelte:head>
	<title>{weather.name} · MAUSAMSETU</title>
</svelte:head>

<div class="space-y-3 w-full max-w-[1400px]">
	<!-- 1. Hero Weather Card -->
	<section class="animate-fade-in">
		<HeroWeatherCard {weather} />
	</section>

	<!-- 2. Hourly Forecast (24-Hour Spline Curve) -->
	<section class="animate-fade-in-delayed">
		<TemperatureTrend {weather} />
	</section>

	<!-- 3. 7-Day Extended Forecast Cards -->
	<section class="animate-fade-in-delayed-2">
		<ForecastCards forecast={weather.upcomingForecast} />
	</section>

	<!-- 4. Bottom Alert Banner Bar -->
	<section class="animate-fade-in-delayed-2">
		<AlertBanner alert={weather.alert} />
	</section>

	<!-- Telemetry Modal -->
	<AlertModal alert={weather.alert} />
</div>

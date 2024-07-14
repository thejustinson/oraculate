# Crypto Price Aggregator

This project is a React-based web application designed to aggregate and display real-time cryptocurrency prices from multiple sources. The application uses custom hooks to fetch price data from DIA and Pyth Network, then calculates and displays an aggregate price.

## Project Overview

The main objective of this project is to provide users with a comprehensive view of cryptocurrency prices by combining data from two different price feeds. This approach helps in achieving a more accurate and reliable price representation.

## Key Components and Hooks

### 1. `useDiadataPriceFeed`

**Purpose**: Fetches the latest price data for a given cryptocurrency symbol from the DIA API.

**Details**:
- Utilizes `axios` to make HTTP requests to the DIA API.
- Polls the API at a specified interval (default is 1000 milliseconds) to ensure the price data is up-to-date.
- Handles loading state and potential errors during the data fetching process.

**Usage**: This hook is used to get real-time price data for a specific cryptocurrency symbol from DIA, which is then displayed in the application.

### 2. `usePythPriceFeed`

**Purpose**: Fetches the latest price data for a given cryptocurrency price feed ID from the Pyth Network.

**Details**:
- Establishes a connection to the Pyth Network endpoint.
- Fetches the latest price feed data for the given price feed ID.
- Subscribes to updates for real-time price changes.
- Handles loading state and potential errors during the data fetching process.

**Usage**: This hook is used to get real-time price data from the Pyth Network, which is crucial for displaying accurate and up-to-date cryptocurrency prices.

### 3. `useCryptoIcon`

**Purpose**: Fetches the icon URL for a given cryptocurrency symbol.

**Details**:
- Constructs the URL for the cryptocurrency icon based on the symbol provided.
- Validates the existence of the icon URL.
- Handles potential errors if the icon URL is not found.

**Usage**: This hook is used to display the appropriate icon for each cryptocurrency, enhancing the visual representation of the data.

### 4. `AssetTableColumns` Component

**Purpose**: Displays the price data for a single cryptocurrency asset in a tabular format.

**Details**:
- Fetches and displays the icon, DIA price, Pyth price, and aggregate price for the given cryptocurrency asset.
- Calculates the aggregate price by combining DIA and Pyth prices with specified weights.
- Determines and displays the direction of price changes (up or down) for each price source and the aggregate price.

**Usage**: This component is the core of the user interface, presenting all relevant data for each cryptocurrency asset in an organized and user-friendly manner.

## How It Works

1. **Fetching Price Data**: The application uses `useDiadataPriceFeed` and `usePythPriceFeed` hooks to fetch real-time price data from DIA and Pyth Network, respectively.
2. **Displaying Icons**: The `useCryptoIcon` hook retrieves the appropriate icon URL for each cryptocurrency, ensuring that the data is visually appealing.
3. **Aggregating Prices**: The `AssetTableColumns` component calculates the aggregate price by combining the prices from both DIA and Pyth Network, providing a more comprehensive view of the market.
4. **Displaying Data**: The `AssetTableColumns` component displays the prices, price directions, and icons in a tabular format, making it easy for users to understand and compare the data.

## Conclusion

This project demonstrates how to aggregate and display real-time cryptocurrency price data from multiple sources using React and custom hooks. By combining data from DIA and Pyth Network, the application provides a more accurate and reliable representation of cryptocurrency prices.

Feel free to explore and extend this project to include additional features or data sources as needed.
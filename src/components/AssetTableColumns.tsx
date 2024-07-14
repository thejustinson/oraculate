import React, { useEffect, useRef, useState } from 'react';
import useCryptoIcon from "../hooks/useCryptoIcon";
import useDiadataPriceFeed from '../hooks/useDiadataPriceFeed';
import usePythPriceFeed from "../hooks/usePythPriceFeed"

interface Asset {
  name: string;
  symbol: string;
  priceFeedId: string;
}

interface AssetTableColumnsProps {
  asset: Asset;
}

const AssetTableColumns: React.FC<AssetTableColumnsProps> = ({ asset }) => {
    const { name, symbol, priceFeedId } = asset;
    const { iconUrl } = useCryptoIcon(symbol.toLowerCase()); // Assuming your hook requires the symbol in lowercase

    // DIA Variables
    const { price: dPriceData} = useDiadataPriceFeed(symbol.toUpperCase());
    const [diaPrice, setDiaPrice] = useState<number>(0);
    const [DiaPriceDirection, setDiaPriceDirection] = useState<"up" | "down" | null>(null);
    const prevDiaPriceRef = useRef<number>(diaPrice);    

    useEffect(()=>{
        if (dPriceData?.price !== undefined && dPriceData?.price !== null) {
            setDiaPrice(parseFloat(dPriceData.price.toFixed(5)));
          }
    }, [dPriceData])

    // Set DIA price and direction
    useEffect(() => {
        if (prevDiaPriceRef.current !== undefined) {
          if (diaPrice > prevDiaPriceRef.current) {
            setDiaPriceDirection("up");
          } else if (diaPrice < prevDiaPriceRef.current) {
            setDiaPriceDirection("down");
          } else {
            setDiaPriceDirection(null);
          }
        }
        prevDiaPriceRef.current = diaPrice; // Update the ref to the current price
      }, [diaPrice]);


    // Pyth Variables
    const { priceFeed: pythPriceFeed } = usePythPriceFeed(priceFeedId);
    const [pythPrice, setPythPrice] = useState<number>(0);
    const [pythPriceDirection, setPythPriceDirection] = useState<"up" | "down" | null>(null);
    const prevPythPriceRef = useRef<number>(pythPrice);

    // Fetch Pyth price and calculate
    useEffect(() => {
        if (pythPriceFeed) {
        const priceUnchecked = pythPriceFeed.getPriceUnchecked();
        if (priceUnchecked) {
            const price: number = parseFloat(priceUnchecked.price as any); // Ensure the price is parsed correctly
            const expo: number = priceUnchecked.expo;
            const calculatedPrice = price * Math.pow(10, expo);
            setPythPrice(parseFloat(calculatedPrice.toFixed(5)));
        }
        }
    }, [pythPriceFeed]);

    // Set Pyth price direction
    useEffect(() => {
        if (prevPythPriceRef.current !== undefined) {
        if (pythPrice > prevPythPriceRef.current) {
            setPythPriceDirection("up");
        } else if (pythPrice < prevPythPriceRef.current) {
            setPythPriceDirection("down");
        } else {
            setPythPriceDirection(null);
        }
        }
        prevPythPriceRef.current = pythPrice;
    }, [pythPrice]);


    // Aggregate price
    const [aggregatePrice, setAggregatePrice] = useState<number>(0)
    const prevAggregatePriceRef = useRef<number>(aggregatePrice);
    const [aggregatePriceDirection, setAggregatePriceDirection] = useState<"up" | "down" | null>(null);

    // Update aggregate price when either DIA or Pyth price changes
    useEffect(() => {
        const weightedDiaPrice = diaPrice * 0.5; // Example: 50% weight for DIA price
        const weightedPythPrice = pythPrice * 0.5; // Example: 50% weight for Pyth price

        const newAggregatePrice = weightedDiaPrice + weightedPythPrice;

        setAggregatePrice(parseFloat(newAggregatePrice.toFixed(5)));
    }, [diaPrice, pythPrice]);

    // Set aggregate price direction
    useEffect(() => {
        if (prevAggregatePriceRef.current !== undefined) {
            if (aggregatePrice > prevAggregatePriceRef.current) {
                setAggregatePriceDirection("up");
            } else if (aggregatePrice < prevAggregatePriceRef.current) {
                setAggregatePriceDirection("down");
            } else {
                setAggregatePriceDirection(null);
            }
        }
        prevAggregatePriceRef.current = aggregatePrice;
    }, [aggregatePrice]);
    

  return (
    <tr className="border-b border-b-neutral-800 hover:bg-neutral-800 duration-200">
      <td className="py-3 text-left px-4 text-nowrap">
        <div className="flex items-center gap-2">
          <img className="max-w-[30px] shrink-0 grow-0" src={iconUrl ? iconUrl : ""} alt={name} />
          <div>
            <div className="font-semibold">{symbol}/USD</div>
            <div className="text-sm text-neutral-500">{name}</div>
          </div>
        </div>
      </td>
      <td className={`py-3 text-right px-4 ${pythPriceDirection === "up" ? "text-green-500" : pythPriceDirection === "down" ? "text-red-500" : ""} text-nowrap`}>{pythPrice !== 0 ? pythPrice : '-'}</td>
      <td className={`py-3 text-right px-4 ${DiaPriceDirection === "up" ? "text-green-500" : DiaPriceDirection === "down" ? "text-red-500" : ""} text-nowrap`}>
        {diaPrice !== 0 ? diaPrice : '-'}
      </td>
      <td className={`py-3 text-right px-4 ${aggregatePriceDirection === "up" ? "text-green-500" : aggregatePriceDirection === "down" ? "text-red-500" : ""} text-nowrap`}>{aggregatePrice !== 0 ? aggregatePrice : '-'}</td>
    </tr>
  );
};

export default AssetTableColumns;
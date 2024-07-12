import InputCard from "./InputCard"
import TestHook from "./TestHook"

const Container = () => {
  return (
    <div className="w-[900px] mx-auto mt-10">
      <InputCard/>
      <TestHook endpoint="https://hermes.pyth.network" priceFeedIds={[
        "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
        "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
      ]}
    />
    </div>
  )
}

export default Container

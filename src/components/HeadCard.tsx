const HeadCard = () => {
  return (
    <div className="text-neutral-950 bg-neutral-100 p-5 py-10 rounded-b w-full">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold">Oraculate</h1>
        <p className="mt-2">Oraculate is a decentralized finance (DeFi) application that aggregates price data from multiple oracle sources, computes an average price, and displays it in a tabular form.</p>
        <p className="mt-1"><span className="font-semibold">Oracles used:</span> Pyth & Diadata</p>
        <p><span className="font-semibold">No of cryptocurrencies used for demo:</span> 20</p>
      </div>
    </div>
  )
}

export default HeadCard

const HeadCard = () => {
  return (
    <div className="text-neutral-950 bg-neutral-100 p-5 py-10 rounded-b w-full">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold">Oraculate</h1>
        <p className="mt-2">Oraculate is a decentralized finance (DeFi) application that aggregates price data from multiple oracle sources, computes an average price, and displays it in a tabular form.</p>
        <p className="mt-1"><span className="font-semibold">Oracles used:</span> Pyth & Diadata</p>
        <p><span className="font-semibold">No of cryptocurrencies used for demo:</span> 20</p>
        <a href="https://github.com/thejustinson/oraculate.git" target="_blank" className="w-fit"><button className="bg-neutral-900 py-2 px-3 w-fit text-neutral-200 rounded mt-2 active:scale-90 duration-200">Link to repository</button></a>
      </div>
    </div>
  )
}

export default HeadCard

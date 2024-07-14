import AssetTableColumns from "./AssetTableColumns"
import { cryptoDetails } from "../utils/assetDetail"

const AssetTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full lg:w-[900px] mt-10 mx-auto">
        <thead>
          <tr className="bg-neutral-900 border-y divide-x-[1px] divide-neutral-800 border-neutral-800">
            <th className="py-3 text-left px-4 text-nowrap">Asset</th>
            <th className="py-3 text-right px-4 text-nowrap">Pyth Price</th>
            <th className="py-3 text-right px-4 text-nowrap">DIA Price</th>
            <th className="py-3 text-right px-4 text-nowrap">Aggregate Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptoDetails.map((cryptoDetail, index) => (
            <AssetTableColumns key={index} asset={cryptoDetail} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssetTable

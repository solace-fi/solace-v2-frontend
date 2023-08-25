import VeSGTBanner from '@/components/new/VeSGTBanner'
import Image from 'next/image'

function LeftThingy() {
  return (
    <div className="text-white px-4">
      <h1 className="text-2xl font-medium text-accent mb-6 leading-[43.20px]">
        veSGT
      </h1>
      <div className="text-4xl font-bold leading-10 mb-9">
        Extra earnings <br />& voting power
      </div>
      <ul className="text-medium font-medium leading-7 mb-10">
        <li>{'\u2013'} Boost liquidity mining yield up to 2.5x</li>
        <li>{'\u2013'} Vote to direct liquidity mining emissions</li>
        <li>{'\u2013'} Earn your share of protocol revenue</li>
      </ul>
      {/* interactive button Get veSGT */}
      <div className="h-12 gap-6 inline-flex">
        <div className="px-4 py-3 bg-accent rounded items-center gap-1 flex">
          <div className="text-center text-contrastWithAccent text-lg font-semibold">
            Get veSGT
          </div>
        </div>
        <div className="px-4 py-3 rounded border border-neutral-50 border-opacity-70 items-center gap-1 flex">
          <div className="text-center text-neutral-50 text-lg font-semibold">
            Learn more
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VeSGT() {
  return (
    <div className="flex gap-16 items-center mx-12">
      <LeftThingy />
      <VeSGTBanner />
    </div>
  )
}

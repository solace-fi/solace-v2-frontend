import React from 'react'
import { Z_TABLE, BKPT_TABLET_END } from '../../constants'
import { ExplorerscanApi } from '../../constants/enums'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import {
  timeAgo,
  getExplorerItemUrl,
  shortenAddress,
  capitalizeFirstLetter,
} from '../../utils'
import { Button } from '../atoms/Button'
import { Loader } from '../atoms/Loader'
import { Scrollable } from '../atoms/Scroll'
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from '../atoms/Table'
import { Tdiv } from '../atoms/Text'
import { useNetwork } from 'wagmi'

export function RecentActivityTable() {
  const { chain } = useNetwork()
  // const { activeNetwork } = useNetwork()
  // const { localTransactions } = useCache()
  // const { contractSources } = useContracts()
  const { width, isMobile } = useWindowDimensions()
  const txHistory: any[] = []
  const localTransactions: any[] = []
  return (
    <Scrollable p={0} maxDesktopHeight={'30vh'}>
      <Table textAlign="center" style={{ borderSpacing: '0px 7px' }}>
        <TableHead sticky zIndex={Z_TABLE + 1}>
          <TableRow>
            <TableHeader>Type</TableHeader>
            {width > BKPT_TABLET_END && (
              <>
                {/* <TableHeader>Content</TableHeader> */}
                <TableHeader>Time</TableHeader>
              </>
            )}
            <TableHeader>Hash</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {localTransactions.map((pendingtx: any) => (
            <TableRow key={pendingtx.hash}>
              <TableData
                pl={isMobile ? 0 : undefined}
                pr={isMobile ? 0 : undefined}
                pt={5}
                pb={5}
                t4
              >
                <Tdiv>{pendingtx.type}</Tdiv>
              </TableData>
              {width > BKPT_TABLET_END && (
                <>
                  <TableData pt={5} pb={5} t4>
                    <Tdiv>{timeAgo(Number(Date.now()) * 1000)}</Tdiv>
                  </TableData>
                </>
              )}
              <TableData
                pt={5}
                pb={5}
                t4
                pl={isMobile ? 0 : undefined}
                pr={isMobile ? 0 : undefined}
              >
                <a
                  href={getExplorerItemUrl(
                    chain?.blockExplorers?.default?.url ?? '',
                    pendingtx.hash,
                    ExplorerscanApi.TX
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>{shortenAddress(pendingtx.hash)}</Button>
                </a>
              </TableData>
            </TableRow>
          ))}
          {txHistory &&
            txHistory.map((tx: any) => (
              <TableRow key={tx.hash}>
                <TableData
                  t4
                  pt={5}
                  pb={5}
                  pl={isMobile ? 0 : undefined}
                  pr={isMobile ? 0 : undefined}
                >
                  {txHistory.length > 0 ? (
                    <Tdiv error={tx.txreceipt_status != '1'}>
                      {/* {capitalizeFirstLetter(decodeInput(tx, contractSources)?.name ?? '?')} */}
                    </Tdiv>
                  ) : (
                    <Loader width={10} height={10} />
                  )}
                </TableData>
                {width > BKPT_TABLET_END && (
                  <TableData pt={5} pb={5} t4>
                    {txHistory.length > 0 && (
                      <Tdiv error={tx.txreceipt_status != '1'}>
                        {timeAgo(Number(tx.timeStamp) * 1000)}
                      </Tdiv>
                    )}
                  </TableData>
                )}
                <TableData
                  t4
                  pt={5}
                  pb={5}
                  pl={isMobile ? 0 : undefined}
                  pr={isMobile ? 0 : undefined}
                >
                  {txHistory.length > 0 && (
                    <a
                      href={getExplorerItemUrl(
                        chain?.blockExplorers?.default?.url ?? '',
                        tx.hash,
                        ExplorerscanApi.TX
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>{shortenAddress(tx.hash)}</Button>
                    </a>
                  )}
                </TableData>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Scrollable>
  )
}

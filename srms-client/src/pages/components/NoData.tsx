export function NoData({ colSpan }: { colSpan: number }) {
  return <tr>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6 text-center" colSpan={colSpan}>No data</td>
</tr>
}

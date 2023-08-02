import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

import { useAppContext } from "../../state";

function UpIcon({ currentField }) {
  const { sortType, sortField } = useAppContext();
  const currentFieldFormated = currentField.toLowerCase().replaceAll(" ", "_");

  return (
    <svg
      className="svg-sort absolute"
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="8"
      fill="none"
      viewBox="0 0 6 8"
    >
      <path
        fill={
          currentFieldFormated === sortField && sortType ? "#006A65" : "#C7C7C7"
        }
        d="M5.495 4.643H.505c-.45 0-.673.52-.357.824l2.496 2.391a.517.517 0 00.71 0l2.498-2.391c.316-.303.092-.824-.357-.824zM.148 2.533L2.644.142a.517.517 0 01.71 0l2.498 2.391c.316.303.092.824-.357.824H.505c-.45 0-.673-.52-.357-.824z"
        style={{ width: 34 }}
      ></path>
    </svg>
  );
}

export default function Table({
  datas,
  columnsDatas,
  isLoading,
  actions,
  filter,
  totals,
}) {
  const [data, setData] = useState(datas);
  const { sortType, setSortField, setSortType } = useAppContext();

  async function onSort(newField) {
    if (newField.toLowerCase() === "index") return;
    const field = {
      1: 2,
      2: 1,
    };
    const formatField = newField.toLowerCase().replaceAll(" ", "_");
    setSortType(field[sortType]);
    setSortField(formatField);
  }

  const columns = useMemo(() => columnsDatas, [columnsDatas]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    setData(datas);
  }, [datas]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-[13px] flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle  bg-white">
            {filter && (
              <div className="py-4 px-6 flex bg-white left-0 right-0 z-10 ">
                {filter}
              </div>
            )}
            <div className="overflow-hidden shadow table-wrp block max-h-96 ring-1 ring-black ring-opacity-5 !rounded-b-none bg-[white]">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-[#E9E9E9]"
              >
                <thead className="bg-[#F9F9F9] sticky top-0">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      className="header-table"
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, index) => (
                        <th
                          onClick={() => {
                            onSort(column.Header);
                          }}
                          scope="col"
                          className={
                            " py-3 pl-4 pr-3 relative text-sm font-semibold text-[#C7C7C7] text-gray-900 sm:pl-6 "
                          }
                          {...column.getHeaderProps()}
                        >
                          {/* {<SortButton sortField={column.Header} />} */}

                          {/* {(column.Header.toLowerCase() === sortField.replaceAll('_', ' ')) &&
                                                        (
                                                            <span className=' inline-block relative top-[5px]'>
                                                                { <UpIcon />}
                                                            </span>
                                                        )
                                                    } */}

                          <div>
                            {column.render("Header")}
                            <span className=" inline-block relative  left-[9px] w-fit top-[-8px]">
                              {index ? (
                                <UpIcon
                                  currentField={column.render("Header")}
                                />
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="divide-y divide-[#E9E9E9] bg-white h-x96 overflow-y-auto"
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      !(index === datas.length - 1) && (
                        <tr
                          className="hover:bg-gray-100"
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                className="whitespace-nowrap text-center py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell", { actions })}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    );
                  })}
                  <tr className="footer-table">
                    {totals.map((total, index) => {
                      return (
                        <td
                          key={index}
                          className="whitespace-nowrap py-6 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {total}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
              {rows.length === 0 && !isLoading ? <p></p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
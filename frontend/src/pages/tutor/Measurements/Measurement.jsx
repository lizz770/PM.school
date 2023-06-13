import styles from "./Measurement.module.scss";
import {
  useGetMeasurement,
  useDeleteMeasurement,
} from "../../../queries/measurementQueries";
import { useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import GlobalSpinner from "../../../components/globalSpinner";
import Button from "../../../components/button";
import SkeletonTable from "./SkeletonTable";

const Measurement = () => {
  const { measurement } = useParams();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetMeasurement(measurement, {
      skip: 0,
      take: 25,
    });

  const { mutate: deleteMeasurement, isLoading: isDeleting } =
    useDeleteMeasurement();

  // const rerender = useReducer(() => ({}), {})[1];
  const columnHelper = createColumnHelper();
  const [columns, setColumns] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (data) {
      const measurementData = data[`${measurement}s`];
      //получить ключи объекта измерения в массиве
      let keys;
      if (measurementData.length > 0) keys = Object?.keys(measurementData[0]);
      //удалите id и ключ идентификатора измерения, если он существует
      const filteredKeys = keys?.filter(
        (key) => key !== "id" && key !== `measurementsId`
      );

      console.log(filteredKeys);

      const columns = filteredKeys?.map((key) => {
        return columnHelper.accessor(key, {
          cell: (info) => info.getValue(),
        });
      });

      setColumns(columns);
    }
  }, [data]);

  const table = useReactTable({
    columns: columns,
    data: data && data[`${measurement}s`] ? data[`${measurement}s`] : [],
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{measurement}</h1>
      {!isLoading && !isRefetching && !isError && (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
                <th>Действие</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel()?.rows?.map((row) => (
              <tr key={row.id}>
                {row?.getVisibleCells()?.map((cell) => {
                  if (cell.column.id === "createdAt")
                    return (
                      <td key={cell.id}>
                        {new Date(cell.renderValue()).toLocaleDateString()}
                      </td>
                    );
                  if (cell.column.id === "updatedAt")
                    return (
                      <td key={cell.id}>
                        {new Date(cell.renderValue()).toLocaleDateString()}
                      </td>
                    );
                  return <td key={cell.id}>{cell.renderValue()}</td>;
                })}
                <td>
                  <Button
                    color='red'
                    onClick={() =>
                      deleteMeasurement({
                        measurement: measurement,
                        id: row?.original?.id,
                      })
                    }
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isDeleting && <GlobalSpinner />}
      {(isLoading || isRefetching) && <SkeletonTable />}
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Button onClick={() => refetch()}>
          <span
            style={{ color: "whitesmoke", width: "100px", display: "block" }}
          >
            Обновить
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Measurement;
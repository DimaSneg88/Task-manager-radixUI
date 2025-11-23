import React, { HTMLProps } from "react";

import "./styles.css";

import generateTasks, { Task } from "./makeData";

import {
  ColumnFiltersState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import { Flex, Kbd, Text } from "@radix-ui/themes";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CaretSortIcon,
  CheckCircledIcon,
  ClockIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  ValueIcon,
} from "@radix-ui/react-icons";
import SelectTable from "../select/SelectTable";
import ViewButton from "../view-button/ViewButton";
import Avatars from "../avatar/Avatars";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const defaultColumns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "task",
    cell: (info) => <Text size={"3"}>{info.row.getValue("task")}</Text>,
    header: () => (
      <Flex gap={"2"} align={"center"}>
        <Text size={"2"} color={"gray"}>
          Task
        </Text>
      </Flex>
    ),

    footer: (props) => props.column.id,
  },
  {
    accessorKey: "title",
    cell: (info) => (
      <Flex gap={"2"} align={"center"}>
        <Kbd>{info.row.original.type}</Kbd>
        <Text size={"3"}>{info.row.getValue("title")}</Text>
      </Flex>
    ),
    header: () => (
      <Flex style={{ cursor: "pointer" }} gap={"2"} align={"center"}>
        <Text size={"2"} color={"gray"}>
          Title
        </Text>
        <CaretSortIcon cursor={"pointer"} />
      </Flex>
    ),
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "status",
    cell: (info) => {
      return (
        <Flex style={{ cursor: "pointer" }} gap={"2"} align={"center"}>
          {getStatusIcon(info.row.getValue("status"))}
          <Text size={"3"}>{info.row.getValue("status")}</Text>
        </Flex>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: () => (
      <Flex style={{ cursor: "pointer" }} gap={"2"} align={"center"}>
        <Text size={"2"} color={"gray"}>
          Status
        </Text>
        <CaretSortIcon cursor={"pointer"} />
      </Flex>
    ),

    footer: (props) => props.column.id,
  },

  {
    accessorKey: "priority",
    cell: (info) => (
      <Flex style={{ cursor: "pointer" }} gap={"2"} align={"center"}>
        {getPriorityIcon(info.row.getValue("priority"))}
        <Text size={"3"}>{info.row.getValue("priority")}</Text>
      </Flex>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: () => (
      <Flex style={{ cursor: "pointer" }} gap={"2"} align={"center"}>
        <Text size={"2"} color={"gray"}>
          Priority
        </Text>
        <CaretSortIcon cursor={"pointer"} />
      </Flex>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "points",
    cell: () => (
      <Flex gap={"2"} align={"center"}>
        <DotsHorizontalIcon cursor={"pointer"} />
      </Flex>
    ),
    header: () => <Flex gap={"2"} align={"center"}></Flex>,
    footer: (props) => props.column.id,
  },
];

function MyTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columns] = React.useState(() => [...defaultColumns]);

  const data = JSON.parse(generateTasks());

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
      globalFilter,
    },

    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div>
      <div className="avatar">
        <Avatars />
      </div>
      <div className="up-panel">
        <div className="panel-button">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Filter tasks..."
          />
          <SelectTable table={table} />
        </div>
        <div className="button-head">
          <ViewButton columns={table.getAllLeafColumns()} />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-footer-left">
          {Object.keys(rowSelection).length} of{" "}
          {table.getPreFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="table-footer-right">
          <div className="table-footer-rows">
            <span>Rows per page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="table-footer-page">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="table-footer-btns">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="button"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="button"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="button"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="button"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

function getStatusIcon(status: string) {
  if (status === "In Progress") {
    return <ClockIcon />;
  }
  if (status === "Backlog") {
    return <QuestionMarkCircledIcon />;
  }
  if (status === "Todo") {
    return <ValueIcon />;
  }
  if (status === "Done") {
    return <CheckCircledIcon />;
  }
  if (status === "Canceled") {
    return <CrossCircledIcon />;
  }
}

function getPriorityIcon(priority: string) {
  if (priority === "Medium") {
    return <ArrowRightIcon />;
  }
  if (priority === "Low") {
    return <ArrowDownIcon />;
  }
  if (priority === "High") {
    return <ArrowUpIcon />;
  }
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default MyTable;

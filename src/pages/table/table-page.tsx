import { DataTable } from "@components/data-table/data-table";
import { columns } from "./components/columns";
import PageTitle from "@components/commons/page-title";
import { useState,useRef } from "react";
import { useGetAllProducts } from "@apis/queries/product";
import { PaginationState } from "@tanstack/react-table";
import Toolbar from "./components/tool-bar";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();
import { HotTable } from '@handsontable/react';

type FormType = {
  category: string;
  search: string;
};

export function Table() {
  const { t } = useTranslation();

  const toolbarForm = useForm<FormType>({
    defaultValues: {
      category: "",
      search: "",
    },
  });

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const hotRef = useRef(null);
  const [columns, setColumns] = useState([]);

  const columnHeaders = [
    "GL Account",
    "Amount",
    "Cost Center",
    "CC Owner",
    "Profit Center",
    "WBS Element",
    "Description",
  ];
  // const { data, isLoading } = useGetAllProducts({
  //   skip: paginationState.pageIndex * paginationState.pageSize,
  //   limit: paginationState.pageSize,
  //   ...toolbarForm.watch(),
  // });

  return (
    <div className="w-full space-y-4">
      <PageTitle title={t("table.pageTitle")} desc={t("table.pageDesc")} />

      <Toolbar form={toolbarForm} />
      <HotTable
  data={[
    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ]}
  colHeaders={columnHeaders}
        // columns={columns}
  stretchH="all"
        manualRowResize={true}
        manualColumnResize={true}
        rowHeaders={true}
        height="200"
        rowHeaderWidth={25}
        contextMenu={true}
        filters={true}
        width="100%"
        hiddenColumns={{
          indicators: true,
          columns: [5],
        }}
        readOnly={true}
        dropdownMenu={true}
        ref={hotRef}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use
/>


      {/* <DataTable
        data={data?.data.products}
        columns={columns}
        loading={isLoading}
        rowCount={data?.data.total}
        manualPagination={true}
        paginationState={paginationState}
        onPaginationChange={setPaginationState}
      /> */}
    </div>
  );
}

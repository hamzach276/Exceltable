import { DataTable } from "@components/data-table/data-table";
import { columns } from "./components/columns";
import PageTitle from "@components/commons/page-title";
import { useState, useRef } from "react";
import { useGetAllProducts } from "@apis/queries/product";
import { PaginationState } from "@tanstack/react-table";
import Toolbar from "./components/tool-bar";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import accountData from "../../assets/accounts.json";
import costCenterData from "../../assets/cost-centers.json";

registerAllModules();
import { HotTable } from "@handsontable/react";

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

  const glAccountDropdown = accountData.map(
    (item) => `${item.GLAccount} - ${item.ShortText}`
  );
  const costCenterDropdown = costCenterData.map(
    (item) => `${item.CostCenterCode} - ${item.Name}`
  );
  console.log(glAccountDropdown, "glAccountDropdown");
  const columnHeaders = [
    "Date",
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
  const tableData = [
    {  date :"" ,glAccount: "", amount: 10, costCenter: "", ccOwner: "", profitCenter: "",},
    { date :"" , glAccount: "", amount: 20, costCenter: "", ccOwner: "", profitCenter: "", },
    {date :"" ,glAccount: "", amount: 30, costCenter: "", ccOwner: "", profitCenter: "", },
  ];
  const updateCCOwner = (row: any, costCenterValue : any) => {
    const selectedCostCenter = costCenterData.find(
      (item) => `${item.CostCenterCode} - ${item.Name}` === costCenterValue
    );
    return selectedCostCenter ? selectedCostCenter.ccOwner : "";
  };

  const afterChangeHandler = (changes: any, source: any) => {
    if (source === "loadData") return; // Prevent loop on data load

    if (changes) {
      changes.forEach(([row, prop, oldValue, newValue]) => {
        if (prop === "costCenter") {
          const newCCOwner = updateCCOwner(row, newValue);
          hotRef.current.hotInstance.setDataAtRowProp(row, "ccOwner", newCCOwner);
        }
      });
    }
  };
  return (
    <div className="w-full space-y-4">
      <PageTitle title={t("table.pageTitle")} desc={t("table.pageDesc")} />

      <Toolbar form={toolbarForm} />
      <HotTable
      data={tableData}
        // data={[
        //   ["", "Tesla", " ", "Toyota", "Ford"],
        //   ["2019", 10, 11, 12, 13],
        //   ["2020", 20, 11, 14, 13],
        //   ["2021", 30, 15, 12, 13],
        // ]}
        colHeaders={columnHeaders}
        columns={[
          {
            type: "date",
            data: "date", // Matches the key in tableData
            readOnly: false,
            width:"90"  // editable
          },
          {
            type: "autocomplete",
            source: glAccountDropdown,
            data: "glAccount", // Matches the key in tableData
            readOnly: false,  // editable
          },
          { data: "amount", type: 'numeric' },
          {
            type: "autocomplete",
            source: costCenterDropdown,
            data: "costCenter",  // edit able 
            readOnly: false,
          },
          { data: "ccOwner" },
          { data: "profitCenter" },
          
        ]}
        className="custom-table"  // Add a unique class name
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
          columns: [6],
        }}
        readOnly={true}
        dropdownMenu={true}
        afterChange={afterChangeHandler}
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

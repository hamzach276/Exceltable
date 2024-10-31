import { DataTable } from "@components/data-table/data-table";
import { columns } from "./components/columns";
import PageTitle from "@components/commons/page-title";
import { useState, useRef, useEffect } from "react";
import { useGetAllProducts } from "@apis/queries/product";
import { PaginationState } from "@tanstack/react-table";
import Toolbar from "./components/tool-bar";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import moment from "moment";
// import accountData from "../../assets/accounts.json";
import costCenterData from "../../assets/cost-centers.json";

registerAllModules();
import { HotTable } from "@handsontable/react";
import { apiurl } from "src/env-variable";
import {
  getGlAccountAll,
  getCostCenterAll,
  getTransaction,
  createTransaction,
  updateTransaction
} from "@apis/axios/service/glaccount";
import { any } from "zod";

type FormType = {
  category: string;
  search: string;
};

export function Table() {
  const { t } = useTranslation();
const [Update,setUpdate] = useState(false)
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
  console.log("Console called");

  const [glAccountDropdown, setGlAccountDropdown] = useState<string[]>([]);
  const [glAccountForSelection, setGlAccountForSelection] = useState<string[]>([]);

  const [getData, setGetdata] = useState<Array[]>([]);
  const [changeRows, setChangeRows] = useState({
    transactionID: 0,
    date: "",
    chargeAccountID: 0,
    amount: 0,
    costCenterID: 0,
    profitCenter: "",
    createdAt: "",
    modifiedAt: "",
  });

  useEffect(() => {
    getGlAccountAll().then((response) => {
      const accountData = response.result; // Assuming response.result contains the account data
      const dropdownData = accountData.map(
        (item: any) => `${item.glAccount} - ${item.shortText}`
      );
      setGlAccountDropdown(dropdownData);
      setGlAccountForSelection(accountData)
    });

    console.log(glAccountDropdown, "glAccountDropdown");
  }, []);

  const [costCenterDropdown, setcostCenterDropdown] = useState<string[]>([]);
  const [costCenterSelection, setcostCenterSelecltion] = useState<string[]>([]);

  useEffect(() => {
    getCostCenterAll().then((response) => {
      const accountData = response.result; // Assuming response.result contains the account data
      const dropdownData = accountData.map(
        (item: any) => `${item.costCenterCode} - ${item.name}`
      );
      setcostCenterDropdown(dropdownData);
      setcostCenterSelecltion(accountData)
    });

    console.log(glAccountDropdown, "glAccountDropdown");
  }, []);

  useEffect(() => {
    getTransaction().then((response) => {
      const tablData = response.result; // Assuming response.result contains the account data
      const formattedData = tablData.map((item: any) => ({
        ...item,
        date: moment(item.date).format("YYYY-MM-DD"),
        glAccount: `${item.glAccount} - ${item.glName}`,
        costCenterCode: `${item.costCenterCode} - ${item.centerCodeName}`,
      }));
      console.log(tablData, "tablData");
      setGetdata(formattedData);
    });
  }, []);
  // const costCenterDropdown = costCenterData.map(
  //   (item) => `${item.CostCenterCode} - ${item.Name}`
  // );
  console.log(getData, "data");

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
    {
      date: "",
      glAccount: "",
      amount: 10,
      costCenterCode: "",
      ccOwner: "",
      profitCenter: "",
    },
    {
      date: "",
      glAccount: "",
      amount: 20,
      costCenterCode: "",
      ccOwner: "",
      profitCenter: "",
    },
    {
      date: "",
      glAccount: "",
      amount: 30,
      costCenterCode: "",
      ccOwner: "",
      profitCenter: "",
    },
  ];
  const updateCCOwner = (row: any, costCenterValue: any) => {
    const selectedCostCenter = costCenterData.find(
      (item) => `${item.CostCenterCode} - ${item.Name}` === costCenterValue
    );
    return selectedCostCenter ? selectedCostCenter.ccOwner : "";
  };

  const afterChangeHandler = (changes: any, source: any) => {
    if (source === "loadData") return; // Prevent loop on data load

    if (changes) {
      changes.forEach(([row, prop, oldValue, newValue]) => {
        console.log(row, "row");
        let updatedData: any ;
        const updatedRow = { ...getData[row] };
        const isTransactionID = updatedRow.transactionID
        if(isTransactionID){
          updatedData = { ...getData[row] };
        } else{
          updatedData = { ...changeRows }; 
        } 
        console.log(updatedData,"updatedData")
        if (prop === "date") {
          updatedData.date = newValue;
        } else if (prop === "costCenterID") {
          updatedData.costCenterID = newValue;
        } else if (prop === "costCenterCode") {
          const newCCOwner = updateCCOwner(row, newValue);
          hotRef.current.hotInstance.setDataAtRowProp(
            row,
            "ccOwner",
            newCCOwner
          );
          const selectedCostCenter = costCenterSelection.find(item => `${item.costCenterCode} - ${item.name}` === newValue);
          console.log(selectedCostCenter,"selectedCostCenter")
          if (selectedCostCenter) {
              updatedData.costCenterID = selectedCostCenter.costCenterID; // Store corresponding ID
              
          }
          // Assuming costCenterCode should also be stored
          // updatedData.costCenterID = newValue;
        } else if (prop === "glAccount") {
          const selectedGlAccount = glAccountForSelection.find(item => `${item.glAccount} - ${item.shortText}` === newValue);
          if (selectedGlAccount) {
              updatedData.chargeAccountID = selectedGlAccount.chargeAccountID; // Store corresponding ID
          }
        } else if (prop === "amount") {
          updatedData.amount = newValue;
        } else if (prop === "profitCenter") {
          updatedData.profitCenter = newValue;
        }

        // Always update the common properties
        updatedData.transactionID = row; // Or set this to the corresponding ID if available
        updatedData.createdAt = new Date().toISOString(); // Update modified date/time
        updatedData.modifiedAt = new Date().toISOString(); // Update modified date/time

        // Update the state with the new values
        setChangeRows(updatedData);
      });
    }
  };

  console.log(changeRows, "changes");
  const handleUpdateButtonClick = async () => {
    console.log(changeRows, "changeRows before post"); // Log here to check data structure
    await createTransaction(changeRows);
};

  return (
    <div className="w-full space-y-4">
      <PageTitle title={t("table.pageTitle")} desc={t("table.pageDesc")} />

      <Toolbar form={toolbarForm} onUpdate={handleUpdateButtonClick} />
      <HotTable
        data={getData}
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
            width: "90", // editable
            dateFormat: "YYYY-MM-DD",
          },
          {
            type: "autocomplete",
            source: glAccountDropdown,
            data: "glAccount", // Matches the key in tableData
            readOnly: false, // editable
          },
          { data: "amount", type: "numeric" },
          {
            type: "autocomplete",
            source: costCenterDropdown,
            data: "costCenterCode", // edit able
            readOnly: false,
          },
          { data: "ccOwner" },
          { data: "profitCenter" },
        ]}
        className="custom-table" // Add a unique class name
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
        // readOnly={true}
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

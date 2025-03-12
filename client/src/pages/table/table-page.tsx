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
// import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import moment from "moment";
// import accountData from "../../assets/accounts.json";
import costCenterData from "../../assets/cost-centers.json";
import {
  ArrowDownFromLine,
  Ellipsis,
  Plus,
  RefreshCcw ,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@components/ui/button";

registerAllModules();
import { HotTable } from "@handsontable/react";
import { apiurl } from "src/env-variable";
import {
  getGlAccountAll,
  getCostCenterAll,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@apis/axios/service/glaccount";
import { any, number } from "zod";

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

  // const [paginationState, setPaginationState] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const hotRef = useRef(null);
  // const [columns, setColumns] = useState([]);
  console.log("Console called");

  const [glAccountDropdown, setGlAccountDropdown] = useState<string[]>([]);
  const [glAccountForSelection, setGlAccountForSelection] = useState<string[]>(
    []
  );

  const [getData, setGetdata] = useState<string[]>([]);
  const [isEditable, setIsEditale] = useState<boolean>(true);
  const [loader, setsetLoader] = useState<boolean>(false);
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
    if (getData.length === 0) {
      setGetdata([{ date: "", glAccount: "", amount: 0, costCenterCode: "", ccOwner: "", profitCenter: "" }]); // Add default empty row
    }
  }, [getData]);
  useEffect(() => {
    getGlAccountAll().then((response) => {
      const accountData = response.result; // Assuming response.result contains the account data
      const dropdownData = accountData.map(
        (item: any) => `${item.glAccount} - ${item.shortText}`
      );
      setGlAccountDropdown(dropdownData);
      setGlAccountForSelection(accountData);
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
      setcostCenterSelecltion(accountData);
    });

    console.log(glAccountDropdown, "glAccountDropdown");
  }, []);

  useEffect(() => {
    fetchData();
    // getTransaction().then((response) => {
    //   const tablData = response.result; // Assuming response.result contains the account data
    //   const formattedData = tablData.map((item: any) => ({
    //     ...item,
    //     date: moment(item.date).format("YYYY-MM-DD"),
    //     glAccount: `${item.glAccount} - ${item.glName}`,
    //     costCenterCode: `${item.costCenterCode} - ${item.centerCodeName}`,
    //   }));
    //   console.log(tablData, "tablData");
    //   setGetdata(formattedData);
    // });
  }, []);
  const fetchData = () => {
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
  };
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
      amount: 110,
      ccOwner: "",
      costCenterCode: "",

      createdAt: "2024-11-01T05:25:18.1366667",
      date: "",
      glAccount: "",

      modifiedAt: "2024-11-01T05:25:18.1366667",
      profitCenter: "110000000",
    },

    // {
    //   date: "",
    //   glAccount: "",
    //   amount: 30,
    //   costCenterCode: "",
    //   ccOwner: "",
    //   profitCenter: "",
    // },
  ];
  const updateCCOwner = (row: any, costCenterValue: any) => {
    const selectedCostCenter = costCenterData.find(
      (item) => `${item.CostCenterCode} - ${item.Name}` === costCenterValue
    );
    return selectedCostCenter ? selectedCostCenter.ccOwner : "";
  };

 
  const beforeCreateRowHandle = () => {
    const updatedData = {
      transactionID: 0,
      date: "", // Default for new entries
      chargeAccountID: 0,
      amount: 0,
      costCenterID: 0,
      profitCenter: "",
      createdAt: new Date().toISOString(), // Default for new entries
      modifiedAt: new Date().toISOString(), // Update modified date
    };
    setChangeRows(updatedData);
    console.log("when row added");
  };
  const afterChangeHandler = (changes: any, source: any) => {
    if (source === "loadData") return; // Prevent loop on data load

    if (changes) {
      changes.forEach(([row, prop, oldValue, newValue]) => {
        console.log(row, "row");
        const id = getData[row]?.transactionID || 0;
        let updatedData = { ...changeRows };
        if (id === 0) {
          console.log(id, "id");

          // Update the state based on property changes
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
            const selectedCostCenter = costCenterSelection.find(
              (item) => `${item.costCenterCode} - ${item.name}` === newValue
            );
            console.log(selectedCostCenter, "selectedCostCenter");
            if (selectedCostCenter) {
              updatedData.costCenterID = selectedCostCenter.costCenterID; // Store corresponding ID
            }
            // Assuming costCenterCode should also be stored
            // updatedData.costCenterID = newValue;
          } else if (prop === "glAccount") {
            const selectedGlAccount = glAccountForSelection.find(
              (item) => `${item.glAccount} - ${item.shortText}` === newValue
            );
            if (selectedGlAccount) {
              updatedData.chargeAccountID = selectedGlAccount.chargeAccountID; // Store corresponding ID
            }
          } else if (prop === "amount") {
            updatedData.amount = newValue;
          } else if (prop === "profitCenter") {
            updatedData.profitCenter = newValue;
          }

          // Always update the common properties
          updatedData.transactionID = 0; // Or set this to the corresponding ID if available
          updatedData.createdAt = new Date().toISOString(); // Update modified date/time
          updatedData.modifiedAt = new Date().toISOString(); // Update modified date/time

          // Update the state with the new values
          setChangeRows(updatedData);
        } else if (id > 0) {
          console.log(id, "id");
          if (isEditable) {
            const existingData = getData[row];
            updatedData = {
              transactionID: existingData.transactionID,
              date: existingData.date,
              chargeAccountID: existingData.chargeAccountID,
              amount: existingData.amount,
              costCenterID: existingData.costCenterID,
              profitCenter: existingData.profitCenter,
              createdAt: existingData.createdAt,
              modifiedAt: new Date().toISOString(), // Update modified date
            };
          }

          // Update the state based on property changes
          if (prop === "date") {
            updatedData.date = newValue;
            setIsEditale(false);
          } else if (prop === "costCenterCode") {
            setIsEditale(false);
            const newCCOwner = updateCCOwner(row, newValue);
            hotRef.current.hotInstance.setDataAtRowProp(
              row,
              "ccOwner",
              newCCOwner
            );
            const selectedCostCenter = costCenterSelection.find(
              (item) => `${item.costCenterCode} - ${item.name}` === newValue
            );
            console.log(selectedCostCenter, "selectedCostCenter");
            if (selectedCostCenter) {
              updatedData.costCenterID = selectedCostCenter.costCenterID; // Store corresponding ID
            }
            // Assuming costCenterCode should also be stored
            // updatedData.costCenterID = newValue;
          } else if (prop === "glAccount") {
            setIsEditale(false);
            const selectedGlAccount = glAccountForSelection.find(
              (item) => `${item.glAccount} - ${item.shortText}` === newValue
            );
            if (selectedGlAccount) {
              updatedData.chargeAccountID = selectedGlAccount.chargeAccountID; // Store corresponding ID
            }
          } else if (prop === "amount") {
            updatedData.amount = newValue;
            setIsEditale(false);
          } else if (prop === "profitCenter") {
            updatedData.profitCenter = newValue;
            setIsEditale(false);
          }

          // Always update the common properties
          updatedData.transactionID = getData[row].transactionID; // Keep the existing ID
          updatedData.createdAt = new Date().toISOString();
          updatedData.modifiedAt = new Date().toISOString(); // Update modified date/time

          setChangeRows((prevState) => ({
            ...prevState,
            ...updatedData,
          }));
          console.log(updatedData, "updatedData");
        }
      });
    }
  };

 
  const handlePaste = (data: any[], coords: any) => {
    const newRows = data.map((rowData, rowIndex) => {
      console.log(rowData,"rowData")

      const selectedGlAccount = glAccountForSelection.find(
        (item) => `${item.glAccount} - ${item.shortText}` === rowData[1]
      );
      const selectedCostCenter = costCenterSelection.find(
        (item) => `${item.costCenterCode} - ${item.name}` === rowData[3]
      );
      const updatedRow = {
        transactionID: 0, // Assuming new rows have transactionID set to 0
        date: rowData[0] || "", // Assuming date is the first column
        chargeAccountID: selectedGlAccount?.chargeAccountID, // Default value
        amount: Number(rowData[2]) || 0, // Assuming amount is the second column
        costCenterID: selectedCostCenter?.costCenterID, // Default value
        profitCenter: rowData[5] || "", // Assuming profit center is the third column
        createdAt: new Date().toISOString(), // Set the creation date to now
        modifiedAt: new Date().toISOString(), // Set the modified date to now
      };
      return updatedRow;
    });
  
     console.log(newRows,"newRows") 
     setChangeRows(newRows[0])   // Here, you can set the changeRows state or merge with existing data
   ;
  };
  const beforeChangeHandler = (changes: any) => {
    if (changes) {
      changes.forEach(([row, prop, oldValue, newValue]) => {
        if (prop === "paste") {
          handlePaste(newValue);
        }
      });
    }
  }
console.log(changeRows,"chages")
  const handleUpdateButtonClick = async () => {
    try {
      if (changeRows.transactionID) {
        // Update existing transaction
        await updateTransaction(changeRows, setIsEditale ,setsetLoader);
        console.log("Updated transaction:", changeRows);
        fetchData();
      } else {
        // Create a new transaction
        await createTransaction(changeRows,setsetLoader);
        fetchData();
      }
    } catch (error) {
      console.error("Error handling transaction:", error);
    }
  };
  const handleRemoveRow = async (rowIndex: number) => {
    // Check if rowIndex is within bounds
    if (rowIndex < 0 || rowIndex >= getData.length) {
      console.warn("Invalid rowIndex:", rowIndex);
      return; // Exit the function if rowIndex is invalid
    }

    // Get the transaction ID of the row being deleted
    const transactionID = getData[rowIndex]?.transactionID;
    console.log(rowIndex, "rowIndex");

    if (transactionID) {
      console.log(transactionID, "transactionID");

      try {
        // Call the API to delete the transaction
        await deleteTransaction(transactionID); // Replace with your delete API function

        // Update local state to remove the deleted row
        const updatedData = getData.filter((_, index) => index !== rowIndex);
        setGetdata(updatedData); // Update the state with the new data
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    } else {
      console.warn("Transaction ID not found for the row:", rowIndex);
    }
  };
 
  return (
    <div className="w-full space-y-4">
      <PageTitle title={t("table.pageTitle")} desc={t("table.pageDesc")} />
      <div className="flex justify-end">
      {/* <button
      onClick={() => {
        const exportPlugin = hotRef.current.hotInstance.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Handsontable-Export_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
        });
      }}
      className="btn btn-primary"
      >
      Export to CSV
      </button> */}
      <Button onClick={() => {
        const exportPlugin = hotRef.current.hotInstance.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Handsontable-Export_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
        });
      }}>
            <ArrowDownFromLine className="h-4 w-4 mr-1" />
            Download Report
          </Button> 
      </div>
      <HotTable
      data={getData}
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
      dropdownMenu={true}
      afterChange={afterChangeHandler}
      beforeChange={beforeChangeHandler} // Add this event
      beforeCreateRow={beforeCreateRowHandle}
      beforeRemoveRow={handleRemoveRow}
      afterPaste={handlePaste}
      ref={hotRef}
      licenseKey="non-commercial-and-evaluation" // for non-commercial use
      />
      <Toolbar form={toolbarForm} onUpdate={handleUpdateButtonClick} btnLoader={loader} />

    </div>
  );
}

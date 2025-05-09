import Between from "@components/commons/between";
import TextInput from "@components/inputs/text-input";
import CategorySelect from "@components/selects/category-select";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import {
  ArrowDownFromLine,
  Ellipsis,
  Plus,
  RefreshCcw ,
  SlidersHorizontal,
  X,
} from "lucide-react";
import useReport from "@hooks/use-report";
import { useState } from "react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useGetAllProducts } from "@apis/queries/product";

interface Props {
  form: any;
}

function Toolbar({ form, onUpdate }: { form: Props; onUpdate: () => void }) {
  const { generateExcel } = useReport();
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  // 2nd parameter false for fetching automatically on mounting component
  const { refetch } = useGetAllProducts({}, false);

  const toggleFilter = () => {
    setOpenFilters((prev) => !prev);
  };

  const handleDownloadReport = async () => {
    const { data } = await refetch();
    generateExcel(data?.data?.products, "product-list-report");
  };

  return (
    <div>
      {/* Mobile Filters and Actions */}
      <Between className="items-start flex sm:hidden">
        <Button
          onClick={toggleFilter}
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {openFilters ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuItem>
              <RefreshCcw className="h-4 w-4 mr-1" />
              Update
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={handleDownloadReport}>
              <ArrowDownFromLine className="h-4 w-4 mr-1" />
              Download Report
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </Between>

      {/* Mobile Filter Form */}
      <div>
        <Form {...form}>
          <form
            className={clsx(
              "flex sm:hidden flex-col sm:flex-row gap-4 overflow-hidden transition-all duration-300",
              openFilters ? "mt-4 max-h-[100vh] min-h-0" : "h-0"
            )}
          >
            <TextInput
              placeholder="Search Products"
              name="search"
              form={form}
            />

            {/* <CategorySelect
              placeholder="Choose Category"
              name="category"
              className="min-w-[200px]"
              form={form}
            /> */}
          </form>
        </Form>
      </div>

      {/* Desktop Filters and Actions */}
      <Between className="hidden sm:flex">
        <Form {...form}>
          <form
            className={clsx(
              "flex flex-col sm:flex-row gap-4 overflow-hidden transition-all duration-300"
            )}
          >
            {/* <TextInput
              placeholder="Search Products"
              name="search"
              form={form}
            /> */}

            {/* <CategorySelect
              placeholder="Choose Category"
              name="category"
              className="min-w-[200px]"
              form={form}
            /> */}
          </form>
        </Form>

        <div className="flex gap-4">
          <Button onClick={onUpdate}>
            <RefreshCcw  className="h-4 w-4 mr-1" />
         Update
          </Button>

          {/* <Button onClick={handleDownloadReport}>
            <ArrowDownFromLine className="h-4 w-4 mr-1" />
            Download Report
          </Button> */}
        </div>
      </Between>
    </div>
  );
}

export default Toolbar;

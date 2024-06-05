import { finances as financesData} from "../../tempData.ts";
import { financesColumns } from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import { Finance } from "../../types/types.ts";

const DataTableFinances = () => {

    const [finances, setFinances] = useState<Finance[]>([]);

    useEffect(() => {
        getFinances()
    }, []);

    const getFinances = () => {
        setFinances(financesData)
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={finances}
                columns={financesColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[12]}
            />
        </div>
    );
};
export default DataTableFinances;
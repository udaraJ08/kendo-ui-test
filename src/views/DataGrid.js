import * as React from "react";
import {Grid, GridColumn as Column, GridToolbar} from "@progress/kendo-react-grid";
import sampleProducts from "../product.json";
import {MyCommandCell} from "../components/MyCommandCell";
import { insertItem, getItems, updateItem, deleteItem } from "../service/service";


const editField = "inEdit";

const allInEdit = sampleProducts.map((item) =>
    Object.assign(
        {
            inEdit: true,
        },
        item
    )
);

function DataGrid() {

    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        let newItems = getItems();
        setData(newItems);
    }, []);

    const remove = (dataItem) => {
        const newData = deleteItem(dataItem);
        setData(newData);
    };

    const add = (dataItem) => {
        dataItem.inEdit = true;
        const newData = insertItem(dataItem);
        setData(newData);
    };

    const update = (dataItem) => {
        dataItem.inEdit = false;
        const newData = updateItem(dataItem);
        setData(newData);
    };

    const discard = () => {
        const newData = [...data];
        newData.splice(0, 1);
        setData(newData);
    };

    const cancel = (dataItem) => {
        const originalItem = getItems().find(
            (p) => p.ProductID === dataItem.ProductID
        );
        const newData = data.map((item) =>
            item.ProductID === originalItem.ProductID ? originalItem : item
        );
        setData(newData);
    };

    const enterEdit = (dataItem) => {
        setData(
            data.map((item) =>
                item.ProductID === dataItem.ProductID ? {...item, inEdit: true} : item
            )
        );
    };

    const itemChange = (event) => {
        const newData = data.map((item) =>
            item.ProductID === event.dataItem.ProductID
                ? {...item, [event.field || ""]: event.value}
                : item
        );
        setData(newData);
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
            Discontinued: false,
        };
        setData([newDataItem, ...data]);
    };
    const CommandCell = (props) => (
        <MyCommandCell
            {...props}
            edit={enterEdit}
            remove={remove}
            add={add}
            discard={discard}
            update={update}
            cancel={cancel}
            editField={editField}
        />
    );

    return (
        <Grid
            style={{
                height: "420px",
            }}
            data={data}
            onItemChange={itemChange}
            editField={editField}
        >
            <GridToolbar>
                <button title="Add new" className="k-button k-primary" onClick={addNew}>
                    Add new
                </button>
            </GridToolbar>
            <Column field="ProductID" title="Id" width="50px" editable={false}/>
            <Column field="ProductName" title="Product Name" width="200px"/>
            <Column
                field="FirstOrderedOn"
                title="First Ordered"
                editor="date"
                format="{0:d}"
                width="150px"
            />
            <Column
                field="UnitsInStock"
                title="Units"
                width="120px"
                editor="numeric"
            />
            <Column field="Discontinued" title="Discontinued" editor="boolean"/>
            <Column cell={CommandCell} width="200px"/>
        </Grid>
    );
}

const style = {
    midContainer: {
        width: "90%",
        height: "90%"
    }
}

export default DataGrid;

import * as React from "react";
export const MyCommandCell = (props) => {
    const { dataItem } = props;
    const inEdit = dataItem[props.editField];
    const isNewItem = dataItem.ProductID === undefined;
    return inEdit ? (
        <td className="k-command-cell">
            <button
                className="k-button k-grid-save-command"
                onClick={() =>
                    isNewItem ? props.add(dataItem) : props.update(dataItem)
                }
            >
                {isNewItem ? "Add" : "Update"}
            </button>
            <button
                className="k-button k-grid-cancel-command"
                onClick={() =>
                    isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
                }
            >
                {isNewItem ? "Discard" : "Cancel"}
            </button>
        </td>
    ) : (
        <td className="k-command-cell">
            <button
                className="k-primary k-button k-grid-edit-command"
                onClick={() => props.edit(dataItem)}
            >
                Edit
            </button>
            <button
                className="k-button k-grid-remove-command"
                onClick={() =>
                    // eslint-disable-next-line no-restricted-globals
                    confirm("Confirm deleting: " + dataItem.ProductName) &&
                    props.remove(dataItem)
                }
            >
                Remove
            </button>
        </td>
    );
};
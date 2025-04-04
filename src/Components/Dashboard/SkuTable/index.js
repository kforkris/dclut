import React from "react";
import styles from "./styles.module.scss";
import { IoIosArrowDown } from "react-icons/io";

const SkuTable = ({ tableData }) => {
  console.log("data in table...", tableData);

  const columnsVisible = tableData?.datatableProperties?.columnsVisible || {};
  const columnOrder = tableData?.datatableProperties?.columnOrder || [];

  // Dummy Static Data (for fallback)
  const staticRows = [
    {
      "blinkit_insights_city.sales_mrp_sum": 3450000,
      "blinkit_insights_city.name": "New Delhi",
      "blinkit_insights_city.sales_qty_sum": 120000,
      "blinkit_insights_city.orders_count": 4500,
      "blinkit_insights_city.top_selling_sku": "Amul Milk 1L",
      "blinkit_insights_sku.name": "Amul Milk 1L",
      "blinkit_insights_sku.sales_mrp_sum": 580000,
    },
    {
      "blinkit_insights_city.sales_mrp_sum": 2890000,
      "blinkit_insights_city.name": "Mumbai",
      "blinkit_insights_city.sales_qty_sum": 105000,
      "blinkit_insights_city.orders_count": 4100,
      "blinkit_insights_city.top_selling_sku": "Dairy Milk Chocolate",
      "blinkit_insights_sku.name": "Dairy Milk Chocolate",
      "blinkit_insights_sku.sales_mrp_sum": 510000,
    },
    {
      "blinkit_insights_city.sales_mrp_sum": 2540000,
      "blinkit_insights_city.name": "Bangalore",
      "blinkit_insights_city.sales_qty_sum": 98000,
      "blinkit_insights_city.orders_count": 3900,
      "blinkit_insights_city.top_selling_sku": "Fortune Rice Bran Oil",
      "blinkit_insights_sku.name": "Fortune Rice Bran Oil",
      "blinkit_insights_sku.sales_mrp_sum": 470000,
    },
    {
      "blinkit_insights_city.sales_mrp_sum": 2100000,
      "blinkit_insights_city.name": "Pune",
      "blinkit_insights_city.sales_qty_sum": 87000,
      "blinkit_insights_city.orders_count": 3700,
      "blinkit_insights_city.top_selling_sku": "Aashirvaad Atta 5kg",
      "blinkit_insights_sku.name": "Aashirvaad Atta 5kg",
      "blinkit_insights_sku.sales_mrp_sum": 420000,
    },
  ];

  const rows =
    // tableData?.row;
    tableData?.rows && tableData.rows.length > 0 ? tableData.rows : staticRows;

  // Filter only visible columns
  const visibleColumnKeys =
    columnOrder.filter((col) => columnsVisible[col]) || [];

  return (
    <div className={styles.skuContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>{tableData?.title || "Top Cities"}</h2>
          <p>
            {tableData?.description ||
              "Know which cities are contributing the most 📈"}
          </p>
        </div>
        <div className={styles.filter}>
          <h4>Filters (1)</h4>
          <IoIosArrowDown size={16} style={{ color: "#FFF" }} />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr className={styles.trTag}>
              {(visibleColumnKeys || []).map((col) => (
                <th key={col}>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {col.split(".").pop().replace(/_/g, " ") || "-"}
                    <IoIosArrowDown />
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows || []).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {(visibleColumnKeys || []).map((colKey, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[colKey] === "boolean"
                      ? row[colKey]
                        ? "Yes"
                        : "No"
                      : typeof row[colKey] === "number"
                      ? row[colKey].toLocaleString()
                      : row[colKey] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkuTable;

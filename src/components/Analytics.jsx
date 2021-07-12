import React from "react";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Inject,
  Filter,
  Sort,
  Page,
} from "@syncfusion/ej2-react-grids";

const Analytics = ({
  error,
  isLoaded,
  alerts_datestamp,
  transactions_current_datetime,
}) => {
  const TextWrapSettingsModel = { wrapMode: "Content" };
  const FilterSettingsModel = {
    type: "Menu",
  };
  const PageSettingsModel = { pageSize: 4 };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p> Loading...</p>;
  } else {
    return (
      <div className="analytics">
        <div className="firstTable" style={{ margin: "5%" }}>
          <p>
            Таблица с проблемами, найденными во время процесса “Анализ
            транзакций и создание оповещений”
          </p>
          <GridComponent
            dataSource={alerts_datestamp}
            allowTextWrap={true}
            allowFiltering={true}
            allowSorting={true}
            allowPaging={true}
            filterSettings={FilterSettingsModel}
            textWrapSettings={TextWrapSettingsModel}
            pageSettings={PageSettingsModel}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="alertId"
                headerText="Alert ID"
                width="30"
              />
              <ColumnDirective
                field="alertType"
                headerText="Alert type"
                width="30"
              />
              <ColumnDirective
                field="description"
                headerText="Description"
                width="100"
              />
              <ColumnDirective
                field="affectedTransactionsCount"
                headerText="Affected transactions count"
                width="30"
              />
            </ColumnsDirective>
            <Inject services={[Filter, Sort, Page]} />
          </GridComponent>
        </div>
        <div className="secondTable" style={{ margin: "5%" }}>
          <p>
            Таблица со связанными транзакциями из входного набора транзакций
          </p>
          <GridComponent
            dataSource={transactions_current_datetime}
            allowTextWrap={true}
            allowFiltering={true}
            allowSorting={true}
            filterSettings={FilterSettingsModel}
            textWrapSettings={TextWrapSettingsModel}
            allowPaging={true}
            pageSettings={PageSettingsModel}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="alertId"
                headerText="Alert ID"
                width="30"
              />
              <ColumnDirective
                field="transactionId"
                headerText="Transaction ID"
                width="30"
              />
              <ColumnDirective
                field="executionEntityName"
                headerText="Execution Entity Name"
                width="30"
              />
              <ColumnDirective
                field="instrumentName"
                headerText="Instrument Name"
                width="30"
              />
              <ColumnDirective
                field="instrumentClassification"
                headerText="Instrument Classification"
                width="30"
              />
              <ColumnDirective
                field="quantity"
                headerText="Quantity"
                width="30"
              />
              <ColumnDirective field="price" headerText="Price" width="30" />
              <ColumnDirective
                field="currency"
                headerText="Currency"
                width="30"
              />
              <ColumnDirective
                field="datestamp"
                headerText="Datestamp"
                width="30"
              />
              <ColumnDirective
                field="netAmount"
                headerText="Net Amount"
                width="30"
              />
            </ColumnsDirective>
            <Inject services={[Filter, Sort, Page]} />
          </GridComponent>
        </div>
      </div>
    );
  }
};

export default Analytics;

import React from "react";
import Chart from "react-apexcharts";
import {useGetMonthCountQuery} from "../../features/book/bookAPI";
import {useGetTopBorrowedBooksQuery} from "../../features/boorowedBook/borrowedBookApi";
import TopBorrowedBooksTable from "../tables/TopBorrowedBooksTable";
import TopRequestedBooksTable from "../tables/TopRequestedBooksTable";
import QuickAnalytics from "./QuickAnalytics";
import TopBooksTable from "../tables/TopBooksTable";
const Analytics = () => {
  const {data: topBorrowedBooks} = useGetTopBorrowedBooksQuery();
  const {data: monthData} = useGetMonthCountQuery();
  console.log(monthData);
  const monthCount = monthData?.month?.map((d) => d?.count);
  const options = {
    chart: {
      height: 200,
      width: 400,
      type: "basic-bar",
      offsetY: 16,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
      },
    },

    xaxis: {
      position: "bottom",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      show: true,
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#A5978B", "#2b908f", "#f9a3a4", "#90ee7e", "#f48024", "#69d2e7"],
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      markers: {
        fillColors: ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#A5978B", "#2b908f", "#f9a3a4", "#90ee7e", "#f48024", "#69d2e7"],
      },
    },
  };

  const series = [
    {
      name: "book",
      data: monthCount,
    },
  ];

  return (
    <div>
      <QuickAnalytics />
      <div>
        <h1 className="bg-main text-white p-2 rounded inline-block ">Monthly Analytics</h1>
        <Chart options={options} series={series} type="bar" width="600" />
      </div>
      <div className="my-12 px-4">
        <TopRequestedBooksTable />
      </div>
      <div className="my-6 px-4">
        <TopBorrowedBooksTable data={topBorrowedBooks?.borrowedBooks} />
      </div>
      <div className="my-6 px-4">
        <TopBooksTable />
      </div>
    </div>
  );
};

export default Analytics;

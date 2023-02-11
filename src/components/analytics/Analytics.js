import React from "react";
import Chart from "react-apexcharts";
import { useGetRequestedBooksQuery } from "../../features/book/bookAPI";
import { useGetTopBorrowedBooksQuery } from "../../features/boorowedBook/borrowedBookApi";
import RequestedBookTable from "../tables/RequestedBookTable";
import TopBorrowedBooksTable from "../tables/TopBorrowedBooksTable";
import QuickAnalytics from "./QuickAnalytics";
import TopBooksTable from "./TopBooksTable";
const Analytics = () => {
  const { data: topBorrowedBooks } = useGetTopBorrowedBooksQuery();
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      markers: {
        fillColors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
        ],
      },
    },
  };
  const series = [
    {
      name: "book",
      data: [30, 40, 45, 200, 49, 60, 70, 91, 30, 20, 30, 0],
    },
  ];
  const { data: requestedBookData } = useGetRequestedBooksQuery();

  return (
    <div>
      <QuickAnalytics />
      <div>
        <h1 className="bg-main text-white p-2 rounded inline-block ">
          Monthly Analytics
        </h1>
        <Chart options={options} series={series} type="bar" width="600" />
      </div>
      <div className="my-12">
        <h1 className="bg-main text-white p-2 rounded inline-block ">
          Top Five Requested Books
        </h1>
        <RequestedBookTable data={requestedBookData?.books} />
      </div>
      <div className="my-12 px-4">
        <TopBorrowedBooksTable data={topBorrowedBooks?.borrowedBooks} />
      </div>
    </div>
  );
};

export default Analytics;

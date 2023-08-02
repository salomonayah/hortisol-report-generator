const reportsColumn = [
  {
    Header: "ROW",
    accessor: "index",
    Cell: ({ cell }) => {
      return <>{cell.value}</>;
    },
  },
  {
    Header: "BRAND NAME (GRADE)",
    accessor: "grade",
    Cell: ({ cell }) => {
      return (
        <>
          <>{cell.value}</>
        </>
      );
    },
  },
  {
    Header: "CITY",
    accessor: "city",
    Cell: ({ cell }) => {
      return (
        <>
          <>{cell.value}</>
        </>
      );
    },
  },
  {
    Header: "COMPANY",
    accessor: "company",
    Cell: ({ cell }) => {
      return (
        <>
          <>{cell.value}</>
        </>
      );
    },
  },
  {
    Header: "TOTAL WEIGHT (US TONS)",
    accessor: "weight_tonns",
    Cell: ({ cell }) => {
      return (
        <>
          <>{cell.value}</>
        </>
      );
    },
  },

  {
    Header: "TOTAL WEIGHT (US POUNDS)",
    accessor: "weight_pounds",
    Cell: ({ cell }) => {
      return (
        <>
          <>{cell.value}</>
        </>
      );
    },
  },
];

export default reportsColumn;

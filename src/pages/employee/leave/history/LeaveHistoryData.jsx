const LeaveHistoryData = ({
  leaveTypes,
  ccOptions,
  leaveHistory,
  setLeaveHistory,
  fetchLeaves,
  handleWithdraw,
}) => {

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Leave History
      </Typography>
      <table className="leave-history-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Note</th>
            <th>CC To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.status}</td>
              <td>{leave.note}</td>
              <td>{leave.ccTo || "-"}</td>
              <td>
                {leave.status === "Pending" && (
                  <Button color="error" onClick={() => handleWithdraw(leave.id)}>
                    Withdraw
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

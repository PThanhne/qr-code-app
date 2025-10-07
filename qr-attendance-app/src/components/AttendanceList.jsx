export default function AttendanceList({ data }) {
  return (
    <div className="list">
      <h2>Lịch sử điểm danh</h2>
      {data.length === 0 ? (
        <p>Chưa có ai điểm danh</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.mssv}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

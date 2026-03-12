export function SkeletonRow() {
  return (
    <tr className="border-b border-foreground/5 animate-pulse">
      {[130, 55, 55, 50, 110, 150, 75, 80].map((w, i) => (
        <td key={i} className="px-3 py-3">
          <div className="h-3.5 bg-secondary/10 rounded-md" style={{ width: w }} />
        </td>
      ))}
    </tr>
  );
}

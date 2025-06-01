export default function ServerComponent({
  displayCount,
}: {
  displayCount: number;
}) {
  return (
    <div>
      {displayCount}
      <p>Server Component{process.env.SUPERSECRET}</p>
    </div>
  );
}


export default async function Page({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:8000/query/${id}`, {
    next: { revalidate: 1 },
  });
  const json = await res.json();
  const bangumi_data = json.bangumi_data;
  const id_data = json.id_data;
  const score_data = json.score_data;
  if(Math.floor((json.status + bangumi_data.status + id_data.status + score_data.status) / 100) != 8){
    return (
      <div>
        Error...待补充错误页面
      </div>
    )
  }

  return (
    <div>
      Success
    </div>
  );
}

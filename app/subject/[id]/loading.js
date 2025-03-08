import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <CircularProgress />
      <p className="text-gray-500">首次页面加载耗时可能较长</p>
    </div>
  );
}
const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)] space-y-4">
      <p className="text-gray-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;


const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 fixed top-0 left-0 z-10 w-screen h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        {/* Text */}
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;

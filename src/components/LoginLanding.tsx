

export default function LoginLanding() {
    //TODO: render the name dynamically with a useEffect
    //   interface WelcomeBackProps {
//     name: string;
//   }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-200 to-blue-200">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome Back, Rachel!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          We're glad to see you again. Let’s continue exploring!
        </p>
      </div>
    </div>
  );
}
